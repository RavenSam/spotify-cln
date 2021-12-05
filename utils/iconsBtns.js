import { HomeIcon, SearchIcon, LibraryIcon, PlusCircleIcon, HeartIcon, RssIcon } from "@heroicons/react/outline"
import {
   SwitchHorizontalIcon,
   FastForwardIcon,
   RewindIcon,
   PlayIcon,
   ReplyIcon,
   VolumeUpIcon,
   VolumeOffIcon,
} from "@heroicons/react/solid"

export const sideBtns = [
   { name: "Home", icon: HomeIcon },
   { name: "Search", icon: SearchIcon },
   { name: "Your Library", icon: LibraryIcon },
   { name: "Create Playlist", icon: PlusCircleIcon },
   { name: "Liked Songs", icon: HeartIcon },
   { name: "Your Episodes", icon: RssIcon },
]

export const playerBtns = [
   { title: "Switch", icon: SwitchHorizontalIcon },
   { title: "Rewind", icon: RewindIcon },
   { title: "Play", icon: PlayIcon },
   { title: "Fast Forward", icon: FastForwardIcon },
   { title: "Reply", icon: ReplyIcon },
]

export const volumeBtns = [{ icon: VolumeOffIcon }, { icon: VolumeUpIcon }]
