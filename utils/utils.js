// Base for images url

export const BASE_URL_IMAGE = "https://image.tmdb.org/t/p/";
export const BACKGROUND_URL_IMAGE = `${BASE_URL_IMAGE}original`;
export const BACKDROP_URL_IMAGE = `${BASE_URL_IMAGE}w1280`;
export const LOGO_URL_IMAGE = `${BASE_URL_IMAGE}w92`;
export const POSTER_URL_IMAGE = `${BASE_URL_IMAGE}w500`;

// Slice array

export const sliceArray = (arr, limit) => {
  return arr.slice(0, limit);
};

// Convert runtime minutes to hour and minutes format

export const toHoursAndMinutes = (totalMinutes) => {
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);

  return `${hours} hr ${minutes} min`;
};

// Get film rating between 1-5 to 1 decimal

export const filmRating = (number) => {
  const rating = number / 2;
  const rounded = rating.toFixed(1);
  return rounded;
};

// Next js shimmer effect for image placeholders.
// Go to : https://github.com/vercel/next.js/blob/canary/examples/image-component/pages/shimmer.js

export const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>
`;

export const toBase64 = (str) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);
