# Report

## Thought Process:

- Framework Selection: Chose Next.js for its server-side rendering capabilities and ease of setup.
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

- Image Loading Optimization: Ensuring smooth loading of images, especially when aspect ratios vary significantly.
- String Length Assumption: Making assumptions about the length of post comments and handling them appropriately.
- Handle responsiveness for multiple screen sizes

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
````