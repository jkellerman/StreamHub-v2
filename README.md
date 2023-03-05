# Reelgood web app

This web app is a resource for discovering new movies and TV shows, and finding where to stream them online.

## Table of contents

- [Overview](#overview)
  - [Previews](#previews)
  - [Links](#links)
  - [Built with](#built-with)
- [My process](#my-process)
  - [Challenges](#challenges)
  - [Continued Development](#continued-development)
- [Acknowledgements](#acknowledgements)

## Overview

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- Navigate between Home, Movies, TV Series pages.
- Search for any movie or series on all pages
- Be able to view movies and TV series by genre
- Click to view information for all movies and shows
- Infinitely load in Movies, TV series and Search pages.

### 📸&nbsp;Previews

#### mobile

<img src="./public/previews/mobile.png" alt="mobile view" width="1000"/>

#### tablet

<img src="./public/previews/tablet.png" alt="tablet view" width="1000"/>

#### desktop

<img src="./public/previews/desktop.png" alt="info page" width="1000"/>

### 🔗&nbsp;Links

- Solution: [Solution](https://github.com/jkellerman/reelgood)
- Live Site: [Live](https://reelgood.vercel.app/)

### 🧰&nbsp;Built with

- [TypeScript](https://www.typescriptlang.org/)
- [Next.js](https://nextjs.org/)
- [CSS Modules](https://github.com/css-modules/css-modules)
- [TMDB API](https://www.themoviedb.org/?language=en-GB)

## 💭&nbsp;My process

This app is designed to help you quickly discover what films and TV series are trending and available to watch on popular streaming platforms. I chose to use the TMDB API due to its extensive collection of data points and unlike some other APIs, doesn't have any request limitations. Originally conceived as a personal project to be completed in a month, I have been continuously improving and deploying the app beyond my initial deadline, as I found it quite a useful project to focus on some performance optimisation, user experience and just a playground for adding any new skills I've picked up. I've learned a lot during the process and I plan to further enhance the app's functionality by adding a back-end soon.

There were a few decisions I made with performance in mind. The first was utilising Next.JS to take advantage of different rendering techniques. When creating the home page, I opted to use `Incremental Static Regeneration (ISR)` to dynamically generate and update the page. This decision was based on ISR's ability to serve dynamic content statically, resulting in faster load times and reduced server load. Since the content of the home page relies on data from a third-party API and the content doesn't change too frequently, I needed a solution that could ensure the content is up-to-date without any delay in rendering. ISR helped me to achieve this by generating pages with the latest data at request time and caching them as static files for future requests.

For the other pages in the app, I used different rendering methods, mainly just for experimentation. However, I ultimately decided to use server-side rendering for the individual movie/series pages. These provide crucial information about the film/series and where to find them online, and SSR would provide benefits in terms of SEO in a real-case scenario.

### Challenges

#### Slider

The homepage design is from [Frontend Mentor](https://www.frontendmentor.io/challenges/entertainment-web-app-J-UhgAW1X) and it featured a trending section that exceeded the viewport width. Initially, I tried to implement a solution using various slider libraries, but they presented some UI issues, so I decided to create my own.

To enhance the user experience, I wanted to allow users to click through the slider instead of relying on horizontal scrolling with a mouse, which can be inconvenient. However, I also wanted to cater to mobile device and Mac trackpad users who might prefer touch-based scrolling. Therefore, I created a hybrid solution that includes both buttons and scrolling capabilities.

Also, clicking the navigation buttons will cause the slider to scroll by the number of cards that are fully visible in the viewport, ensuring consistency and smooth navigation across all screen sizes.

#### Infinite Scroll

For the interior pages, I implemented an infinite scroll to enable users to easily search through all available movies and series. To accomplish this, I created a custom hook that I used in the movie/series, search, and genre pages. However, I encountered some challenges when implementing the logic. At first, I tried to fetch both the endpoint and the page number in a single useEffect. Unfortunately, this approach didn't work as expected. The endpoint kept being called before the page number, causing duplication issues when switching between genre pages using the dropdown. To fix this problem, I separated the logic for fetching the endpoint and page number into two separate useEffects.

Update:

The useInfiniteScroll custom hook has now been updated to use the `useInfiniteQuery` hook from the [React Query](https://tanstack.com/query/latest) library. The conversion reduces the amount code needed and improves performance by handling data caching and background re-fetching.

#### Image Optimisation

Although I'm a fan of Next.js, I encountered some challenges with the Next/image component during implementation. However, I made sure to use best practices wherever possible, such as `lazy loading` images below the fold and prioritising images with the `largest contentful paint (LCP)`.

One of the main benefits of using Next/Image is the out-of-box conversion of images to WebP formats. Next-gen formats such as WebP offer better compression and quality than traditional formats like JPEG and PNG, without sacrificing image quality. This can lead to smaller file sizes and faster page load times, which can improve overall performance. Unfortunately, due to the optimised image limit on Vercel Hobby accounts, I wasn't able to optimise the images across my app in next-gen formats.

There is also some room for improving the page load speed in mobile devices according to Chrome Lighthouse report. This is because the original aspect ratios of the images are rendering across all breakpoints, and ideally pages should serve images that are not larger than the version that's rendered on the user's screen. I may explore using a custom loader in the future to address this issue and further optimise the images.

### 👨‍💻&nbsp;Continued development

- Allow users with login credentials to bookmark movies and TV shows.
- Allow users to view streaming platforms based on their geolocation.

## Acknowledgements

- [Entertainment web app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/entertainment-web-app-J-UhgAW1X) for the homepage and nav design.
- A big shoutout to [Fran](https://github.com/franmsilva) for helping me optimise the API routes. Despite everything working seamlessly, Fran identified and removed some redundant duplication across the directories and introduced me to the Node query-string module, which enabled us to parse and stringify URL query strings in a more concise and efficient manner.
