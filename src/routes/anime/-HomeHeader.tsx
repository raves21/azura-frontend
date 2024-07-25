import { Link } from "@tanstack/react-router";
import { Menu, Search } from "lucide-react";
import { useEffect, useState } from "react";

export default function HomeHeader() {
  const [isScrolledDown, setIsScrolledDown] = useState(false);

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
      className={`fixed left-1/2 ml-[-50vw] w-dvw z-[999999] ${isScrolledDown ? "bg-darkBg/80" : ""} transition-all duration-300 hidden lg:block`}
    >
      <div
        className={`flex items-center justify-between mx-auto px-16 max-w-[1440px] py-4 transition-all duration-300`}
      >
        <Menu size={24} color="white" />
        <div className="flex items-center gap-12 text-sm">
          <Link
          to="/anime"
          className="font-medium">Anime</Link>
          <Link className="text-gray-300">Movie / TV</Link>
          <img src="/temp-logo2.svg" className="size-12" />
          <Link className="text-gray-300">Social</Link>
          <Link className="text-gray-300">Profile</Link>
        </div>
        <Search />
      </div>
    </div>
  );
}
