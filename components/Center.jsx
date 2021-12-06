import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { shuffle } from "lodash"
import { useRecoilState, useRecoilValue } from "recoil"
import { playlistIdState, playlistState } from "../atoms/playlistAtom"
import useSpotify from "../hooks/useSpotify"
import Tracks from "./Songs"
import UserMenu from "./UserMenu"

const colors = [
   "from-[#79018C]",
   "from-[#6E3CBC]",
   "from-[#0F2C67]",
   "from-[#32C1CD]",
   "from-[#009DAE]",
   "from-[#AA14F0]",
]

export default function Center() {
   const { data: session } = useSession()
   const [color, setColor] = useState(null)
   const playlistId = useRecoilValue(playlistIdState)
   const [playlist, setPlaylist] = useRecoilState(playlistState)
   const spotifyApi = useSpotify()

   useEffect(() => {
      spotifyApi
         .getPlaylist(playlistId)
         .then((data) => {
            setPlaylist(data.body)

            setColor(shuffle(colors).pop())
         })
         .catch((err) => console.log(err))
   }, [spotifyApi, playlistId])

   return (
      <div className=" flex-grow h-screen overflow-y-scroll scrollbar-hide">
         <header className="relative">
            <div className="absolute top-3 right-5">
               <UserMenu session={session} />
            </div>

            <section
               className={`flex items-end space-x-7 bg-gradient-to-b ${color} to-black  text-white h-80 p-4 md:p-8 `}
            >
               <img src={playlist?.images[0]?.url} alt={playlist?.name} className="w-44 h-44 shadow-xl rounded-md" />
               <div className="">
                  <p className="capitalize">playlist</p>
                  <h1 className="font-bold text-1xl md:text-3xl lg:text-4xl">{playlist?.name}</h1>
               </div>
            </section>
         </header>

         {/* Tracks */}
         <Tracks />
      </div>
   )
}
