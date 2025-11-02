"use client"
import React, { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/store';
import { fetchGoogleUser } from '@/redux/slices/loginSlice';
import { ClipLoader } from "react-spinners";
import { toast } from "react-hot-toast";

const GoogleCallbackPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const code = searchParams.get("code");
    console.log(code);
    if (code) {
      dispatch(fetchGoogleUser(code)).then((res: any) => {
        if (res.meta.requestStatus === "fulfilled") {
          router.replace("http://127.0.0.1:3000/home");
        } else {
          router.replace("http://127.0.0.1:3000/sign-in");
        }
      })
    } else {
      router.replace("http://127.0.0.1:3000/sign-in");
    }
  }, [searchParams, dispatch, router]);
  return (
    <div className='bg-[#0B0B0B]/50 backdrop-blur-xs'>
      <ClipLoader color="#F4F4F4F4" size={50} />
    </div>
  )
}

export default GoogleCallbackPage