import { useRecoilValue } from "recoil"
import { playlistState } from "../atoms/playlistAtom"
import Song from "./Song"

export default function Songs() {
   const playlist = useRecoilValue(playlistState)

   return (
      <div className="px-2 md:px-8 flex flex-col  pb-28">
         {playlist?.tracks.items.map(({ track }, i) => (
            <Song key={track.id} track={track} order={i} />
         ))}
      </div>
   )
}
