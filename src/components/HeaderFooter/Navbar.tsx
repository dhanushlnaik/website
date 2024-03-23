import AuthButton from "../auth/authButton";
import Link from "next/link";
import { Home } from "lucide-react";
import Image from "next/image";
export function Navbar() {
  return (
    <>
      <div className="fixed sm:flex border-gray-200 bg-white/75 backdrop-blur-lg transition-all hidden justify-between rounded-b-20 w-full py-6 border-b-2 sm:px-8 px-2 h-[6rem] font-semibold text-black items-center z-50">
        <Link href="/">
          <span className="flex items-center gap-x-2">
            <Image
              src="/flc_logo_crop.png"
              alt="flc_Logo"
              className="md:h-16 h-12"
              width="60"
              height="50"
            />
            <h3 className="sm:text-2xl text-md font-bold">Team KFC</h3>
          </span>
        </Link>
        <ul className="flex space-x-5 text-xl font-bold">
          {NavItems.map((item, index) => {
            return (
              <Link
                href={item.href}
                key={index}
                className="hover:text-yellow-400 hover:underline hover:duration-300 cursor-pointer"
              >
                <li>{item.label}</li>
              </Link>
            );
          })}
        </ul>
        <AuthButton />
      </div>

      <div className="w-full sm:hidden flex   ">
        <div className="w-full h-[4rem]  flex items-center px-4 fixed top-0 z-40 ">
          <Link href="/">
            <span className="flex items-center gap-x-2">
              <Image
                src="/flc_logo_crop.png"
                alt="flc_Logo"
                className="md:h-16 h-12"
                width="50"
                height="50"
              />
              <h3 className="sm:text-2xl text-black text-md font-bold">
                Finite Loop Club
              </h3>
            </span>
          </Link>
        </div>
        <div className="w-full h-[4rem]  fixed bottom-0 flex items-center px-4 z-40 justify-between">
          <Link href="/">
            <Home size="40" color="black" />
          </Link>
          <AuthButton />
        </div>
      </div>
    </>
  );
}

const NavItems = [
  {
    label: "Map",
    href: "/",
  },
  {
    label: "Feed",
    href: "/feed",
  },
];
