import { useMediaPortalStore } from "@/utils/stores/useMediaPortal";
import { MediaType } from "@/utils/types/shared";
import { motion } from "framer-motion";
import MediaPortalMediaLabel from "./MediaPortalMediaLabel";

type Props = {
  isMobile: boolean;
  type: MediaType;
  image: string;
};

export default function MediaPortalMedia({ isMobile, type, image }: Props) {
  const mediaPortalAnimationStatus = useMediaPortalStore(
    (state) => state.mediaPortalAnimationStatus
  );

  let initialClipPath: string;
  let animationClipPath: string;
  let animationDelay: number;
  if (isMobile) {
    switch (type) {
      case "TV":
        initialClipPath = "inset(0 100% 0 0)";
        animationClipPath =
          mediaPortalAnimationStatus === "intro"
            ? "inset(0 0 0 0%)"
            : initialClipPath;
        animationDelay = 0;
        break;
      case "ANIME":
        initialClipPath = "inset(0 0 0 100%)";
        animationClipPath =
          mediaPortalAnimationStatus === "intro"
            ? "inset(0 0 0 0%)"
            : initialClipPath;
        animationDelay = 0.2;
        break;
      case "MOVIE":
        initialClipPath = "inset(0 100% 0 0)";
        animationClipPath =
          mediaPortalAnimationStatus === "intro"
            ? "inset(0 0 0 0%)"
            : initialClipPath;
        animationDelay = 0.4;
        break;
    }
  } else {
    switch (type) {
      case "TV":
        initialClipPath = "inset(100% 0 0 0)";
        animationClipPath =
          mediaPortalAnimationStatus === "intro"
            ? "inset(0 0 0 0)"
            : initialClipPath;
        animationDelay = 0;
        break;
      case "ANIME":
        initialClipPath = "inset(0 0 100% 0)";
        animationClipPath =
          mediaPortalAnimationStatus === "intro"
            ? "inset(0 0 0 0)"
            : initialClipPath;
        animationDelay = 0.2;
        break;
      case "MOVIE":
        initialClipPath = "inset(100% 0 0 0)";
        animationClipPath =
          mediaPortalAnimationStatus === "intro"
            ? "inset(0 0 0 0)"
            : initialClipPath;
        animationDelay = 0.4;
        break;
    }
  }

  return (
    <motion.div
      initial={{
        clipPath: initialClipPath,
        width: isMobile ? "100%" : "auto",
        height: isMobile ? "auto" : "100%",
      }}
      animate={{
        clipPath: animationClipPath,
      }}
      transition={{ duration: 0.2, ease: "easeInOut", delay: animationDelay }}
      className="flex-1 relative group font-montserrat"
    >
      <MediaPortalMediaLabel isMobile={isMobile} type={type} />
      <div className="z-20 size-full inset-0 bg-black/50 absolute" />
      <img
        src={image}
        className="size-full object-cover absolute inset-0 z-10"
      />
    </motion.div>
  );
}
