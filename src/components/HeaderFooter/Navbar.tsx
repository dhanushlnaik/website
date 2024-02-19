import AuthButton from "../auth/authButton";
import Link from "next/link";
import { Home } from "lucide-react";
export function Navbar() {
  return (
    <>
      <div className="sm:flex hidden justify-between rounded-b-lg shadow-xl fixed w-full py-6 border-b-2 sm:px-8 px-2 h-[6rem] font-semibold text-black items-center">
        <a href="/">
          <span className="flex items-center gap-x-2">
            <img
              src="/flc_logo_crop.png"
              alt="flc_Logo"
              className="md:h-16 h-12"
            />
            <h3 className="sm:text-2xl text-md font-bold">Finite Loop Club</h3>
          </span>
        </a>
        <ul className="flex space-x-5 text-xl font-bold">
          {NavItems.map((item, index) => {
            return (
              <Link href={item.href} key={index}>
                <li>{item.label}</li>
              </Link>
            );
          })}
        </ul>
        <AuthButton />
      </div>

      <div className="w-full sm:hidden flex">
        <div className="w-full h-[4rem] bg-two-700 flex items-center px-4 fixed top-0">
          <Link href="/">
            <span className="flex items-center gap-x-2">
              <img
                src="/flc_logo_crop.png"
                alt="flc_Logo"
                className="md:h-16 h-12"
              />
              <h3 className="sm:text-2xl text-white text-md font-bold">
                Finite Loop Club
              </h3>
            </span>
          </Link>
        </div>
        <div className="w-full h-[4rem] bg-two-700 fixed bottom-0 flex items-center px-4 justify-between">
          <Link href="/">
            <Home size="40" color="white" />
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
  {
    label: "Contact",
    href: "/contact",
  },
];
