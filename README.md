# Spotify Clone With NextJS + TailwindCSS

A front-end clone project of the Spotify web player. The project was created using the [NextJS](https://nextjs.org). The app is meant to work in conjunction with an authorization/authenication with your spotify account.

[Website Demo](http://spotify-cln.vercel.app)

### Desktop View

![desktop](https://raw.githubusercontent.com/RavenSam/spotify-cln/main/public/screenshots/spotify_cln_desktop.png)

### Mobile View

![mobile](https://raw.githubusercontent.com/RavenSam/spotify-cln/main/public/screenshots/spotify_cln_mobile.png)

## Installation

This project requires [node](http://nodejs.org) and [npm](https://npmjs.com) installed globally.

Clone the repository to a directory of your choosing.

### Set up environment variables

create a `.env.local` file on your root directory
Your `.env.local` file should look like this:

```bash

NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_CLIENT_ID=<Spotify client ID>
NEXT_PUBLIC_CLIENT_SECRET=<Spotify Clien Secret>
JWT_SECRET=<your secret>

```

Navigate into spotify-cln and install the necessary packages

```bash
npm install

# or

yarn install
```

To start the developement locally

```bash
npm run dev

# or

yarn dev

```
