import { Fragment } from "react"
import { signOut, useSession } from "next-auth/react"
import {
   HomeIcon,
   SearchIcon,
   LibraryIcon,
   PlusCircleIcon,
   HeartIcon,
   RssIcon,
   LogoutIcon,
} from "@heroicons/react/outline"

const BarBtns = [
   { name: "Home", icon: HomeIcon },
   { name: "Search", icon: SearchIcon },
   { name: "Your Library", icon: LibraryIcon },
   { name: "Create Playlist", icon: PlusCircleIcon },
   { name: "Liked Songs", icon: HeartIcon },
   { name: "Your Episodes", icon: RssIcon },
]

export default function Sidebar() {
   const { data: session, status } = useSession()

   return (
      <div className="text-gray-500 p-5 text-sm md:text-base border-r border-gray-500 overflow-y-scroll h-screen scrollbar-hide max-w-[15rem]">
         <div className="space-y-4">
            {BarBtns.map((btn, index) => (
               <Fragment key={index}>
                  <button className="flex items-center space-x-2 hover:text-white">
                     <btn.icon className="h-5 w-5" />
                     <span>{btn.name}</span>
                  </button>

                  {(index === 2 || index === 5) && <hr className="border-t-[0.1px] border-gray-900" />}
               </Fragment>
            ))}

            <button onClick={() => signOut()} className="flex items-center space-x-2 hover:text-white">
               <LogoutIcon className="h-5 w-5" />
               <span>Log Out</span>
            </button>

            {/* Playlist */}
            {[...Array(15)].map((x, i) => (
               <div key={i}>
                  <p className="cursor-pointer hover:text-white">Playlist Name..</p>
               </div>
            ))}
         </div>
      </div>
   )
}
