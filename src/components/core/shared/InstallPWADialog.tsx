import GlobalDialogHeaderCloseButton from "@/components/global/shared/GlobalDialogHeaderCloseButton";
import { useGlobalStore } from "@/utils/stores/useGlobalStore";
import Bowser from "bowser";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";

const steps: any = {
  mobile: {
    android: {
      steps: [
        {
          image:
            "/installPWADialogImages/android_1.png",
          instruction: "On your browser, click on options",
        },
        {
          image:
            "/installPWADialogImages/android_2.png",
          instruction: "Click on Add to Home screen",
        }
      ],
    },
    ios: {
      steps: [
        {
          image:
            "/installPWADialogImages/ios_1.png",
          instruction: "On your browser, click on options",
        },
        {
          image:
            "/installPWADialogImages/ios_2.png",
          instruction: "Click on Add to Home screen",
        },
      ],
    },
  },
  desktop: {
    steps: [
      {
        image:
          "/installPWADialogImages/desktop_1.png",
        instruction:
          "In the Address/URL bar of your browser, click the icon resembling the icon shown in the image",
      },
      {
        image:
          "/installPWADialogImages/desktop_2.png",
        instruction: "Click on install",
      },
    ],
  },
};

export default function InstallPWADialog() {
  const [setIsDialogClickableOutside, toggleOpenDialog] = useGlobalStore(
    useShallow((state) => [
      state.setIsDialogClickableOutside,
      state.toggleOpenDialog,
    ])
  );
  const userAgentParser = Bowser.getParser(window.navigator.userAgent);

  const os = userAgentParser.getOS().name;
  const platform = userAgentParser.getPlatform().type;

  let stepsBasedOnDevice: any;

  if (os === "iOS" && platform === "mobile") {
    stepsBasedOnDevice = steps.mobile.ios.steps;
  } else if (os === "Android" && platform === "mobile") {
    stepsBasedOnDevice = steps.mobile.android.steps;
  } else {
    stepsBasedOnDevice = steps.desktop.steps;
  }

  const [stepNum, setStepNum] = useState<number>(0);
  const [_steps, _setSteps] = useState<any>(stepsBasedOnDevice)
  
  function nextStep() {
    if(stepNum === 0){
        setStepNum((prev) => prev + 1)
    }
    else{
        toggleOpenDialog(null)
    }
  }

  function prevStep(){
    setStepNum((prev) => prev - 1)
  }

  useEffect(() => {
    return () => setIsDialogClickableOutside(true);
  }, []);

  return (
    <div className="relative md:aspect-square h-auto w-[95dvw] md:size-[550px] bg-socialPrimary rounded-lg text-mainWhite">
      <GlobalDialogHeaderCloseButton
        className="top-8 "
        onClick={() => toggleOpenDialog(null)}
      />
      <div className="px-2 sm:px-8 h-full pt-14 pb-10">
        <div className=" size-full flex flex-col gap-6">
          <div className="text-xl sm:text-2xl md:text-3xl flex-wrap justify-center w-full flex items-center font-semibold gap-2">
            <p>Install</p>
            <img src="/azura-logo.svg" className="size-10 mb-2" />
            <p>as an app?</p>
          </div>
          <div className="relative w-full h-[250px] grid place-items-center">
            <img
              src={_steps[stepNum].image}
              className="object-contain absolute inset-0 size-full"
            />
          </div>
          <p className="px-12 text-center font-medium">
            {_steps[stepNum].instruction}
          </p>
          <div className="flex items-center text-sm mobile-l:text-base px-2 sm:px-8 gap-3">
            <button onClick={prevStep} disabled={stepNum === 0} className="rounded-lg hover:border-fuchsia-700 transition-colors flex-1 font-medium grid place-items-center py-3 border border-mainAccent disabled:text-gray-400 disabled:border-gray-400">
              Back
            </button>
            <button onClick={nextStep} className="rounded-lg hover:bg-fuchsia-700 transition-colors flex-1 font-medium grid place-items-center py-3 border border-mainAccent bg-mainAccent">
              {stepNum === 1 ? "Got it, thanks!" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
