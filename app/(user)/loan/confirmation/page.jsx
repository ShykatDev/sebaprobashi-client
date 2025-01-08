'use client'

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const LoanConfirmation = () => {

    const [timeLeft, setTimeLeft] = useState(1 * 60);
    const router = useRouter()
    const {t} = useTranslation()

    useEffect(() => {
        // Update the timer every second
        const timer = setInterval(() => {
          setTimeLeft((prevTime) => {
            if (prevTime <= 1) {
              clearInterval(timer); // Stop the timer when it reaches zero
              router.push("/"); // Redirect to home page
              return 0;
            }
            return prevTime - 1;
          });
        }, 1000);
    
        return () => clearInterval(timer); // Cleanup on component unmount
      }, [router]);


      // Format time as MM:SS
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    // <div className="timer-container" style={{ textAlign: "center", marginTop: "50px" }}>
    //   <h1>Countdown Timer</h1>
    //   <p style={{ fontSize: "24px" }}>Time Left: {formatTime(timeLeft)}</p>
    // </div>
    <div className="flex justify-center items-center ">
      <div className="bg-background rounded-lg px-10 py-10 flex flex-col items-center">
        <Image
          alt="check"
          src={"/assets/check-mark.png"}
          width={60}
          height={60}
          className="rounded-full border border-green-600"
        />

        <h2 className="text-primary text-center font-semibold text-2xl">
          {t("CONFIRMATION.TITLE")}
        </h2>
        <p className="text-center md:w-2/3 text-gray-500 mt-1">
        {t("CONFIRMATION.DESC")}
        </p>

        <Link
          href={"/"}
          className="bg-primary px-6 py-2 rounded-md text-background font-medium mt-4"
        >
          <button>{t("CONFIRMATION.BUTTON")}</button>
        </Link>

        <p style={{ fontSize: "24px" }}>Time Left: {formatTime(timeLeft)}</p>
      </div>
    </div>
  )
}

export default LoanConfirmation