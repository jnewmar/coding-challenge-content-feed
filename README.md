# coding-challenge-content-feed
Coding Challenge: Creating a Content Feed -- From private API to UI


For the challenge I will use the next.js farmework

````
npx create-next-app@latest coding-challenge-content-feed --ts
````

For the automated tests I will use jest, and for the Endpoint docs a openApi yaml file

### Steps

 - create a next js app 
  ````
  npx create-next-app@latest coding-challenge-content-feed --ts
  ````
 - create a pages folder, set a defaut page for it
 - create a route to retrieve the data from the external source, and return the cleaned and processed data
    - extract only the properties that will be used in the fronte end
    - sort the results by priority
 - in the default page create the feed post component
  - get the data from the endpoint /api/content
 - create an Post component
   - wait for the content be completed loaded
 - create Post and comment interfaces
    - create the interface for Posts and Comments entities received by the external URL
    - create the interface for the normalized Posts and Comments 
  - wait for the content and the image be pre loaded
  - use tailwindCss classes to format the Card for the post
  - hanlde the responsivenes
      - align in the same line title and the author
      - manage the size of the title and author strings fopr small layouts, also trucantig it when necessary
      - handle the Read More/Show less for the post content
      - try to handle in the best way the images with heigth a lot bigger than the width
  - implment SSR
  - centralize the constants
  - add a .env file
  - centralize the utils
  - create a custom hook to load the Posts and handle
  - separete the data processing in a new file/method
  - Add tests
  - Eslint fixes
  - Add docs


### TODO
 - centralize the authors in distinct entity
 - load in slices the posts, with a pagination/cache
 - only display the next post if the previous one has been loaded


 ## How To Run

First, create a .env file, for the test purposes, rename the .env-sample file to .env
Install the dependencies

```bash
npm run install
```

Run the development server with this command:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### To run tests

```bash
npm run test
```


File                    | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
------------------------|---------|----------|---------|---------|-------------------
All files               |     100 |      100 |     100 |     100 |                   
 components             |     100 |      100 |     100 |     100 |                   
  FeedPost.tsx          |     100 |      100 |     100 |     100 |                   
 constants              |     100 |      100 |     100 |     100 |                   
  config.ts             |     100 |      100 |     100 |     100 |                   
 hooks                  |     100 |      100 |     100 |     100 |                   
  useContentFetcher.tsx |     100 |      100 |     100 |     100 |                   
 pages                  |     100 |      100 |     100 |     100 |                   
  index.tsx             |     100 |      100 |     100 |     100 |                   
 pages/api              |     100 |      100 |     100 |     100 |                   
  content.ts            |     100 |      100 |     100 |     100 |                   
 utils                  |     100 |      100 |     100 |     100 |                   
  dataProcessor.ts      |     100 |      100 |     100 |     100 |                   
  utils.ts              |     100 |      100 |     100 |     100 |                   


Test Suites: 6 passed, 6 total
Tests:       18 passed, 18 total
Snapshots:   0 total
Time:        2.207 s
Ran all test suites.

## Docs

  There is a swagger documentation for the /api/content Endpoint in : [openapi.yaml](./openapi.yaml)
