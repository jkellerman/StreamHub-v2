// Next js shimmer effect for image placeholders.
// Go to : https://github.com/vercel/next.js/blob/canary/examples/image-component/pages/shimmer.js

export const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#090f15" offset="20%" />
      <stop stop-color="#112240" offset="50%" />
      <stop stop-color="#090f15" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#090f15" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>
`;

export const toBase64 = (str: string) =>
  typeof window === "undefined" ? Buffer.from(str).toString("base64") : window.btoa(str);
