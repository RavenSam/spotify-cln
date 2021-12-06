import { useState } from "react"
import { signOut } from "next-auth/react"
import { ChevronDownIcon, ChevronUpIcon, UserCircleIcon } from "@heroicons/react/outline"

const menuItems = ["account", "profile", "private session", "settings"]

export default function UserMenu({ session }) {
   const [menuOpen, setMenuOpen] = useState(false)

   const toggleClass = menuOpen
      ? "transition ease-in duration-75 transform opacity-100 scale-100 z-10"
      : "transition ease-out duration-100 transform opacity-0 scale-95 pointer-events-none"

   const handleBlur = (e) => {
      if (menuOpen) {
         setTimeout(() => {
            setMenuOpen(false)
         }, 150)
      }
   }

   return (
      <div className="relative">
         <button
            className="flex items-center justify-center space-x-3 bg-black opacity-90 hover:opacity-100 cursor-pointer rounded-full  p-1 pr-2 text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            onBlur={handleBlur}
         >
            {session?.user?.image ? (
               <img src={session?.user?.image} alt="@" className="rounded-full w-10  h-10" />
            ) : (
               <UserCircleIcon className="rounded-full w-10  h-10 text-gray-600" />
            )}
            <span className="">{session?.user?.name}</span>

            {menuOpen ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
         </button>

         <div
            className={`origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-black  focus:outline-none ${toggleClass}`}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex="-1"
         >
            <div className=" p-2" role="none">
               {menuItems.map((item) => (
                  <button
                     key={item}
                     className="text-gray-400 block w-full text-left  py-2 px-2 capitalize text-sm rounded-sm hover:bg-gray-800"
                     role="menuitem"
                     tabIndex="-1"
                  >
                     {item}
                  </button>
               ))}

               <button
                  className="text-gray-400 block w-full text-left  py-2 px-2 capitalize text-sm rounded-sm hover:bg-gray-800 border-t border-gray-800"
                  role="menuitem"
                  tabIndex="-1"
                  onClick={() => signOut()}
               >
                  log out
               </button>
            </div>
         </div>
      </div>
   )
}
