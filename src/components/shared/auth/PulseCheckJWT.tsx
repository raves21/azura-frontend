import { api } from "@/utils/axiosInstance";
import { PropsWithChildren, useEffect } from "react";

export default function PulseCheckJWT({ children }: PropsWithChildren) {
  useEffect(() => {
    console.log("useeffect ran");
    const pulseInterval = 900_000; //15 minute interval
    const tokenPulse = setInterval(async () => {
      console.log("pulse check token");
      await api.get("/check-token");
    }, pulseInterval);

    return () => {
      clearInterval(tokenPulse);
    };
  }, []);

  return <>{children}</>;
}