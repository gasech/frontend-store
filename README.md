# Frontend Store
Frontend store is an application that lets you authenticate with Google and GitHub, add products, list all of them, and checkout from cart. You can access the [application demo](https://frontend-store-xi.vercel.app/) deployed in Vercel. 

## Screenshots

<!-- vim-markdown-toc Marked -->

* [Project Architecture](#project-architecture)
  * [Stack](#stack)
  * [Routes](#routes)
  * [Structure](#structure)
* [Developing](#developing)
  * [Getting Started](#getting-started)
  * [Setting Up Next Auth](#setting-up-next-auth)
  * [Running the application](#running-the-application)
* [Testing](#testing)
* [Contribuing](#contribuing)

<!-- vim-markdown-toc -->

## Project Architecture

### Stack
- TypeScript
- Next.JS
- Next Auth
- TailwindCSS
- Shadcn
- ESLint for linting
- Prettier for formatting 
- Rustywind to organize and remove duplicated tailwind classes

### Routes
- `/` - List and filter products
- `/login` - Login with Google or Github 
- `/add-product` - Add Product (if you are not authenticated this should redirect you to `/login`)

> [!NOTE]
> If you try to checkout your items without being logged in, the app should redirect you to `/login` so you can proceed.

### Structure
This project is using the optional `src/` folder and the app router feature from Next.js.

```
📁 frontend-store
├── 📁 public
│  └── 📁 icons
└── 📁 src
   ├── 📁 app
   │  ├── 📁 (auth)
   │  │  └── 📁 login
   │  ├── 📁 (routes)
   │  │  └── 📁 add-product
   │  └── 📁 api
   │     └── 📁 auth
   │        └── 📁 [...nextauth]
   ├── 📁 components
   │  ├── 📁 add-product
   │  ├── 📁 login
   │  └── 📁 ui
   ├── 📁 lib
   └── 📁 providers
```

## Developing 
### Getting Started

```bash 
# First clone the repository
https://github.com/gasech/frontend-store.git
cd frontend-store

# Install the dependencies
npm install 
```

### Setting Up Next Auth 
If you run the project now, you should get an error while logging in because the environments variables are not setup, you can refer to both of these docs to get the OAuth apps going:
- Setting up [Google](https://console.developers.google.com/apis/credentials)
- Setting up [GitHub](https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps)

After you setup Google and GitHub, you should have access to the CLIENT_SECRET and CLIENT_ID of both, so create a file in the root of the project named `.env`:

```.env
NEXTAUTH_URL="http://localhost:3000" 
NEXTAUTH_SECRET="READ_BELOW"

GITHUB_CLIENT_ID="YOUR_GITHUB_CLIENT_ID"
GITHUB_CLIENT_SECRET="YOUR_GITHUB_CLIENT_SECRET"

GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID"
GOOGLE_CLIENT_SECRET="YOUR_GOOGLE_CLIENT_SECRET"
```

in `NEXTAUTH_SECRET` you should add a hash. This is used to encrypt the NextAuth.js JWT, and to hash email verification tokens. 

> [!NOTE]
> Remember to add these environment variables to the vercel application dashboard if you pretend to deploy this app.

### Running the application
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing
Soon.

## Contribuing
If you feel like contributing to the project please fork the repository, create a branch with the name of your feature, commit your changes and make a pull request.
