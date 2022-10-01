# Frontend Mentor - Entertainment web app solution

This is a solution to the [Entertainment web app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/entertainment-web-app-J-UhgAW1X). Frontend Mentor challenges help you improve your coding skills by building realistic project.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Previews](#previews)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)

## Overview

### The challenge

Users should be able to:

- ✅ View the optimal layout for the app depending on their device's screen size
- ✅ See hover states for all interactive elements on the page
- ✅ Navigate between Home, Movies, TV Series, and Bookmarked Shows pages
- 🚧 Add/Remove bookmarks from all movies and TV series
- ✅ Search for relevant shows on all pages

Added features:

- Get movies and TV series from the TMDB API
- Be able to see movies and TV series by Genre
- Click to view information for all movies and shows
- Infinite loading in Movies, TV series and Search pages

### 📸&nbsp;Previews

<img src="./public/previews/home.png" alt="homepage" width="1000"/>

<img src="./public/previews/info-page.png" alt="info page" width="1000"/>

<img src="./public/previews/search-results.png" alt="search results" width="1000"/>

<img src="./public/previews/genre.png" alt="genre" width="1000"/>

<img src="./public/previews/tablet-details.png" alt="tablet view" width="500"/>

<img src="./public/previews/mobile.png" alt="mobile view" height="1000"/>

### 🔗&nbsp;Links

- Solution URL: [Solution](https://github.com/jkellerman/entertainment)
- Live Site URL: [Live](https://entertainment-uk.vercel.app/)

### 🧰&nbsp;Built with

- [Next.js](https://nextjs.org/) - React framework
- [CSS Modules](https://github.com/css-modules/css-modules)
- [TMDB](https://www.themoviedb.org/?language=en-GB) - API

## 💭&nbsp;My process

Now that I'm comfortable with React, I decided to dive into Next.js to learn about some of the framework's out-of-the-box tools, such as their file-system based router and some of the different rendering methods.

This web app is a resource for discovering new movies and TV shows, as well as where to watch them. Because the site does not require login and the API data is frequently updated, server side rendering would most likely be the best option across all pages for SEO purposes, as all data can be pre-rendered at request time. However, because this is a personal project and my first time using Next.js, I decided to try out different rendering methods.

To provide a faster initial load time than a pure react application, the home page statically generates elements that are consistent across all pages, and the api data is then rendered on the client side. I also used client-side rendering for the movie, series, and search pages, but all individual movie/series pages are server-side rendered. I used the [NProgress](https://www.npmjs.com/package/nprogress) to add a progress bar to show the client that the request is loading as they won't see the loading spinner that they will see when api data is rendered client side.

One of the advantages of using NextJS is that CSS modules are included, which I found useful. I prefer scoping styles locally to writing long scss/css files because it is easier to refactor code. I had been using styled components to style my applications recently, but after researching and reading numerous articles such as [this](https://www.puruvj.dev/blog/move-to-css-modules-from-styled-components), because Javascript is more demanding on the main thread, I decided to use CSS in separate files for better performance.

Another advantage is the ability to create API routes with Next.js. Setting up api endpoints on the server allows you to mask the URL of an external service and use server environment variables to prevent unauthorised access to your API keys.

The design provided by frontend mentor included a small number of films and series in a json file, but I wanted to be able to search any film or series, so I chose to use the TMDB API, which has no request limit and a wide variety of data points. I also decided to let users browse films and shows by genre, as well as get information on any movie or show, including where to stream it, and make recommendations for similar movies and shows.

I got the idea for the user to search by genre from Disney+, whose UI has a dropdown menu that allows the client to easily navigate between genre pages. I got the design idea for the movie/series single pages from [Movies.how](https://movies.how/show/rick-and-morty).

### 💡&nbsp;What I learned

When developing this application, I discovered the `SWR` hook provided by Next.js, which is a simple way to render client-side data, similar to the React useEffect hook, but with the added benefit of handling caching, revalidation, and refetching on intervals. I used **_useSWR_** to fetch data on the homepage but ran into a problem where fetching did not update when switching between genre pages. I believe this is because the images are cached using SWR. The solution would be to implement some of the hook's other options, but in order to save time, I decided to stick to what I know and use the useEffect hook. However, this is something I will definitely look into in the future. I also continued to use useEffect for infinite loading at the bottom of movie, series, and search pages, but Next. Js also provides another hook called `useSWRInfinite`, which I will investigate further in the future.

The design included a trending section that overflowed the viewport width but no specific design for scrolling through what's trending. I'd previously created carousels in vanilla JS but was looking for something simple to set up. Regrettably, I had difficulty using multiple libraries for carousels. SwiperJS was causing a problem with no smooth transition on Safari browser, which I couldn't find a solution to. I then used keen-slider, but the problem was that the animation they used, which I believe was something similar to ease or ease-in, was causing the slides to flicker, and there was no option I could find to change the animation.

Despite learning about a variety of slider library options, I ultimately implemented my own. I wanted to allow the user to click through the trending section because horizontal scrolling with a mouse does not provide a good user experience. This isn't an issue for mobile devices or Mac trackpad users, so I wanted a combination of buttons and the ability to scroll with touch. I configured it so that the buttons would only appear on hover. In the past, I've discovered that hover states stick to mobile devices when clicked. I found a solution [here](https://css-tricks.com/solving-sticky-hover-states-with-media-hover-hover/). On mobile devices, no buttons will appear, and users can easily scroll with touch. I also configured the slider so that when buttons are clicked, it scrolls the width of an individual card and its margin-right, which I accomplished by gaining access to the slider DOM node via the **_useRef_** hook and accessing its properties via `.getComputedStyle().getPropertyValue()`

### 👨‍💻&nbsp;Continued development

- Allow users to bookmark movies and TV shows if they have login credentials.
- Explore and understand the options provided by the Next.js SWR hook.
- Create a loop and autoplay for slider
