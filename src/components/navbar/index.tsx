'use client';

import { AuthState, authState, useRecoilState } from '@store/index';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import Navbar from './navbar';

const Navigation = () => {
  const isMounted = useRef(false);
  const [auth, setAuth] = useRecoilState<AuthState>(authState);
  const router = useRouter();
  useEffect(() => {
    if (!isMounted.current) {
      const authStorage = localStorage.getItem('auth');
      if (authStorage) {
        const authParseJson = JSON.parse(authStorage);
        setAuth(authParseJson);
        router.push(`/`);
      } else {
        setAuth({ email: '', token: '' });
        return;
      }
      return () => {
        isMounted.current = true;
      };
    }
  }, [router, setAuth]);

  return <Navbar token={auth?.token} />;
};

export default Navigation;
