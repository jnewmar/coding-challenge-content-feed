# coding-challenge-content-feed
Coding Challenge: Creating a Content Feed -- From private API to UI


For the challenge I will use the next.js farmework

````
npx create-next-app@latest coding-challenge-content-feed --ts
````

Steps

 - create a pages folder, set a defaut page for it
 - create a route to retrieve the data from the external source, and return the cleaned and processed data
    - extract only the properties that will be used in the fronte end
    - sort the results by priority
 - in the default page create the feed component
  - get the data from the endpoint /api/content
 - create an Post component
   - wait for the content be completed loaded
 - create Post and comment types 
    - wait for the content and the image be pre loaded
    - use tailwindCss classes to format the Card for the post
    - hanlde the responsivenes
        - align in the same line title and the author
        - manage the size of the title and author strings fopr small layouts, also trucantig it when necessary
        - handle the Read More/Show less for the post content
        - try to handle in the best way the images with heigth a lot bigger than the width
    

TODO
 - only display the next post if the previous one has been loaded
 - check the SSR
 - docs
 - tests


    








This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
