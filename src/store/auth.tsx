'use client';
import { atom, RecoilState } from 'recoil';

export type AuthState = {
  email: string;
  token: string;
};

export const authState: RecoilState<AuthState> = atom({
  key: 'AUTH',
  default: {
    email: '',
    token: '',
  } as AuthState,
});
