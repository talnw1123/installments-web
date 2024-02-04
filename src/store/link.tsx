'use client';
import { atom, RecoilState } from 'recoil';

export const activeLinkState: RecoilState<string> = atom({
  key: 'activeLink',
  default: 'HOME',
});
