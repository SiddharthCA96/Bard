"use client";
import Link from "next/link";
import ThemeChanger from "./DarkSwitch";
import Image from "next/image";
import { Button } from "./button";
interface NavbarProps {
  user?: {
    name?: string | null;
  };
  // TODO: can u figure out what the type should be here?
  onSignin: any;
  onSignout: any;
}

export const Navbar = ({ user, onSignin, onSignout }: NavbarProps) => {
  const navigation = ["Features", "Pricing", "Company", "Blog"];

  return (
    <div className="w-full ui-border-b border-slate-400">
      <nav className="container relative  flex flex-wrap items-center justify-between p-8 mx-auto lg:justify-between xl:px-1">
        {/* Logo  */}
        <Link href="/">
          <span className="flex items-center space-x-2 text-2xl font-medium text-indigo-500 dark:text-gray-100">
            {/* <span>
                <Image
                  src="/assets/letter-b.jpg"
                  width="32"
                  alt="N"
                  height="32"
                  className="w-8"
                />
              </span> */}
            <span>Bard</span>
          </span>
        </Link>

        {/* Login */}
        <div className="gap-3 nav__item  lg:flex ml-auto lg:ml-0 lg:order-2">
          <div className="hidden mr-3 lg:flex nav__item">
          <Button onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
          </div>
          <ThemeChanger />
        </div>

        {/* menu  */}
        <div className="hidden text-center lg:flex lg:items-center">
          <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
            {navigation.map((menu, index) => (
              <li className="mr-3 nav__item" key={index}>
                <Link
                  href="/"
                  className="inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md dark:text-gray-200 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:focus:bg-gray-800">
                  {menu}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};
