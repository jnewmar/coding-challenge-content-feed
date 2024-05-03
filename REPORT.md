# Report

## Thought Process:

- Framework Selection: Choose Next.js for its server-side rendering capabilities and ease of setup.
- Component Structure: Designed a component structure to display content feed posts and comments.
- Data Retrieval: Implemented a route to fetch data from an external API endpoint and process it.
- Data Processing: Extracted and normalized relevant data properties, sorted posts by priority, and handled image loading.
- UI Design: Used Tailwind CSS for styling, focusing on responsiveness and layout optimization.
- Code Organization: Centralized constants, utilities, and data processing logic for maintainability.
- Testing: Implemented automated tests using Jest and @testing-library/react to ensure component functionality and data processing accuracy.
- Documentation: Planned to include OpenAPI YAML documentation for the endpoint.
- Code styling: use eslint to apply code standard rules

## Tools Used:

- Next.js: Chosen for server-side rendering and routing.
- Jest: Used for automated testing of components and data processing logic.
- Tailwind CSS: Leveraged for responsive UI design and styling.
- @testing-library/react: Utilized for component testing.
- @testing-library/jest-dom: Ensured accurate DOM assertions in tests.
- eslint: To apply code standard rules

## Data Processing Logic:

- Data Extraction: Extracted relevant properties from the fetched data and normalized them.
- Sorting: Sorted posts by priority to ensure high-priority content is displayed first.
- Image Loading: Handled image loading asynchronously to optimize user experience.
- String Truncation: Implemented logic to truncate long post titles and author names for small layouts.


## Challenges Faced:


- Image Loading Optimization: Ensuring smooth loading of images, only displaying the post after the image is loaded.
- Handling images with aspect ratios that vary significantly.
- Identify the 3-line limit for using the 'Read More' in multiple screen sizes, for the sake of simplicity, I have assumed a limit of 150 chars length in the content to show the 'Read More'
- Handle responsiveness for multiple screen sizes
- Handling images with aspect ratios that vary significantly and also multiple resolutions:
    - to solve that we have implemented a function to choose a distinct set of CSS classes we try to avoid image distortions in low-resolution images, and also in images that are a lot higher than larger - ratio (width/height) more than 0.6 
        - images with width and height lower than 200px: the image container has the same height as the image, the image is vertically centralized in the image container that has a black background
        - images with width bigger than 200px and height lower than 200px: the image container has the same height as the image, the image is vertically centralized in the image container that has a black background
        - images with width lower than 200px and a height bigger than 200px: the image container limits the image height, the image is vertically centralized in the image container that has a black background
        - images with width and height bigger 200px and ratio (width/height) less or equal to 0.6: the image container limits the image height, the aspect ratio is kept, and the image is vertically centralized in the image container that has a black background
        - images with width and height bigger than 200px and ratio (width/height) more than 0.6: the image container limits the image height, and the image is vertically centralized in the image container that has a black background, and depending on the aspect ratio of the image it could cover all the width

## Possible improvements

Since this is a coding challenge with a limited time for the implementati on and not a real word application, in some cases some simplified solutions were applied, instead of a more robust solution.
Here are some points that could be improved thinking in a real word application:

- Centralize the authors in a distinct entity, to handle posts and comments with the same author
- Load the posts in slices, with a pagination/cache
- Only display the next post if the previous one has been loaded
- When the post is created, force the user to crop the image to fit well in the interface 
- Use a server-side cropper and/or resizer to handle the image posts for multiple screen sizes.


## Application Structure:

````
src
├── components
│   ├── FeedPost.test.tsx
│   └── FeedPost.tsx
├── constants
│   └── config.ts
├── hooks
│   ├── useContentFetcher.test.tsx
│   └── useContentFetcher.tsx
├── pages
│   ├── _app.tsx
│   ├── _document.tsx
│   ├── api
│   │   └── index.tsx
│   ├── index.test.tsx
│   └── index.tsx
├── styles
│   └── globals.css
├── types
│   └── types.ts
├── utils
│   ├── dataProcessor.test.ts
│   ├── dataProcessor.ts
│   ├── utils.test.ts
│   └── utils.ts
openapi.yaml
````
## Documentation

The Endpoint documentation is in the openapi.yaml file

## Tests

The tests are in the *.test.ts and *.test.tsx files

Test report:
````
------------------------|---------|----------|---------|---------|-------------------
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
------------------------|---------|----------|---------|---------|-------------------

Test Suites: 6 passed, 6 total
Tests:       24 passed, 24 total
Snapshots:   0 total
Time:        2.301 s
Ran all test suites.
````