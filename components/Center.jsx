import { useSession } from "next-auth/react"
import { ChevronDownIcon } from "@heroicons/react/outline"
import { useEffect, useState } from "react"
import { shuffle } from "lodash"
import colors from "../utils/colors"
import { useRecoilState, useRecoilValue } from "recoil"
import { playlistIdState, playlistState } from "../atoms/playlistAtom"
import useSpotify from "../hooks/useSpotify"
import Tracks from "./Songs"

export default function Center() {
   const { data: session } = useSession()
   const [color, setColor] = useState("from-indigo-600")
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
               <div className="flex items-center justify-center space-x-3 bg-black opacity-90 hover:opacity-100 cursor-pointer rounded-full  p-1 pr-2 text-white">
                  <img src={session?.user?.image} alt="@" className="rounded-full w-10  h-10" />
                  <span className="">{session?.user?.name}</span>
                  <ChevronDownIcon className="h-5 w-5" />
               </div>
            </div>

            <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} text-white h-80 p-8 `}>
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
