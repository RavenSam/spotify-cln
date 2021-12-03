import { useSession } from "next-auth/react"

export default function Center() {
   const { data: session } = useSession()

   console.log(session.user)

   return (
      <div className="flex flex-grow text-white">
         <h1 className="text-3xl ">Center</h1>

         <header>
            <div>
               <img src={session?.user?.image} alt="avatar" className="rounded-full w-10  h10" />
            </div>
         </header>
      </div>
   )
}
