'use client';

import React, { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAppDispatch } from '@/src/redux/store';
import { fetchGoogleUser } from '@/src/redux/slices/loginSlice';
import { ClipLoader } from "react-spinners";

const GoogleCallbackPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const code = searchParams.get('code');

    // Guard: no code → redirect immediately
    if (!code) {
      router.replace('/sign-in');
      return;
    }

    const handleAuth = async () => {
      try {
        const res = await dispatch(fetchGoogleUser(code));

        if (res.meta.requestStatus === 'fulfilled') {
          toast.success('Signed in successfully!');
          router.replace('/home');
        } else {
          toast.error('Sign-in failed. Please try again.');
          router.replace('/sign-in');
        }
      } catch (err) {
        console.error('Google auth error:', err);
        toast.error('Something went wrong. Please try again.');
        router.replace('/sign-in');
      }
    };

    handleAuth();
  }, []);

  return (
    <div className='flex items-center justify-center min-h-screen bg-[#0B0B0B]/50 backdrop-blur-sm'>
      <ClipLoader color='#F4F4F4' size={50} />
    </div>
  );
};

export default GoogleCallbackPage;
