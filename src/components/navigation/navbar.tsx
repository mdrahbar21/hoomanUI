import { NavigationMenuDemo } from "./navMenu";
import { logout } from "@/lib/firebase";
import Link from "next/link";
export default function Navbar() {
  return (
    <nav className="flex items-center justify-between w-full px-4 py-2 bg-black border-b border-gray-200">
      <Link href="/" className="text-lg font-semibold text-white text-white-900">HoomanLabs
        {/* <a className="text-lg font-semibold text-gray-900">Hooman Labs</a> */}
      </Link>
      <NavigationMenuDemo />

    </nav>
  )
}