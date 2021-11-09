import React from 'react';
import { useSelector } from 'react-redux';
import { currentUserSelectors } from '../../redux/selectors';
import { TUserRole } from '../../redux/types';
import DealerLobby from './dealer-lobby/dealer-lobby';
import PlayerLobby from './player-lobby/player-lobby';

export default function LobbyPage(): JSX.Element {
  const currentUser = useSelector(currentUserSelectors.selectCurrentUser);
  const lobbyPage =
    currentUser.role === TUserRole.dealer ? <DealerLobby /> : <PlayerLobby />;
  return lobbyPage;
}
