# coding-challenge-content-feed
Coding Challenge: Creating a Content Feed -- From private API to UI


For the challenge I will use the next.js farmework

````
npx create-next-app@latest coding-challenge-content-feed --ts
````

### Steps

 - create a pages folder, set a defaut page for it
 - create a route to retrieve the data from the external source, and return the cleaned and processed data
    - extract only the properties that will be used in the fronte end
    - sort the results by priority
 - in the default page create the feed component
  - get the data from the endpoint /api/content
 - create an Post component
   - wait for the content be completed loaded
 - create Post and comment types
    - create the interface for Posts and Comments entities received by the external URL
    - create the interface for the normalized Posts and Comments 
    - wait for the content and the image be pre loaded
    - use tailwindCss classes to format the Card for the post
    - hanlde the responsivenes
        - align in the same line title and the author
        - manage the size of the title and author strings fopr small layouts, also trucantig it when necessary
        - handle the Read More/Show less for the post content
        - try to handle in the best way the images with heigth a lot bigger than the width
    - implment  SSR
    - separete the data processing in a new file/method
    

### TODO
 - centralize the authors in distinct entity
 - load in slices the posts, with a pagination/cache
 - only display the next post if the previous one has been loaded

 - docs
 - tests



    
## Coding Challenge SPEC

Coding Challenge: Creating a Content Feed -- From private API to UI
Objective:
In this challenge, you will develop a full-stack application that retrieves data from a private API, processes the data on the backend, and then display as a 'content feed' as you'd expect to see on popular apps like Instagram or MoneyLion.

Your task is to demonstrate both backend and frontend development skills, along with your ability to integrate APIs.

Background:
Many modern web applications require interaction between private APIs, backend processing, and dynamic front-end displays. Mastering these interactions is key to building efficient, scalable, and user-friendly applications.

Requirements:
API Integration:
Create a full stack application with server side rendering using TypeScript and any libraries or frameworks that leverage React of your choosing.
Connect to our mock Content API. You can use the following cURL for easier testing.
curl --request GET \
--url https://stoplight.io/mocks/engine/fullstack-spec/52502230/content \
--header 'Accept: application/json' \
--header 'Prefer: code=200, dynamic=true'
Data Processing:
Implement data cleaning and transformation processes to return a normalized data structure.
Ensure that your API endpoint in the backend efficiently handles these transformations in a performant way.
Frontend Development:
Display the transformed content data in a user-friendly manner. We have no specific design in mind beyond appearing like a content feed, and rendering all expected response properties in some fashion.
Ensure the UI is responsive and provides an intuitive user experience.
Content should be sorted by priority, descending.
Documentation and Testing:
Document your API endpoints and their usage.
Write basic unit tests for both the data processing functions and the API endpoint.
Sample Design
img
Deliverables:
Source code for your full stack application.
A basic README file.
A brief report describing your thought process around any tools you reached for, data processing logic and any challenges you faced.
Evaluation Criteria:
Functionality: The application works as intended without errors.
Code Quality: Code is clean, well-organized, and easy to understand.
User Interface: The frontend is intuitive and free of bugs and errors.
Creativity and Problem-Solving: Innovative solutions and effective problem-solving in data processing and display.
Challenge Duration:
You have 1 week to complete this challenge.

Getting Started:
Create a GitHub repo for your project and either make it public or invite the following users:

https://github.com/tomauty

https://github.com/jeromedane

For the purpose of reusable scenarios, you can omit the dynamic=true entry of the Prefer header in the cURL above.

You can use the Get Content For Feed sandbox endpoint on the left to study the private API. Under Mock Settings on the right side, you can toggle static or dynamic responses to see what you might expect for either header value.








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


                < img className="w-full max-h-96 object-cover rounded-md" src={post.imageUri} alt={post.title} />