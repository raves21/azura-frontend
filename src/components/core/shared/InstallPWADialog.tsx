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
            "https://media.discordapp.net/attachments/735833212198060054/1380569516731400231/Untitled_design_8.png?ex=68445b0e&is=6843098e&hm=6ee7dc33abf1e2d86372685278dfbcc1abe8f3241bebc0c986e788394dc7bc7e&=&format=webp&quality=lossless&width=583&height=699",
          instruction: "On your browser, click on options",
        },
        {
          image:
            "https://media.discordapp.net/attachments/735833212198060054/1380569516357976095/Untitled_design_9.png?ex=68445b0e&is=6843098e&hm=230b2016b467fd571f01c0d4e15ff04cf6837ce747bac52bdf936a3c79cb3a71&=&format=webp&quality=lossless&width=583&height=699",
          instruction: "Click on Add to Home screen",
        }
      ],
    },
    ios: {
      steps: [
        {
          image:
            "https://media.discordapp.net/attachments/735833212198060054/1380569516014174359/Untitled_design_10.png?ex=68445b0e&is=6843098e&hm=5dc4f7f714b19a3c096c6fd453292458c493ec12254eb6a30da7a5e612c766ea&=&format=webp&quality=lossless&width=583&height=699",
          instruction: "On your browser, click on options",
        },
        {
          image:
            "https://media.discordapp.net/attachments/735833212198060054/1380569515565518898/Untitled_design_11.png?ex=68445b0e&is=6843098e&hm=648a5b68c567254bda52f1630027930d7c98a10cce61d21e85cb5a57e9321dab&=&format=webp&quality=lossless&width=583&height=699",
          instruction: "Click on Add to Home screen",
        },
      ],
    },
  },
  desktop: {
    steps: [
      {
        image:
          "https://media.discordapp.net/attachments/735833212198060054/1380569515217125456/Untitled_design_12.png?ex=68445b0e&is=6843098e&hm=ecc1326ddfc3b490afaae59d983f6bc8b4938eb58328d343232cb39247742026&=&format=webp&quality=lossless&width=583&height=699",
        instruction:
          "In the Address/URL bar of your browser, click the icon resembling the icon shown in the image",
      },
      {
        image:
          "https://media.discordapp.net/attachments/735833212198060054/1380564023300325539/image.png?ex=684455f0&is=68430470&hm=e0324448938808a558920e2a56a2eeaec671a23fa78c77db4682b7daa5bde06e&=&format=webp&quality=lossless&width=696&height=271",
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
            <p>as an app</p>
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
