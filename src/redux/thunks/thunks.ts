import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiService } from '../../shared/services/api-service/api-service';
import {
  IAddPlayerResponse,
  ICheckGameResponse,
  IConnectResponse,
  ICreateGameResponse,
  IPostMessageResponse,
  IResponse,
} from '../../shared/services/types';
import { appActions } from '../slices/app/app-slice';
import { currentUserActions } from '../slices/current-user/current-user-slice';
import { gameActions } from '../slices/game/game-slice';
import {
  IClientAddPlayerParameters,
  IClientAddPlayerResult,
  IClientAdmitPlayerParameters,
  IClientCancelGameParameters,
  IClientChangeCurrentIssueParameters,
  IClientCheckGameParameters,
  IClientCreateGameParameters,
  IClientCreateIssueParameters,
  IClientDeleteIssueParameters,
  IClientFinishGameParameters,
  IClientFinishRoundParameters,
  IClientGetNextIssueParameters,
  IClientKickPlayerParameters,
  IClientKickPlayerVoteParameters,
  IClientLeaveGameParameters,
  IClientPostMessageParameters,
  IClientRejectPlayerParameters,
  IClientScoreIssueParameters,
  IClientStartGameParameters,
  IClientStartRoundParameters,
  IClientUpdateIssueParameters,
  IClientVoteToKickParameters,
  ICreateGameRequestResult,
  IRequestResult,
  Issue,
  Message,
  TGameStatus,
  TUserRole,
  User,
} from '../types';
import { InfoMessage } from '../types/info-message';

export const connectThunk = createAsyncThunk<IResponse, void>(
  'app/connectThunk',
  async (_, thunkApi) => {
    const response = (await ApiService.connect()) as IConnectResponse;
    if (response.message) {
      return response;
    }
    thunkApi.dispatch(
      appActions.changeConnectionStatus(response.connectionStatus)
    );
    thunkApi.dispatch(appActions.changeSocketId(response.socketId));
    return response;
  }
);

export const admitPlayerThunk = createAsyncThunk<
  Partial<IRequestResult>,
  IClientAdmitPlayerParameters
>('game/admitPlayerThunk', async ({ gameId }: IClientAdmitPlayerParameters) => {
  const response = await ApiService.admitPlayer({ gameId });
  return response;
});

export const rejectPlayerThunk = createAsyncThunk<
  Partial<IRequestResult>,
  IClientRejectPlayerParameters
>(
  'game/rejectPlayerThunk',
  async ({ gameId }: IClientRejectPlayerParameters) => {
    const response = await ApiService.rejectPlayer({ gameId });
    return response;
  }
);

export const createGameThunk = createAsyncThunk<
  Partial<ICreateGameRequestResult>,
  IClientCreateGameParameters
>('game/createGameThunk', async ({ dealerInfo }, thunkApi) => {
  const response = await ApiService.createGame({ dealerInfo });
  if (response.message) {
    return response;
  }
  const { gameId, dealerId } = response as ICreateGameResponse;
  const dealer = new User({
    ...dealerInfo,
    id: dealerId,
    role: TUserRole.dealer,
  }).toObject();
  thunkApi.dispatch(currentUserActions.changeCurrentUser(dealer));
  thunkApi.dispatch(gameActions.changeId(gameId));
  thunkApi.dispatch(gameActions.changeStatus(TGameStatus.lobby));
  thunkApi.dispatch(gameActions.changePlayers([dealer]));
  thunkApi.dispatch(
    appActions.addOneInfoMessage(new InfoMessage('Game created').toObject())
  );
  return { dealer, gameId };
});

export const addPlayerThunk = createAsyncThunk<
  Partial<IClientAddPlayerResult>,
  IClientAddPlayerParameters
>('game/addPlayerThunk', async ({ addedPlayer, gameId }, thunkApi) => {
  thunkApi.dispatch(currentUserActions.changeCurrentUser(addedPlayer));
  const response = (await ApiService.addPlayer({
    addedPlayer,
    gameId,
  })) as IAddPlayerResponse;
  return response;
});

export const checkGameThunk = createAsyncThunk<
  ICheckGameResponse,
  IClientCheckGameParameters
>('game/checkGameThunk', async ({ gameId }) => {
  const response = (await ApiService.checkGame({
    gameId,
  })) as ICheckGameResponse;
  return response;
});

export const postMessageThunk = createAsyncThunk<
  Partial<IRequestResult>,
  IClientPostMessageParameters
>('game/postMessageThunk', async ({ message, gameId }, thunkApi) => {
  const response = await ApiService.postMessage({
    message,
    gameId,
  });
  if (response.message) {
    return response;
  }
  const { messageId } = response as IPostMessageResponse;
  const postedMessage = new Message({ ...message, id: messageId }).toObject();
  thunkApi.dispatch(gameActions.postMessage(postedMessage));
  return { messageId };
});

export const createIssueThunk = createAsyncThunk<
  Partial<IRequestResult>,
  IClientCreateIssueParameters
>(
  'game/createIssueThunk',
  async ({ dealerId, addedIssue, gameId }, thunkApi) => {
    const response = await ApiService.createIssue({
      dealerId,
      addedIssue,
      gameId,
    });
    if (response.message) {
      return response;
    }
    const createdIssue = new Issue({
      ...addedIssue,
      id: response.issueId,
    }).toObject();
    thunkApi.dispatch(gameActions.createIssue(createdIssue));
    return {};
  }
);

export const updateIssueThunk = createAsyncThunk<
  Partial<IRequestResult>,
  IClientUpdateIssueParameters
>(
  'game/updateIssueThunk',
  async ({ dealerId, updatedIssue, gameId }, thunkApi) => {
    const response = await ApiService.updateIssue({
      dealerId,
      updatedIssue,
      gameId,
    });
    if (response.message) {
      return response;
    }
    thunkApi.dispatch(
      gameActions.updateIssue({
        issueId: updatedIssue.id,
        updatedIssue: updatedIssue,
      })
    );
    return {};
  }
);

export const deleteIssueThunk = createAsyncThunk<
  Partial<IRequestResult>,
  IClientDeleteIssueParameters
>(
  'game/deleteIssueThunk',
  async ({ dealerId, deletedIssueId, gameId }, thunkApi) => {
    const response = await ApiService.deleteIssue({
      dealerId,
      deletedIssueId,
      gameId,
    });
    if (response.message) {
      return response;
    }
    thunkApi.dispatch(gameActions.deleteIssue(deletedIssueId));
    return {};
  }
);

export const startGameThunk = createAsyncThunk<
  Partial<IRequestResult>,
  IClientStartGameParameters
>('game/startGameThunk', async ({ dealerId, settings, gameId }) => {
  const response = await ApiService.startGame({ dealerId, settings, gameId });
  if (response.message) {
    return response;
  }
  return {};
});

export const startVotingToKickThunk = createAsyncThunk<
  Partial<IRequestResult>,
  IClientKickPlayerVoteParameters
>(
  'game/startVotingToKickThunk',
  async ({ votingPlayerId, kickedPlayerId, gameId }) => {
    const response = await ApiService.startVotingToKick({
      votingPlayerId,
      kickedPlayerId,
      gameId,
    });
    return response;
  }
);

export const voteToKickThunk = createAsyncThunk<
  Partial<IRequestResult>,
  IClientVoteToKickParameters
>(
  'game/voteToKickThunk',
  async ({ votingPlayerId, kickedPlayerId, gameId, accept }) => {
    const response = await ApiService.voteToKick({
      votingPlayerId,
      kickedPlayerId,
      gameId,
      accept,
    });
    return response;
  }
);

export const kickPlayerThunk = createAsyncThunk<
  Partial<IRequestResult>,
  IClientKickPlayerParameters
>('game/kickPlayerThunk', async ({ dealerId, kickedPlayerId, gameId }) => {
  const response = await ApiService.kickPlayer({
    dealerId,
    kickedPlayerId,
    gameId,
  });
  if (response.message) {
    return response;
  }
  return {};
});

export const cancelGameThunk = createAsyncThunk<
  Partial<IRequestResult>,
  IClientCancelGameParameters
>('game/cancelGameThunk', async ({ dealerId, gameId }) => {
  const response = await ApiService.cancelGame({ dealerId, gameId });
  if (response.message) {
    return response;
  }
  return {};
});

export const scoreIssueThunk = createAsyncThunk<
  Partial<IRequestResult>,
  IClientScoreIssueParameters
>('game/scoreIssueThunk', async ({ playerId, issueId, score, gameId }) => {
  const response = await ApiService.scoreIssue({
    playerId,
    issueId,
    score,
    gameId,
  });
  return response;
});

export const finishGameThunk = createAsyncThunk<
  Partial<IRequestResult>,
  IClientFinishGameParameters
>('game/finishGameThunk', async ({ dealerId, gameId }) => {
  const response = await ApiService.finishGame({ dealerId, gameId });
  if (response.message) {
    return response;
  }
  return {};
});

export const getNextIssueThunk = createAsyncThunk<
  Partial<IRequestResult>,
  IClientGetNextIssueParameters
>('game/changeCurrentIssueThunk', async ({ dealerId, gameId }) => {
  const response = await ApiService.getNextIssue({ dealerId, gameId });
  if (response.message) {
    return response;
  }
  return {};
});

export const changeCurrentIssueThunk = createAsyncThunk<
  Partial<IRequestResult>,
  IClientChangeCurrentIssueParameters
>(
  'game/changeCurrentIssueThunk',
  async ({ dealerId, issueId, gameId }, thunkApi) => {
    const response = await ApiService.changeCurrentIssue({
      dealerId,
      issueId,
      gameId,
    });
    if (response.message) {
      return response;
    }
    thunkApi.dispatch(gameActions.changeCurrentIssueId(issueId));
    return {};
  }
);

export const startRoundThunk = createAsyncThunk<
  Partial<IRequestResult>,
  IClientStartRoundParameters
>('game/startRoundThunk', async ({ dealerId, issueId, gameId }, thunkApi) => {
  const response = await ApiService.startRound({
    dealerId,
    issueId,
    gameId,
  });
  if (response) {
    return response;
  }
  thunkApi.dispatch(gameActions.changeStatus(TGameStatus.roundInProgress));
  return {};
});

export const finishRoundThunk = createAsyncThunk<
  Partial<IRequestResult>,
  IClientFinishRoundParameters
>('game/finishRoundThunk', async ({ dealerId, gameId }) => {
  const response = await ApiService.finishRound({
    dealerId,
    gameId,
  });
  return response;
});

export const leaveGameThunk = createAsyncThunk<
  Partial<IRequestResult>,
  IClientLeaveGameParameters
>('game/leaveGameThunk', async ({ playerId, gameId }) => {
  const response = await ApiService.leaveGame({
    playerId,
    gameId,
  });
  if (response.message) {
    return response;
  }
  return {};
});

export const thunks = {
  connectThunk,
  createGameThunk,
  addPlayerThunk,
  createIssueThunk,
  updateIssueThunk,
  deleteIssueThunk,
  startGameThunk,
  checkGameThunk,
  cancelGameThunk,
  postMessageThunk,
  scoreIssueThunk,
  finishGameThunk,
  changeCurrentIssueThunk,
  voteToKickThunk,
  startVotingToKickThunk,
  kickPlayerThunk,
  getNextIssueThunk,
  startRoundThunk,
  leaveGameThunk,
  admitPlayerThunk,
  rejectPlayerThunk,
  finishRoundThunk,
};
