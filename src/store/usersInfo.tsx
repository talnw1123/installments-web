'use client';
import { atom, RecoilState } from 'recoil';

export type usersInfo = {
  userNationID : string;
};

export const userState: RecoilState<usersInfo> = atom({
  key: 'USERSINFO',
  default: {
    userNationID: '',
  } as usersInfo,
});
