import { Fragment, useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { sideBtns } from "../utils/iconsBtns"
import useSpotify from "../hooks/useSpotify"
import { useRecoilState } from "recoil"
import { playlistIdState } from "../atoms/playlistAtom"

export default function Sidebar() {
   const { data: session } = useSession()
   const [playlists, setPlaylists] = useState([])
   const spotifyApi = useSpotify()
   const [playlistId, setPlaylistId] = useRecoilState(playlistIdState)

   useEffect(() => {
      if (spotifyApi.getAccessToken()) {
         spotifyApi.getUserPlaylists().then((data) => {
            setPlaylists(data.body.items)
         })
      }
   }, [session, spotifyApi])

   return (
      <div className="text-gray-500 p-5 pb-28 text-xs lg:text-sm border-r border-gray-500 overflow-y-scroll h-screen scrollbar-hide sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex">
         <div className="space-y-4">
            {sideBtns.map((btn, index) => (
               <Fragment key={index}>
                  <button className="flex items-center space-x-2 hover:text-white">
                     <btn.icon className="h-5 w-5" />
                     <span>{btn.name}</span>
                  </button>

                  {(index === 2 || index === 5) && <hr className="border-t-[0.1px] border-gray-900" />}
               </Fragment>
            ))}

            {/* <button onClick={() => signOut()} className="flex items-center space-x-2 hover:text-white">
               <LogoutIcon className="h-5 w-5" />
               <span>Log Out</span>
            </button> */}

            {/* Playlist */}
            <h2 className="text-xl font-semibold text-gray-300">Playlists</h2>
            {playlists.map((playlist, index) => (
               <Fragment key={index}>
                  <button
                     title={playlist.name}
                     className="flex items-center space-x-2 hover:text-white"
                     onClick={() => setPlaylistId(playlist.id)}
                  >
                     {/* <img src={playlist.images[0].url} alt="" className="w-10 h-10 rounded-lg" /> */}
                     <div className="w-[12ch] md:w-[22ch] text-left">
                        <h3 className="truncate ">{playlist.name}</h3>
                     </div>
                  </button>
               </Fragment>
            ))}
         </div>
      </div>
   )
}
