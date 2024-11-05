import { useGlobalStore } from "@/utils/stores/globalStore";
import { Link, useRouter } from "@tanstack/react-router";
import { Menu, Search } from "lucide-react";
import { useEffect, useState } from "react";
import SearchDialog from "./-SearchDialog";
import { cn } from "@/lib/utils";

export default function HomeHeader() {
  const [isScrolledDown, setIsScrolledDown] = useState(false);

  const { toggleOpenDialog } = useGlobalStore();
  const router = useRouter();

  function isRouteCurrent(route: string) {
    const pathnameArray = router.latestLocation.pathname.split("/");
    return pathnameArray[pathnameArray.length - 1] === route;
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolledDown(true);
      } else {
        setIsScrolledDown(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const DesktopHeader = (
    <div
      className={`flex font-medium items-center justify-between mx-auto px-2 lg:max-w-[1000px] xl:max-w-[1200px] 1440:max-w-[1300px] 2xl:max-w-[1400px] 1600:max-w-[1450px] py-4`}
    >
      <button className="p-[6px]">
        <Menu />
      </button>
      <div className="flex items-center gap-12 text-sm text-gray-300 text-gray-30">
        <Link
          to="/anime"
          className={cn("p-[6px]", {
            "text-white": isRouteCurrent("anime"),
          })}
        >
          Anime
        </Link>
        <Link
          to="/anime/catalog"
          className={cn("p-[6px]", {
            "text-white": isRouteCurrent("catalog"),
          })}
        >
          Catalog
        </Link>
        <img src="/azura-logo.svg" className="size-12" />
        <Link className="p-[6px]">Social</Link>
        <Link className="p-[6px]">Profile</Link>
      </div>
      <button
        onClick={() => toggleOpenDialog(<SearchDialog />)}
        className="p-[6px]"
      >
        <Search />
      </button>
    </div>
  );

  const MobileHeader = (
    <>
      <div className="flex items-center gap-4 mobile-m:gap-6">
        <Link to="/anime" className="p-1">
          <img
            src="/azura-logo-with-label.svg"
            className="w-24 mobile-m:w-28"
          />
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <button
          className="p-[6px]"
          onClick={() => toggleOpenDialog(<SearchDialog />)}
        >
          <Search className="size-6" />
        </button>
        <button className="p-[2px]">
          <div className="p-[2px] rounded-full bg-mainAccent box-content">
            <div className="box-content overflow-hidden border-2 rounded-full size-6 border-darkBg">
              <img
                src="/sample-user-pfp.png"
                className="object-cover size-full"
              />
            </div>
          </div>
        </button>
      </div>
    </>
  );

  return (
    <header className="font-montserrat">
      <div
        className={`fixed flex z-[45] px-2 sm:px-3 py-4  ${isScrolledDown ? "bg-darkBg" : ""} transition-all duration-300 items-center justify-between w-dvw left-1/2 ml-[-50vw] lg:hidden`}
      >
        {MobileHeader}
      </div>
      <div
        className={`fixed left-1/2 ml-[-50vw] w-dvw z-[45] ${isScrolledDown ? "bg-darkBg/80" : ""} transition-all duration-300 hidden lg:block`}
      >
        {DesktopHeader}
      </div>
    </header>
  );
}
