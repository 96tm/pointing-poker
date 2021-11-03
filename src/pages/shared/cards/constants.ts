import { TCardScoreSpecialValue, TCardType } from '../../../redux/types/card';

export const DECKS = {
  [TCardType.fib]: [
    TCardScoreSpecialValue.unknown,
    TCardScoreSpecialValue.break,
    1,
    2,
    3,
    5,
    8,
    13,
    21,
    34,
    55,
    89,
  ],
  [TCardType.powersOfTwo]: [
    TCardScoreSpecialValue.unknown,
    TCardScoreSpecialValue.break,
    1,
    2,
    4,
    8,
    16,
    32,
    64,
    128,
    256,
    512,
  ],
  [TCardType.custom]: [
    TCardScoreSpecialValue.unknown,
    TCardScoreSpecialValue.break,
  ],
};
