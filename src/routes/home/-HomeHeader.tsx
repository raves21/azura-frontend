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
      className={`fixed flex items-center justify-between w-screen px-10 py-4 z-[9999] ${isScrolledDown ? "bg-darkBg/80" : ""} transition-all duration-300`}
    >
      <Menu size={24} color="white" />
      <div className="flex items-center gap-12 text-sm">
        <Link className="font-medium">Anime</Link>
        <Link className="text-gray-300">Movie / TV</Link>
        <img src="/temp-logo.svg" className="size-12" />
        <Link className="text-gray-300">Social</Link>
        <Link className="text-gray-300">Profile</Link>
      </div>
      {/* <div className='flex items-center gap-8'> */}
      <Search />
      {/* </div> */}
    </div>
  );
}
