import {
  Issue,
  Message,
  TCardScoreSpecialValue,
  TRoundResult,
  TUserRole,
  User,
} from '../redux/types';
import { TStatusCode } from './constants';

export const mockConnectResponseSuccess = {
  connectionStatus: true,
  statusCode: TStatusCode.OK,
};

export const mockCreateGameResponseSuccess = {
  gameId: 'mockGameId',
  dealerId: 'mockDealerId',
  statusCode: TStatusCode.OK,
};

export const mockAddPlayerResponseSuccess = {
  gameId: 'mockGameId',
  issues: [],
  players: [],
  messages: [],
  dealer: new User({
    id: 'mockDealerId',
    role: TUserRole.dealer,
    firstName: 'mockDealerFirstName',
  }),
  playerId: 'mockPlayerId',
  statusCode: TStatusCode.OK,
};

export const mockCheckGameResponseSuccess = {
  gameExists: true,
  statusCode: TStatusCode.OK,
};

export const mockCheckGameResponseFailure = {
  gameExists: false,
  statusCode: TStatusCode.OK,
};

export const mockPostMessageResponseSuccess = {
  gameId: 'mockGameId',
  messageId: 'mockPlayerId',
  statusCode: TStatusCode.OK,
};

export const leaveGameResponseSuccess = {
  gameId: 'mockGameId',
  statusCode: TStatusCode.OK,
};

export const startRoundResponseSuccess = {
  gameId: 'mockGameId',
  issueId: 'mockIssueId',
  statusCode: TStatusCode.OK,
};

export const kickPlayerResponseSuccess = {
  gameId: 'mockGameId',
  kickedPlayerId: 'mockIssueId',
  statusCode: TStatusCode.OK,
};

export const createIssueResponseSuccess = {
  gameId: 'mockGameId',
  issueId: 'mockIssueId',
  statusCode: TStatusCode.OK,
};

export const updateIssueResponseSuccess = {
  gameId: 'mockGameId',
  issueId: 'mockIssueId',
  statusCode: TStatusCode.OK,
};

export const deleteIssueResponseSuccess = {
  gameId: 'mockGameId',
  deletedIssueId: 'mockIssueId',
  statusCode: TStatusCode.OK,
};

export const startGameResponseSuccess = {
  gameId: 'mockGameId',
  statusCode: TStatusCode.OK,
};

export const cancelGameResponseSuccess = {
  gameId: 'mockGameId',
  statusCode: TStatusCode.OK,
};

export const postMessageResponseSuccess = {
  gameId: 'mockGameId',
  statusCode: TStatusCode.OK,
};

export const scoreIssueResponseSuccess = {
  gameId: 'mockGameId',
  issueId: 'mockIssueId',
  statusCode: TStatusCode.OK,
};

export const finishGameResponseSuccess = {
  gameId: 'mockGameId',
  statusCode: TStatusCode.OK,
};

export const changeCurrentIssueResponseSuccess = {
  gameId: 'mockGameId',
  issueId: 'mockIssueId',
  statusCode: TStatusCode.OK,
};

export const mockCurrentUser = new User({
  role: TUserRole.dealer,
  firstName: 'Simon',
  lastName: 'Pit',
  id: '22',
}).toObject();

export const mockCurrentUser1 = new User({
  role: TUserRole.player,
  firstName: 'Ann',
  lastName: 'Moroz',
  image:
    'https://likeyou.io/wp-content/uploads/2019/02/Snimok-ekrana-2019-02-15-v-16.03.56.png',
  jobPosition: 'FrontEnd Developer',
  id: '32',
}).toObject();

export const mockDealer = new User({
  role: TUserRole.dealer,
  jobPosition: 'Developer',
  firstName: 'Simon',
  lastName: 'Pit',
  id: '22',
}).toObject();

export const mockIssue = new Issue({ title: 'Planning 23' }).toObject();

export const mockLastRoundResult: TRoundResult = {
  1: 3,
  2: 3,
  3: TCardScoreSpecialValue.break,
  4: 5,
  5: 5,
  6: 3,
  7: 20,
};

export const mockLastRoundResult2: TRoundResult = {
  1: 5,
  2: 5,
  3: TCardScoreSpecialValue.break,
  4: 5,
  5: 20,
  6: 8,
  7: 20,
};

export const mockLastRoundResult3: TRoundResult = {
  1: 3,
  2: 3,
  3: TCardScoreSpecialValue.unknown,
  4: 1,
  5: 1,
};

export const mockLastRoundResult4: TRoundResult = {
  1: 3,
  2: 3,
  3: TCardScoreSpecialValue.unknown,
  4: 3,
  5: 1,
  6: TCardScoreSpecialValue.break,
};

export const mockIssues = [
  new Issue({
    id: '99',
    title: 'Planning 23',
    lastRoundResult: mockLastRoundResult,
  }).toObject(),
  new Issue({
    id: '2',
    title: '123456',
    lastRoundResult: mockLastRoundResult2,
  }).toObject(),
  new Issue({
    id: '3',
    title: '222285',
    lastRoundResult: mockLastRoundResult3,
  }).toObject(),
  new Issue({
    id: '4',
    title: '223385',
    lastRoundResult: mockLastRoundResult4,
  }).toObject(),
];

export const mockUsers = [
  mockDealer,
  new User({
    id: '1',
    role: TUserRole.observer,
    firstName: 'John',
    jobPosition: 'IOS Developer',
    lastName: 'Tramp',
    image:
      'https://www.liga.net/images/general/2019/02/14/20190214174619-9721.png',
  }).toObject(),
  new User({
    id: '3',
    role: TUserRole.player,
    firstName: 'Ann',
    image:
      'https://likeyou.io/wp-content/uploads/2019/02/Snimok-ekrana-2019-02-15-v-16.03.56.png',
    jobPosition: 'FrontEnd Developer',
  }).toObject(),
  new User({
    id: '4',
    role: TUserRole.player,
    firstName: 'John',
    jobPosition: 'IOS Developer',
    lastName: 'Tramp',
    image:
      'https://likeyou.io/wp-content/uploads/2019/02/Snimok-ekrana-2019-02-15-v-15.44.03.png',
  }).toObject(),
  new User({
    id: '5',
    role: TUserRole.player,
    firstName: 'Simon',
    lastName: 'Pit',
  }).toObject(),
  new User({
    id: '6',
    role: TUserRole.player,
    firstName: 'Ann',
    image:
      'https://likeyou.io/wp-content/uploads/2019/02/Snimok-ekrana-2019-02-15-v-16.03.56.png',
    jobPosition: 'FrontEnd Developer',
  }).toObject(),
  new User({ role: TUserRole.player, firstName: 'Simon' }).toObject(),
  new User({
    id: '7',
    role: TUserRole.observer,
    firstName: 'Jack',
    image:
      'https://cdn.maximonline.ru/ec/5b/70/ec5b701b6dc90d27cbde89b6e19a0d07/728x728_1_848ca9ef388ee0fdc2c538677e5709a7@1024x1024_0xac120002_17992516771550233711.jpg',
    jobPosition: 'FrontEnd Developer',
  }).toObject(),
];

export const mockMessages = [
  new Message({
    id: '1',
    userId: mockUsers[0].id,
    message: 'message 1',
  }).toObject(),
  new Message({
    id: '2',
    userId: mockUsers[1].id,
    message: 'message 2',
  }).toObject(),
  new Message({
    id: '3',
    userId: mockUsers[2].id,
    message: 'message 3',
  }).toObject(),
];
