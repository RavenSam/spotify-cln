import { Fragment, useCallback, useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import useSpotify from "../hooks/useSpotify"
import useSong from "../hooks/useSong"
import { useRecoilState, useRecoilValue } from "recoil"
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom"
import { playlistState } from "../atoms/playlistAtom"
import { playerBtns, volumeBtns } from "../utils/iconsBtns"
import { debounce } from "lodash"

export default function Player() {
   const { data: session } = useSession()
   const spotifyApi = useSpotify()
   const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState)
   const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
   const playlist = useRecoilValue(playlistState)
   const [volume, setVolume] = useState(50)
   const songInfo = useSong()

   const fetchCurrentSong = () => {
      if (!songInfo) {
         spotifyApi.getMyCurrentPlayingTrack().then((data) => {
            setCurrentTrackId(data.body?.item.id)

            spotifyApi.getMyCurrentPlaybackState().then((data) => {
               setIsPlaying(data.body?.is_playing)
            })
         })
      }
   }

   useEffect(() => {
      if (spotifyApi.getAccessToken() && !currentTrackId) {
         // Fetch the song Info
         fetchCurrentSong()
         setVolume(50)
      }
   }, [currentTrackId, spotifyApi, session])

   useEffect(() => {
      if (volume > 0 && volume < 100) {
         debounceAdjuster()
      }
   }, [volume])

   const debounceAdjuster = useCallback(
      debounce((volume) => {
         // set the volume with spotify API
         spotifyApi.setVolume(volume)
      }, 500),
      []
   )

   return (
      <div className="grid grid-cols-1 sm:grid-cols-3 h-24 bg-gradient-to-b  from-black to-gray-900 text-white text-xs md:text-base px-2 md:px-8">
         <div className="flex items-center space-x-4">
            {songInfo?.album?.images[2].url && (
               <img
                  src={songInfo?.album?.images[2].url}
                  alt={songInfo?.album?.name}
                  className="hidden md:inline h-10 w-10 rounded-md "
               />
            )}

            <div>
               <h3>{songInfo?.name}</h3>
               {songInfo?.artists && <p className="text-gray-500 font-semibold">{songInfo?.artists[0]?.name}</p>}
            </div>
         </div>

         <div className="flex items-center justify-evenly">
            {playerBtns.map((btn, i) => (
               <div title={btn.title} key={btn.title}>
                  <btn.icon
                     className={`${
                        i === 2 ? " w-7 h-7 sm:w-9 sm:h-9" : "w-5 h-5"
                     } cursor-pointer transition duration-200 transform hover:scale-150 m-2`}
                  />
               </div>
            ))}
         </div>

         <div className="hidden sm:flex items-center justify-end space-x-3 py-5 ">
            {volumeBtns.map((btn, i) => (
               <Fragment key={i}>
                  <btn.icon
                     className="cursor-pointer w-5 h-5"
                     onClick={() =>
                        i === 0 ? volume > 0 && setVolume(volume - 10) : volume < 100 && setVolume(volume + 10)
                     }
                  />
                  {i === 0 && (
                     <input
                        type="range"
                        min={0}
                        max={100}
                        className="cursor-pointer w-14 md:w-28"
                        value={volume}
                        onChange={(e) => setVolume(Number(e.target.value))}
                     />
                  )}
               </Fragment>
            ))}
         </div>
      </div>
   )
}
