import { useTipTapEditor } from "@/utils/hooks/useTipTapEditor";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import { NoNewLine } from "@/utils/variables/tipTapCustomExtensions";
import { EditorContent } from "@tiptap/react";
import { X } from "lucide-react";
import { useEffect } from "react";

type EditProfileDialogProps = {
  avatar: string | null;
  banner: string | null;
  userName: string;
  bio: string | null;
};

export default function EditProfileDialog({
  userName,
  // banner,
  bio
  // avatar
}: EditProfileDialogProps) {
  const toggleOpenDialog = useGlobalStore((state) => state.toggleOpenDialog);

  const {
    editor: userNameEditor,
    editorContentRef: userNameEditorRef,
    // inputText: userNameInput,
    setInputText: setUserNameInput,
    editorContentInitialHeight: userNameEditorInitialHeight,
    inputLength: userNameInputLength
    // clearInputText: clearUserNameInput
  } = useTipTapEditor({
    focusOnMount: false,
    placeholder: "eg. Justin Roiland",
    maxLength: 30,
    customExtensions: [NoNewLine]
  });

  const {
    editor: bioEditor,
    editorContentRef: bioEditorRef,
    // inputText: bioInput,
    setInputText: setBioInput,
    inputLength: bioInputLength,
    editorContentInitialHeight: bioEditorInitialHeight
    // clearInputText: clearBioInput
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

  useEffect(() => {
    if (userName) setUserNameInput(userName);
    if (bio) setBioInput(bio);
  }, []);

  return (
    <div className="aspect-[1/1] bg-socialPrimary overflow-y-auto rounded-lg flex flex-col w-[620px] text-mainWhite">
      <div className="relative w-full py-4 border-b-[0.5px] grid place-items-center border-socialTextSecondary/40">
        <p className="text-lg font-semibold">Edit Profile</p>
        <button
          onClick={() => toggleOpenDialog(null)}
          className="group absolute top-1/2 -translate-y-1/2 right-4 rounded-full p-2 border-[0.5px] border-socialTextSecondary"
        >
          <X className="transition-colors size-5 stroke-mainWhite group-hover:stroke-mainAccent" />
        </button>
      </div>
      <div className="flex flex-col flex-grow gap-24 overflow-y-auto">
        <div className="relative w-full h-48 shrink-0">
          <img
            src="https://i.pinimg.com/originals/5b/66/7d/5b667d877265b876259a1633403b0ec9.jpg"
            alt="banner"
            className="absolute object-cover size-full"
          />
          <img
            src="https://i1.sndcdn.com/avatars-000313137274-zojf90-t1080x1080.jpg"
            alt="avatar"
            className="absolute -bottom-[38%] left-4 size-[120px] rounded-full object-cover border-4 box-content border-socialPrimary"
          />
        </div>
        <div className="flex flex-col gap-6 px-5 mb-8">
          <div className="flex flex-col w-full gap-2">
            <div className="flex justify-between">
              <p className="font-semibold">Username</p>
              <p className="text-sm font-light text-socialTextSecondary">
                {userNameInputLength}/{30}
              </p>
            </div>
            <EditorContent
              editor={userNameEditor}
              ref={userNameEditorRef}
              style={{
                maxHeight: userNameEditorInitialHeight || "auto"
              }}
              className="rounded-md border-[0.5px] border-socialTextSecondary px-4 py-3"
            />
          </div>
          <div className="flex flex-col w-full gap-2">
            <div className="flex justify-between">
              <p className="font-semibold">Bio</p>
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
              className="rounded-md border-[0.5px] border-socialTextSecondary box-content px-4 overflow-y-auto py-3"
            />
          </div>
        </div>
      </div>
      <button className="grid py-2 m-4 font-semibold transition-colors disabled:bg-gray-700 disabled:text-socialTextSecondary bg-mainAccent rounded-xl place-items-center text-mainWhite">
        {userName}
      </button>
    </div>
  );
}
