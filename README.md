# StreamHub web app (version 2)

View movies and tv series on all streaming platforms in one place and get recommendations based on your preferences.

This is the version 2 of this web app, if you like to see v1 click [here](https://streamhubtvv1.vercel.app/).

## Table of contents

- [Overview](#overview)
  - [Previews](#previews)
  - [Links](#links)
  - [Built with](#built-with)
- [My process](#my-process)
  - [Choosing Next.js](#choosing-nextjs)
  - [Data Fetching with React Query](#data-fetching-with-react-query)
  - [Carousel](#carousel)
  - [Accessibility](#accessibility)
- [Continued Development](#continued-development)

## Overview

Version 2 includes the following updates:

- New search functionality
- Filter by streaming services
- New recommendation feature that randomly selects movies/series based on user preferences
- Trailers
- Updates to the UI
- State Management for viewing providers for US and as well as UK

### 📸&nbsp;Previews

#### mobile preview

![Mobile](/public/assets/screenshots/mobile.webp "Mobile Preview")

#### tablet preview

![Desktop](/public/assets/screenshots/tablet.webp "Tablet Preview")

#### desktop preview 1

![Desktop](/public/assets/screenshots/desktop1.webp "Desktop Preview")

#### desktop preview 2

![Desktop](/public/assets/screenshots/desktop2.webp "Desktop Preview")

### 🔗&nbsp;Links

- Solution: [Solution](https://github.com/jkellerman/StreamHub)
- Live Site: [Live](https://streamhubtv.vercel.app/)

### 🧰&nbsp;Built with

- TypeScript
- Next.js
- SCSS modules
- Radix UI
- React Query
- Vercel
- Framer Motion
- Context API for state management
- TMDB API

## 💭&nbsp;My process

This app originally started as a project completed on Frontend Mentor with my own twist, as seen in the [original version](https://streamhubtvv1.vercel.app/). I then wanted to add some additional features for my own personal use.

There are a lot of streaming platforms now and I thought it would be nice to create an app that makes it easier to browse all movies and series from all streaming services in one place. I also created a randomised generator that decides for you what to watch based on preferences you select.

### Choosing Next.js

I went with Next.js for its rendering flexibility, utilising Static Site Generation (SSG) for swift initial page loads and effective pre-rendering for SEO. For individual movie/series information pages, I adopted Server-Side Rendering (SSR) to enhance performance and SEO.

One challenge with SSR pages is that on initial render the page can take a few seconds to load. Because the app has no users and if the page hasn't been visited for 5 minutes, when you hit the serverless endpoint it starts from cold. However, subsequent page loads are consistently fast with frequent visits. I'm exploring methods to keep the server warm to address this.

Additionally, Next.js appealed to me for its straightforward setup of both page and API routes. The use of API routes ensures sensitive information, such as API keys, remains off the client side. Also, I began this project with Next 12 before Next 13 was released and decided it would be a pain to refactor the app to the last version. Still, I plan to explore and incorporate version 13 in future projects.

### Data Fetching with React Query

Certain parts of the app rely on CSR, primarily for fetching posters used in the cardlist and carousel components. The cardlists, in particular, involve fetching a large number of images, and considering the multitude of options when navigating genres and networks pages, along with pagination, it became crucial to minimise the number of network requests.

React Query handled this nicely with it's automatic caching, background refetching, and deduplication of identical requests. The seamless integration of these features helped enhance the efficiency of data retrieval as well as significantly reducing unnecessary network requests, contributing to a smoother and more responsive user experience.

### Carousel

I searched for a library to implement the carousel but none provided the exact features I needed, so I decided to create my own which ended up presenting its own set of challenges. In the end, I succeeded in crafting a carousel that met my expectations and gained some valuable insights along the way.

One hurdle involved obtaining a reference to the DOM element for the carousel. This reference was crucial for setting up functionality that allowed users to slide the carousel when interacting with navigation buttons. Initially, I attempted to use `ref.current` as a dependency in the useEffect hook. However, I quickly discovered that this approach is bad practice. Mutating a ref doesn't trigger a render, which led to a breakdown in functionality during the app's initial load.

To overcome this issue, I found a solution on [stack overflow](https://stackoverflow.com/questions/60476155/is-it-safe-to-use-ref-current-as-useeffects-dependency-when-ref-points-to-a-dom), which provided me with a greater understanding of the `useCallback` hook in this scenario. The solution involved directly handling the DOM node while memoizing the function with the useCallback hook. This approach allowed me to manage the properties I needed from the reference in state, ensuring the carousel's functionality worked seamlessly.

My code:

```js
  const getCarouselRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (node) {
        ...
        setTotalNumOfCards(totalNumOfCards);
        setCarouselWidth(node.offsetWidth);
      }
    },
    ....
  );
```

```html
<div ref="{getCarouselRef}"></div>
```

The other issue I had was dealing with responsiveness of the carousel for all screen sizes. I had to think about how the carousel responds if the window is resized. This entailed updating state variables when the user resized the window, inadvertently causing a significant number of re-renders.

To address this issue, I implemented `debouncing` using the [use-debounce library](https://www.npmjs.com/package/use-debounce). By setting a rate limit on the number of times the app renders during window resizing, it prevents overwhelming the app with excessive re-renders.

### 🤓Accessibility

I also dedicated some time to making the site as accessible as possible including an attempt to create an accessible tablist from scratch. Unfortunately, I couldn't get it to fully adhere to the [Tabs WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/), the main issue not being able to focus in on tab elements in the horizontal list using the left and right arrow keys. In light of this, instead of persisting with an imperfect solution, I opted for [Radix UI](https://www.radix-ui.com/primitives/docs/components/tabs) who do a good job of handling accessibility for you.

In the early stages of the app development my emphasis was on building all components from scratch to improve my skills, however as the app got larger I began to see the value of using Radix UI to build out some primitives, including the dropdown menu for the country selection and dialog for autocomplete and trailers, which not only ensured accessibility but also helped speed up developoment.

## 👨‍💻&nbsp;Continued development

There are some additional features that can be added to the project, which I may get around to in future.

- Integrate a backend so users can bookmark movies/series.
- Be able to sort films/series in cardlists alphabetically, or by release date.
