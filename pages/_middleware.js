import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export async function middleware(req) {
   // The token will exist if the user is loged in
   const token = await getToken({ req, secret: process.env.JWT_SECRET })

   const { pathname } = req.nextUrl

   // Allow the request if the following is true
   // 1)  if its a request for next-auth session & provider fetching
   // 2)  if the token exists
   if (pathname.includes("/api/auth") || token) {
      return NextResponse.next()
   }

   // redirect to login if they dont have a token AND are requesting a protected route
   if (!token && pathname !== "/login") {
      return NextResponse.redirect("/login")
   }
}
