import { api } from "@/utils/variables/axiosInstances/backendAxiosInstance";
import { PropsWithChildren, useEffect } from "react";

const PULSE_INTERVAL = 1 * 60 * 60 * 1000; //1 hour interval
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
