import { getSession } from "next-auth/react"
import Head from "next/head"

// Componets
import Center from "../components/Center"
import Player from "../components/Player"
import Sidebar from "../components/Sidebar"

export default function Home() {
   return (
      <>
         <Head>
            <title>Spotify Cln</title>
         </Head>

         <div className="bg-black h-screen overflow-y-hidden">
            <main className="flex ">
               <Sidebar />

               <Center />
            </main>

            <div className="sticky bottom-0">
               <Player />
            </div>
         </div>
      </>
   )
}

export async function getServerSideProps(context) {
   const session = await getSession(context)

   return {
      props: {
         session,
      },
   }
}
