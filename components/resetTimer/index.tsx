"use client";
import { useEffect, useState, useCallback } from "react";
import { useAppSelector, RootState } from "@/redux/store";
import { ClipLoader } from "react-spinners";
import { Button } from "../ui/button";

interface ResetTimerProps {
  initialSeconds?: number;
  onResend: () => void;
  storageKey: string;
}

const ResetTimer = ({
  initialSeconds,
  onResend,
  storageKey,
}: ResetTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const resendLoading = useAppSelector(
    (state: RootState) => state.verifyEmail.resendLoading
  );

  useEffect(() => {
    const savedStopTime = localStorage.getItem(storageKey);
    if (savedStopTime) {
      const diff = Math.floor((+savedStopTime - Date.now()) / 1000);
      setTimeLeft(diff > 0 ? diff : 0);
    }
  }, [storageKey]);

  useEffect(() => {
    if (timeLeft && timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev && prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev && prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const resetTimer = useCallback(() => {
    const newStopTime = Date.now() + (initialSeconds || 0) * 1000;

    localStorage.setItem(storageKey, newStopTime.toString());
    setTimeLeft(initialSeconds);

    onResend();
  }, [initialSeconds, onResend, storageKey]);

  const formatTime = (s: number) =>
    `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  return (
    <span>
      {timeLeft && timeLeft > 0 ? (
        <>In {formatTime(timeLeft)}</>
      ) : (
        <Button
          type="button"
          className="p-0 bg-transparent"
          onClick={resetTimer}
          disabled={resendLoading || (!!timeLeft && timeLeft > 0)}
        >
          {resendLoading ? (
            <ClipLoader color="#F4F4F4F4" size={10} />
          ) : (
            "Resend"
          )}
        </Button>
      )}
    </span>
  );
};

export default ResetTimer;
