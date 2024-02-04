# StreamHub web app (v2)

View movies and tv series on all streaming platforms in one place and get recommendations based on your preferences.

This is the version 2 of this web app, if you like to see v1 click [here](https://streamhubtvv1.vercel.app/).

## Table of contents

- [Overview](#overview)
  - [Previews](#previews)
  - [Links](#links)
  - [Built with](#built-with)
- [My process](#my-process)
  - [What I learned](#what-i-learned)
  - [Accessibility Enhancements](#accessibility-enhancements)
- [Continued Development](#continued-development)

## Overview

V2 includes the following updates:

- New search functionality
- Filter by streaming services
- New recommendation feature that randomly selects movies/series based on user preferences
- Trailers
- Updates to the UI

### 📸&nbsp;Previews

#### mobile preview

![Mobile](/public/assets/screenshots/streamhub-mobile.webp "Mobile Preview")

#### desktop preview

![Desktop](/public/assets/screenshots/streamhub-list.webp "Desktop Preview")
![Desktop](/public/assets/screenshots/streamhub-movie.webp "Desktop Preview")

### 🔗&nbsp;Links

- Solution: [Solution](https://github.com/jkellerman/StreamHub)
- Live Site: [Live](https://streamhubtv.vercel.app/)

### 🧰&nbsp;Built with

- TypeScript
- Next.js
- SCSS modules
- TMDB API
- React Query
- Vercel
- Framer Motion

## 💭&nbsp;My process

This app originally started as a project completed on Frontend Mentor with my own twist, as seen in the [original version](https://streamhubtvv1.vercel.app/). I then wanted to add some additional features for my own personal use.

There are a lot of streaming platforms now and I thought it would be nice to create an app that makes it easier to browse all movies and series from all streaming services in one place. I also created a randomised generator that decides for you what to watch based on preferences you select.

### 💡What I learned

In version 2, I concentrated on specific areas to enhance my skills. Being around more seasoned developers in a professional enviroment gave me exposure to writing cleaner react apps. I therefore placed emphasis on refactoring the components in this app to enhance manageability and maintainability.

Additionally, my professional experience threw me into the realm of making design decisions on the fly without a design template, so I wanted to take this opportunity to trust my own judgement when it comes tweaking and adapting for better ui/ux.

Another aspect of my learning journey was to dive deeper into documentation. I took the opportunity to thoroughly explore the TMDB API documentation and discovered that the API offered features beyond my initial expectations. This deeper understanding allowed me to get mpre creative with the api resulting in a more customised and feature-rich experience.

### 🤓Accessibility Enhancements

I focused on accessibility throughout the app including incorporating several accessibility improvements to the tablist component. Here are the key enhancements, particularly highlighting the purpose of the ARIA attributes:

#### Tablist Container

```jsx
<Heading as="h2" size="xs" id="tablist-1">
        {/* ... */}
 </Heading>
      <div className={styles.tabsContainer} ref={tab}>
        <div className={styles.tabs} role="tablist" aria-labelledby="tablist-1">
       {/* ... */}
        </div>
      </div>
```

- `role="tablist"`: Indicates that this container represents a tablist, providing the structure of the tablist assistive technologies.
- `aria-labelledby="tablist-1"`: Associates the tablist with its corresponding heading for better context and understanding.

#### Tab Trigger Button

```jsx
<button
  className={activeTab === tab ? `${styles.trigger} ${styles.active}` : `${styles.trigger} `}
  onClick={() => {
    handleClick(tab);
  }}
  id={`tab-${(index + 1).toString()}`}
  type="button"
  role="tab"
  aria-selected={activeTab === tab ? true : false}
  aria-controls={`tabpanel-${index + 1}`}
  tabIndex={activeTab === tab ? undefined : 0}
>
  <span>{tab === "flatrate" ? "stream" : tab}</span>
</button>
```

- `role="tab"`: Specifies that this button represents a tab, aiding assistive technologies in understanding its purpose.
- `aria-selected`: Indicates whether the tab is currently selected or not.
- `aria-controls`: Points to the corresponding tab panel, establishing the relationship between the tab and its content.
- `tabIndex`: Ensures that the tab is included in the keyboard navigation sequence when it's not selected.

```jsx
<div
  id={`tabpanel-${index + 1}`}
  role="tabpanel"
  tabIndex={0}
  aria-labelledby={`tab-${index + 1}`}
  className={activeTab === option ? `${styles.panel}` : `${styles.panel} ${styles.isHidden}`}
>
  {/* ... */}
</div>
```

- `role="tabpanel"`: Identifies this container as a tab panel, providing crucial information to assistive technologies.
- `aria-labelledby`: Associates the tab panel with its corresponding tab for better context and navigation.
- `tabIndex`: Enables keyboard focus on the tab panel, allowing users to navigate through the content.

## 👨‍💻&nbsp;Continued development

There are some tweaks and additional features that can be added to the project, which I may get around to in future.

- Add some state management for geolocation so can users can view streaming platforms based on their country.
- Integrate a backend so users can bookmark movies/series.
- Add placeholder for background Image. The background Image for movie/series needs to be resized for different screen sizes, my implementation at the moment is using the picture & source html tags and fetching the different images sizes from tmdb. Next.js can optimise them for you but there is a limit on how many can be optimised on their free plan. As a result, I am not using NextImage component which handle placeholders for you. Will need to find a workaround for this.
