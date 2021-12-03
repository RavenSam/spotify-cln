import Head from "next/head"

// Componets
import Sidebar from "../components/Sidebar"

export default function Home() {
   return (
      <div className="bg-black h-screen">
         <Head>
            <title>Spotify Cln</title>
         </Head>

         <main className="">
            <Sidebar />

            {/* Center Section */}
         </main>

         <div>{/* Player */}</div>
      </div>
   )
}
