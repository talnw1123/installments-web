'use client';

import { authState, useRecoilState } from '@store/index';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

import Navbar from './navbar';

// Navigation.tsx
const Navigation = () => {
  const isMounted = useRef(false);
  const [auth, setAuth] = useRecoilState(authState);
  const router = useRouter();

  // useEffect(() => {
  //   // เมื่อ auth.email หรือ auth.token เปลี่ยนแปลง
  //   localStorage.setItem('auth', JSON.stringify(auth));
  // }, [auth]);

  // useEffect(() => {
  //   const storedAuth = localStorage.getItem('auth');
  //   if (storedAuth) {
  //     const parsedAuth = JSON.parse(storedAuth);
  //     if (parsedAuth.email && parsedAuth.token) {

  //       setAuth({ email: parsedAuth.email, token: parsedAuth.token });
  //     }
  //   }
  // }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const storedAuth = localStorage.getItem('auth');
      if (storedAuth) {
        const parsedAuth = JSON.parse(storedAuth);
        if (parsedAuth.email && parsedAuth.token) {
          setAuth({ email: parsedAuth.email, token: parsedAuth.token });
          // saveLoginDataToStorage(auth.email, auth.token)
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // ฟังก์ชันเก็บข้อมูลการ login ลงใน localStorage
  const saveLoginDataToStorage = (email: string, token: string) => {
    const loginData = {
      email,
      token,
      timestamp: new Date().getTime(), // เพิ่ม timestamp เพื่อให้ระบบตรวจสอบการ login ในระยะเวลา
    };
    // console.log(loginData)
    localStorage.setItem('auth', JSON.stringify(loginData)); // เปลี่ยนชื่อ key ใน localStorage เป็น 'auth'
  };

  // ฟังก์ชันดึงข้อมูลการ login จาก localStorage
  const getLoginDataFromStorage = () => {
    const loginDataString = localStorage.getItem('auth');
    // console.log('loginDataString:', loginDataString); // เพิ่ม log เพื่อตรวจสอบค่า loginDataString

    if (loginDataString) {
      const loginData = JSON.parse(loginDataString);
      // console.log('loginData:', loginData); // เพิ่ม log เพื่อตรวจสอบค่า loginData

      const currentTime = new Date().getTime();
      const elapsedTime = currentTime - loginData.timestamp;
      // console.log('elapsedTime:', elapsedTime); // เพิ่ม log เพื่อตรวจสอบค่า elapsedTime

      const hourInMillis = 60 * 60 * 1000; // 1 ชั่วโมงใน millisecond

      if (elapsedTime <= hourInMillis) {
        return loginData;
      } else {
        localStorage.removeItem('auth');
        console.log('auth removed'); // เพิ่ม log เพื่อตรวจสอบว่า auth ถูกลบหรือไม่
      }
    }
    return null;
  };


  // ฟังก์ชันตรวจสอบและโหลดข้อมูลการ login
  const checkAndLoadLoginData = () => {
    const loginData = getLoginDataFromStorage();
    // console.log(loginData)
    if (loginData) {
      // console.log("เทพ")
      setAuth({ email: loginData.email, token: loginData.token });
    } else {

      setAuth({ email: '', token: '' });
      // console.log("กาก")
    }
  };

  useEffect(() => {
    if (!isMounted.current) {
      checkAndLoadLoginData();
      isMounted.current = true;
    }
  }, []);

  // useEffect(() => {
  //   // โหลดข้อมูล auth จาก localStorage เมื่อเริ่มต้นโครงการ
  //   const storedAuth = localStorage.getItem('auth');
  //   if (storedAuth) {
  //     setAuth(JSON.parse(storedAuth));
  //   }

  //   // กำหนด isMounted เป็น true เพื่อไม่ให้ useEffect นี้ทำงานซ้ำในการ render ถัดไป
  //   isMounted.current = true;
  // }, []);

  useEffect(() => {
    // console.log(auth.email, auth.token);
    saveLoginDataToStorage(auth.email, auth.token)
    if (auth.token) {
      // console.log(auth.email, auth.token)
      router.push('/'); // Redirect ไปยังหน้าที่ต้องการหลังจาก login สำเร็จ
    }
  }, [auth.token, router]);


  return <Navbar token={auth?.token} />;
};

export default Navigation;
