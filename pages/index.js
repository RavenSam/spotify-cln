import Head from "next/head"

// Componets
import Center from "../components/Center"
import Sidebar from "../components/Sidebar"

export default function Home() {
   return (
      <div className="bg-black h-screen">
         <Head>
            <title>Spotify Cln</title>
         </Head>

         <main className="flex">
            <Sidebar />

            <Center />
         </main>

         <div>{/* Player */}</div>
      </div>
   )
}
