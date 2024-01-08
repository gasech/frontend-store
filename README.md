# Frontend Store
Frontend store is an application that lets you authenticate with GitHub, add products, list all of them, and checkout from cart. You can access the [application demo](https://frontend-store-xi.vercel.app/) deployed in Vercel. 

## Screenshots

<!-- vim-markdown-toc Marked -->

* [Stack](#stack)
* [Routes](#routes)
* [Project Structure](#project-structure)
* [Developing](#developing)
  * [Getting Started](#getting-started)
  * [Setting Up GitHub Auth](#setting-up-github-auth)
* [Testing](#testing)

<!-- vim-markdown-toc -->

## Stack
- TypeScript
- Next.JS 14.0.4
- Next Auth ^4.25.5
- Tailwind ^3.3.0
- Shadcn
- ESLint for linting
- Prettier for formatting 

## Routes
- `/login` - Login  
- `/` - List Products
- `/add-product` - Add Product (if you are not authenticated this should redirect you to `/login`)

If you try to checkout your items without being logged in, the app should redirect you to `/login`. This is not related to routes, but also important to know.

## Project Structure
This project is using the optional application `src/` folder and the app router feature from Next.js.

```
. 📁
├── 📁 public
└── 📁 src
   ├── 📁 app
   │  ├── 📁 auth
   │  │  ├── 📁 [...nextauth]
   │  │  └── 📁 login
   │  └── 📁 login
   ├── 📁 components
   │  └── 📁 ui
   └── 📁 lib
```

## Developing 

### Getting Started

```bash 
# First clone the repository
https://github.com/gasech/frontend-store.git
cd frontend-store

# Install the dependencies
npm install 

# Run the project
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Setting Up GitHub Auth
If you followed all the steps so far, you should get an error because the enviroments variables are not setup, to solve that please follow the next steps:

## Testing
