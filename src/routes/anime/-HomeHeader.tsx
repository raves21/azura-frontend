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

  return (
    <div
      className={`fixed left-1/2 ml-[-50vw] w-dvw z-[45] ${isScrolledDown ? "bg-darkBg/80" : ""} transition-all duration-300 hidden lg:block`}
    >
      <div
        className={`flex items-center justify-between mx-auto px-16 max-w-[1440px] py-4 transition-all duration-300`}
      >
        <Menu size={24} color="white" />
        <div className="flex items-center gap-12 text-sm text-gray-30">
          <Link
            to="/anime"
            className={cn("text-gray-300", {
              "text-white font-medium": isRouteCurrent("anime"),
            })}
          >
            Anime
          </Link>
          <Link
            to="/anime/catalog"
            className={cn("text-gray-300", {
              "text-white font-medium": isRouteCurrent("catalog"),
            })}
          >
            Catalog
          </Link>
          <img src="/azurawatch-logo.svg" className="size-12" />
          <Link>Social</Link>
          <Link>Profile</Link>
        </div>
        <button>
          <Search onClick={() => toggleOpenDialog(<SearchDialog />)} />
        </button>
      </div>
    </div>
  );
}
