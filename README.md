## GITHUB COPILOT SURF REPORT PROJECT

### Project Purpose:
Use github copilot agent to collect data from the https://open-meteo.com/ API to display for users to view wave height and sea temperature for their location. If no data is available, display and message indicating that no data is available. 

### Tech Used:
- ChatGPT
- Github Copilot Agent
- NextJs
- ShadCn UI

## Course Used
"GitHub Copilot Beginner to Pro - AI for Coding & Development" on Udemy

## User Interface

<img src="https://github.com/user-attachments/assets/0eca5213-335e-462e-95a9-1d9783937a15" width="700"/>

<img src="https://github.com/user-attachments/assets/510bb8cb-aa60-44cf-a003-be46f1c28b78" width="400"/>

<img src="https://github.com/user-attachments/assets/3dfa56c6-ae3a-4d48-a6cd-4b00955d61b3" width="300"/>

## Getting Started
First, run the development server:

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## ChatGPT prompts to prep (A few listed): 

* Give me a list of frameworks that I can user to build an application from scratchProvide.
* List of more full stack frameworkslist of popular UI libraries for next-js
* I have decided to use Next.js and Shadcn UI. My app will be a surf report app where the user can search for a location and receive the current surf conditions for that location, including wave height and sea temperature. Give me a list of free APIs where I can search for a particular location and receive the surf conditions with the specified data above.

##  Starter Github Copilot Prompts (A few listed):

* Create a new next-js project in the current directorynpx create-next-app@latest . --ts
    * (Reponse from Github Copilot)
       * Would you like to use ESLint? … No / Yes
       * Would you like to use Tailwind CSS? … No / Yes
       * Would you like your code inside a `src/` directory? … No / Yes
       * Would you like to use App Router? (recommended) … No / Yes
       * Would you like to use Turbopack for `next dev`? … No / Yes
       * Would you like to customize the import alias (`@/*` by default)? … No / Yes

* Install shadcn ui into the project


