import { useTipTapEditor } from "@/utils/hooks/useTipTapEditor";
import { useEditProfileStore } from "@/utils/stores/useEditProfileStore";
import { EditorContent } from "@tiptap/react";
import { ImageUp, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";

type EditProfilePageProps = {
  avatar: string | null;
  banner: string | null;
  userName: string;
  bio: string | null;
};

export default function EditProfilePage({
  avatar,
  banner,
  userName,
  bio
}: EditProfilePageProps) {
  const [
    editProfileAvatar,
    editProfileBanner,
    setEditProfileAvatar,
    setEditProfileBanner,
    setEditProfilePage
  ] = useEditProfileStore(
    useShallow((state) => [
      state.editProfileAvatar,
      state.editProfileBanner,
      state.setEditProfileAvatar,
      state.setEditProfileBanner,
      state.setEditProfilePage
    ])
  );

  const {
    editor: bioEditor,
    editorContentRef: bioEditorRef,
    // inputText: bioInput,
    inputLength: bioInputLength,
    setEditorContent: setBioInput,
    editorContentInitialHeight: bioEditorInitialHeight
  } = useTipTapEditor({
    focusOnMount: false,
    placeholder: "eg. Artist, dog-lover, Azura #1 fan",
    maxLength: 150,
    editorProps: {
      attributes: {
        class: "h-32"
      }
    }
  });

  const [userNameInput, setUserNameInput] = useState(userName);

  //initialize values
  useEffect(() => {
    if (bio) setBioInput(bio);

    // only set the state of the avatar and banner to the default ones (the one the user already has)
    // if the user hasnt made any changes to it yet
    if (avatar && !editProfileAvatar) setEditProfileAvatar(avatar);
    if (banner && !editProfileBanner) setEditProfileBanner(banner);
  }, []);

  return (
    <>
      <div className="flex flex-col flex-grow gap-24 overflow-y-auto">
        <div className="relative w-full h-48 shrink-0">
          <div className="absolute size-full">
            <img
              src={editProfileBanner ?? "/no-image-2.jpg"}
              alt="banner"
              className="object-cover size-full"
            />
            <div className="absolute flex gap-6 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
              <button
                onClick={() => setEditProfilePage("manageBannerPage")}
                className="transition-colors rounded-full hover:bg-gray-700/80 size-12 bg-socialPrimary/60 place-items-center"
              >
                <ImageUp className="size-[55%] stroke-[1.5px]" />
              </button>
              {editProfileBanner && (
                <button
                  onClick={() => setEditProfileBanner(null)}
                  className="transition-colors rounded-full hover:bg-gray-700/80 size-12 bg-socialPrimary/60 place-items-center"
                >
                  <X className="size-[55%] stroke-[1.5px]" />
                </button>
              )}
            </div>
          </div>
          <div className="absolute -bottom-[38%] left-4 size-[120px] rounded-full  border-4 overflow-hidden box-content border-socialPrimary">
            <img
              src={editProfileAvatar ?? "/no-image-2.jpg"}
              alt="avatar"
              className="object-cover size-full"
            />
            <div className="absolute flex gap-3 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
              <button
                onClick={() => setEditProfilePage("manageAvatarPage")}
                className="transition-colors rounded-full hover:bg-gray-700/80 size-9 bg-socialPrimary/60 place-items-center"
              >
                <ImageUp className="size-[55%] stroke-[1.5px]" />
              </button>
              {editProfileAvatar && (
                <button
                  onClick={() => setEditProfileAvatar(null)}
                  className="transition-colors rounded-full hover:bg-gray-700/80 size-9 bg-socialPrimary/60 place-items-center"
                >
                  <X className="size-[55%] stroke-[1.5px]" />
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 px-5 mb-8">
          <div className="flex flex-col w-full gap-2">
            <div className="flex justify-between">
              <p className="font-medium">Username</p>
              <p className="text-sm font-light text-socialTextSecondary">
                {userNameInput.length}/{30}
              </p>
            </div>
            <input
              maxLength={30}
              placeholder="e.g: Justin Roiland"
              value={userNameInput}
              onChange={(e) => setUserNameInput(e.currentTarget.value)}
              type="text"
              className="rounded-md border-[0.5px] border-socialTextSecondary px-3 py-3 focus:outline-none bg-socialPrimary"
            />
          </div>
          <div className="flex flex-col w-full gap-2">
            <div className="flex justify-between">
              <p className="font-medium">Bio</p>
              <p className="text-sm font-light text-socialTextSecondary">
                {bioInputLength}/{150}
              </p>
            </div>
            <EditorContent
              editor={bioEditor}
              ref={bioEditorRef}
              style={{
                maxHeight: bioEditorInitialHeight || "auto"
              }}
              className="rounded-md border-[0.5px] border-socialTextSecondary box-content px-3 overflow-y-auto py-3"
            />
          </div>
        </div>
      </div>
      <button className="grid py-2 m-4 font-semibold transition-colors disabled:bg-gray-700 disabled:text-socialTextSecondary bg-mainAccent rounded-xl place-items-center text-mainWhite">
        Save
      </button>
    </>
  );
}
