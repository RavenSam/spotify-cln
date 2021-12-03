import { getProviders, signIn } from "next-auth/react"

export default function Login({ providers }) {
   // console.log(process.env.NEXT_PUBLIC_CLIENT_SECRET)

   return (
      <div className="flex flex-col items-center  justify-center bg-black min-h-screen w-full">
         <img
            src="https://raw.githubusercontent.com/RavenSam/spotify-cln/main/public/spotify.png"
            alt="Spotify Logo"
            className="w-52 mb-9"
         />

         {/* <h1 className="text-2xl font-bold mb-4">Login With</h1> */}
         {Object.values(providers).map((provider) => (
            <div key={provider.name}>
               <button
                  className="bg-[#1ed760] text-white px-7 py-2 rounded-full font-semibold "
                  onClick={() => signIn(provider.id, { callbackUrl: "/" })}
               >
                  Login With {provider.name}
               </button>
            </div>
         ))}
      </div>
   )
}

export async function getServerSideProps() {
   const providers = await getProviders()

   return {
      props: {
         providers,
      },
   }
}
