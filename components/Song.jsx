import useSpotify from "../hooks/useSpotify"
import { millisToMinutesAndSeconds as duration } from "../lib/duration"

export default function Song({ track, order }) {
   const spotifyApi = useSpotify()

   return (
      <div className="grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer">
         <div className="flex items-center  space-x-4">
            <p className="">{order + 1}</p>
            <img src={track?.album.images[0].url} alt={track.name} className="h-10 w-10 rounded-md" />

            <div className="w-48 lg:w-64">
               <p title={track.name} className=" truncate text-white">
                  {track.name}
               </p>
               <p title={track.artists[0].name} className="flex-wrap w-40 text-sm font-semibold">
                  {track.artists[0].name}
               </p>
            </div>
         </div>

         <div className="flex items-center ">
            <p title={track?.album.name} className="hidden sm:inline-block w-56 lg:w-72 truncate">
               {track?.album.name}
            </p>
            <p className="ml-auto">{duration(track?.duration_ms)}</p>
         </div>
      </div>
   )
}
