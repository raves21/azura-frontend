import { api } from "@/utils/variables/axiosInstances/backendAxiosInstance";
import { PropsWithChildren, useEffect } from "react";

const PULSE_INTERVAL = 15 * 60 * 1000; //15 minute interval
export default function PulseCheckAuth({ children }: PropsWithChildren) {
  useEffect(() => {
    const tokenPulse = setInterval(async () => {
      await api.get("/check-token");
    }, PULSE_INTERVAL);

    return () => {
      clearInterval(tokenPulse);
    };
  }, []);

  return children;
}
