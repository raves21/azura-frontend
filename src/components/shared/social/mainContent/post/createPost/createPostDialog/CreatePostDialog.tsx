import { ReactNode, useEffect } from "react";
import { useCreatePostStore } from "@/utils/stores/createPostStore";
import CreatePostPage from "./CreatePostPage";
import SelectPrivacyPage from "./SelectPrivacyPage";
import { ArrowLeft, X } from "lucide-react";
import { useGlobalStore } from "@/utils/stores/globalStore";
import { useShallow } from "zustand/react/shallow";
import { EntityPrivacy } from "@/utils/types/social/shared";

export default function CreatePostDialog() {
  const [createPostPage, setCreatePostPage] = useCreatePostStore(
    useShallow((state) => [state.createPostPage, state.setCreatePostPage])
  );
  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);

  const setSelectedPrivacy = useCreatePostStore(
    (state) => state.setSelectedPrivacy
  );

  useEffect(() => {
    const defaultCreatePostPrivacyPreference = localStorage.getItem(
      "defaultCreatePostPrivacyPreference"
    );
    if (defaultCreatePostPrivacyPreference) {
      setSelectedPrivacy(defaultCreatePostPrivacyPreference as EntityPrivacy);
    } else {
      localStorage.setItem("defaultCreatePostPrivacyPreference", "PUBLIC");
      setSelectedPrivacy("PUBLIC");
    }
  }, []);

  let currentPage: ReactNode;

  switch (createPostPage) {
    case "createPost":
      currentPage = <CreatePostPage />;
      break;
    case "selectPrivacy":
      currentPage = <SelectPrivacyPage />;
      break;
    default:
      currentPage = <CreatePostPage />;
  }

  return (
    <div className="h-[500px] bg-socialPrimary rounded-lg flex flex-col w-[550px] text-mainWhite">
      <div className="relative w-full py-4 border-b-[0.5px] grid place-items-center border-socialTextSecondary/40">
        {createPostPage !== "createPost" && (
          <button
            onClick={() => setCreatePostPage("createPost")}
            className="group absolute top-1/2 -translate-y-1/2 left-4 rounded-full p-2 border-[0.5px] border-socialTextSecondary"
          >
            <ArrowLeft className="transition-colors size-5 stroke-mainWhite group-hover:stroke-mainAccent" />
          </button>
        )}
        <p className="text-lg font-semibold">New post</p>
        {createPostPage === "createPost" && (
          <button
            onClick={() => toggleOpenDialog(null)}
            className="group absolute top-1/2 -translate-y-1/2 right-4 rounded-full p-2 border-[0.5px] border-socialTextSecondary"
          >
            <X className="transition-colors size-5 stroke-mainWhite group-hover:stroke-mainAccent" />
          </button>
        )}
      </div>
      {currentPage}
    </div>
  );
}
