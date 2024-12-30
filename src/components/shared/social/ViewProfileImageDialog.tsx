import { useGlobalStore } from "@/utils/stores/globalStore";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

type ViewProfileImageDialog = {
  type: "avatar" | "banner";
  src: string;
};

export default function ViewProfileImageDialog({
  type,
  src,
}: ViewProfileImageDialog) {
  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setHasMounted(true);
    }, 180);
  }, []);

  return (
    <div
      onClick={() => {
        setHasMounted(false);
        toggleOpenDialog(null);
      }}
      className="absolute inset-0 grid size-full place-items-center"
    >
      {hasMounted && (
        <button
          onClick={() => {
            setHasMounted(false);
            toggleOpenDialog(null);
          }}
          className="group absolute top-4 right-4 rounded-full p-3 border-[0.5px] border-socialTextSecondary"
        >
          <X className="transition-colors size-7 stroke-mainWhite group-hover:stroke-mainAccent" />
        </button>
      )}
      {type === "avatar" ? (
        <img
          onClick={(e) => e.stopPropagation()}
          src={src}
          alt="useravatar image"
          className="object-cover rounded-full aspect-square w-[90%] mobile-l:w-[80%] sm:w-[70%] md:w-[50%] max-w-[500px]"
        />
      ) : (
        <img
          onClick={(e) => e.stopPropagation()}
          src={src}
          alt="user banner image"
          className="aspect-[3/1] w-full object-cover"
        />
      )}
    </div>
  );
}
