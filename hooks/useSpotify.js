import { signIn, useSession } from "next-auth/react"
import { useEffect } from "react"
import spotifyApi from "../lib/spotify"

export default function useSpotify() {
   const { data: session } = useSession()

   useEffect(() => {
      if (session) {
         // if refresh access token fails redirect the user to the login page
         if (session.error === "refreshAccessTokenError") {
            signIn()
         }

         spotifyApi.setAccessToken(session.user.accessToken)
      }
   }, [session])

   return spotifyApi
}
