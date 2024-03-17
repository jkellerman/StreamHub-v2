interface IconProps {
  icon:
    | "arrowUp"
    | "arrowLeft"
    | "chevronDown"
    | "chevronLeft"
    | "chevronRight"
    | "close"
    | "flagUK"
    | "flagUS"
    | "play"
    | "search"
    | "user";
  width?: string;
  height?: string;
  fill?: string;
}

const Icon: React.FC<IconProps> = ({ icon, width, height, fill = "#FFF" }) => {
  const arrowUp = (
    <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.14645 2.14645C7.34171 1.95118 7.65829 1.95118 7.85355 2.14645L11.8536 6.14645C12.0488 6.34171 12.0488 6.65829 11.8536 6.85355C11.6583 7.04882 11.3417 7.04882 11.1464 6.85355L8 3.70711L8 12.5C8 12.7761 7.77614 13 7.5 13C7.22386 13 7 12.7761 7 12.5L7 3.70711L3.85355 6.85355C3.65829 7.04882 3.34171 7.04882 3.14645 6.85355C2.95118 6.65829 2.95118 6.34171 3.14645 6.14645L7.14645 2.14645Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        stroke="currentColor"
        strokeWidth="1"
      ></path>
    </svg>
  );
  const arrowLeft = (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="15" height="15">
        <path
          d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
          fill={fill}
        />
      </svg>
    </>
  );
  const chevronDown = (
    <svg
      height={height ? height : "24"}
      viewBox="0 -93 512 512"
      width={width ? width : "24"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m441.667969 0-185.667969 185.667969-185.667969-185.667969-70.332031 70.332031 256 256 256-256zm0 0"
        fill={fill}
      />
    </svg>
  );

  const chevronLeft = (
    <svg
      version="1.1"
      id="svg8250"
      xmlSpace="preserve"
      width="24"
      height="24"
      viewBox="0 0 682.66669 682.66669"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs id="defs8254">
        <clipPath clipPathUnits="userSpaceOnUse" id="clipPath8268">
          <path d="M 0,512 H 512 V 0 H 0 Z" id="path8266" />
        </clipPath>
      </defs>
      <g id="g8256" transform="matrix(1.3333333,0,0,-1.3333333,0,682.66667)">
        <g id="g8258" transform="translate(113.54,256.0005)">
          <path
            d="M 0,0 235.584,-235.584 284.92,-186.247 98.673,0 284.92,186.246 235.584,235.583 Z"
            style={{
              fill: `${fill}`,
              stroke: `${fill}`,
              strokeWidth: 30,
              strokeLinecap: "butt",
              strokeLinejoin: "miter",
              strokeMiterlimit: 10,
              strokeDasharray: "none",
              strokeOpacity: 1,
            }}
            id="path8260"
          />
        </g>
        <g id="g8262">
          <g id="g8264" clipPath="url(#clipPath8268)">
            <g id="g8270" transform="translate(113.54,256.0005)">
              <path
                d="M 0,0 235.584,-235.584 284.92,-186.247 98.673,0 284.92,186.246 235.584,235.583 Z"
                style={{
                  fill: `${fill}`,
                  stroke: `${fill}`,
                  strokeWidth: 30,
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeMiterlimit: 10,
                  strokeDasharray: "none",
                  strokeOpacity: 1,
                }}
                id="path8272"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );

  const chevronRight = (
    <svg
      version="1.1"
      id="svg8286"
      xmlSpace="preserve"
      width={width ? width : "24"}
      height={width ? width : "24"}
      viewBox="0 0 682.66669 682.66669"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs id="defs8290">
        <clipPath clipPathUnits="userSpaceOnUse" id="clipPath8304">
          <path d="M 0,512 H 512 V 0 H 0 Z" id="path8302" />
        </clipPath>
      </defs>
      <g id="g8292" transform="matrix(1.3333333,0,0,-1.3333333,0,682.66667)">
        <g id="g8294" transform="translate(398.46,256.0005)">
          <path
            d="M 0,0 -235.584,-235.584 -284.92,-186.247 -98.673,0 -284.92,186.246 l 49.336,49.337 z"
            style={{
              fill: `${fill}`,
              fillOpacity: 1,
              fillRule: "nonzero",
              stroke: `${fill}`,
            }}
            id="path8296"
          />
        </g>
        <g id="g8298">
          <g id="g8300" clipPath="url(#clipPath8304)">
            <g id="g8306" transform="translate(398.46,256.0005)">
              <path
                d="M 0,0 -235.584,-235.584 -284.92,-186.247 -98.673,0 -284.92,186.246 l 49.336,49.337 z"
                style={{
                  fill: `${fill}`,
                  stroke: `${fill}`,
                  strokeWidth: 30,
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeMiterlimit: 10,
                  strokeDasharray: "none",
                  strokeOpacity: 1,
                }}
                id="path8308"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );

  const close = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={width} height={height}>
      <line x1="5" y1="19" x2="19" y2="5" stroke="#8892b0" strokeWidth="2" />
      <line x1="5" y1="5" x2="19" y2="19" stroke="#8892b0" strokeWidth="2" />
    </svg>
  );

  const flagUK = (
    <svg
      width="20"
      height="20"
      viewBox="0 0 36 36"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
      className="iconify iconify--twemoji"
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        fill="#00247D"
        d="M0 9.059V13h5.628zM4.664 31H13v-5.837zM23 25.164V31h8.335zM0 23v3.941L5.63 23zM31.337 5H23v5.837zM36 26.942V23h-5.631zM36 13V9.059L30.371 13zM13 5H4.664L13 10.837z"
      ></path>
      <path
        fill="#CF1B2B"
        d="M25.14 23l9.712 6.801a3.977 3.977 0 0 0 .99-1.749L28.627 23H25.14zM13 23h-2.141l-9.711 6.8c.521.53 1.189.909 1.938 1.085L13 23.943V23zm10-10h2.141l9.711-6.8a3.988 3.988 0 0 0-1.937-1.085L23 12.057V13zm-12.141 0L1.148 6.2a3.994 3.994 0 0 0-.991 1.749L7.372 13h3.487z"
      ></path>
      <path
        fill="#EEE"
        d="M36 21H21v10h2v-5.836L31.335 31H32a3.99 3.99 0 0 0 2.852-1.199L25.14 23h3.487l7.215 5.052c.093-.337.158-.686.158-1.052v-.058L30.369 23H36v-2zM0 21v2h5.63L0 26.941V27c0 1.091.439 2.078 1.148 2.8l9.711-6.8H13v.943l-9.914 6.941c.294.07.598.116.914.116h.664L13 25.163V31h2V21H0zM36 9a3.983 3.983 0 0 0-1.148-2.8L25.141 13H23v-.943l9.915-6.942A4.001 4.001 0 0 0 32 5h-.663L23 10.837V5h-2v10h15v-2h-5.629L36 9.059V9zM13 5v5.837L4.664 5H4a3.985 3.985 0 0 0-2.852 1.2l9.711 6.8H7.372L.157 7.949A3.968 3.968 0 0 0 0 9v.059L5.628 13H0v2h15V5h-2z"
      ></path>
      <path fill="#CF1B2B" d="M21 15V5h-6v10H0v6h15v10h6V21h15v-6z"></path>
    </svg>
  );

  const flagUS = (
    <svg
      width="20"
      height="20"
      viewBox="0 0 36 36"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
      className="iconify iconify--twemoji"
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        fill="#B22334"
        d="M35.445 7C34.752 5.809 33.477 5 32 5H18v2h17.445zM0 25h36v2H0zm18-8h18v2H18zm0-4h18v2H18zM0 21h36v2H0zm4 10h28c1.477 0 2.752-.809 3.445-2H.555c.693 1.191 1.968 2 3.445 2zM18 9h18v2H18z"
      ></path>
      <path
        fill="#EEE"
        d="M.068 27.679c.017.093.036.186.059.277c.026.101.058.198.092.296c.089.259.197.509.333.743L.555 29h34.89l.002-.004a4.22 4.22 0 0 0 .332-.741a3.75 3.75 0 0 0 .152-.576c.041-.22.069-.446.069-.679H0c0 .233.028.458.068.679zM0 23h36v2H0zm0-4v2h36v-2H18zm18-4h18v2H18zm0-4h18v2H18zM0 9zm.555-2l-.003.005L.555 7zM.128 8.044c.025-.102.06-.199.092-.297a3.78 3.78 0 0 0-.092.297zM18 9h18c0-.233-.028-.459-.069-.68a3.606 3.606 0 0 0-.153-.576A4.21 4.21 0 0 0 35.445 7H18v2z"
      ></path>
      <path fill="#3C3B6E" d="M18 5H4a4 4 0 0 0-4 4v10h18V5z"></path>
      <path
        fill="#FFF"
        d="M2.001 7.726l.618.449l-.236.725L3 8.452l.618.448l-.236-.725L4 7.726h-.764L3 7l-.235.726zm2 2l.618.449l-.236.725l.617-.448l.618.448l-.236-.725L6 9.726h-.764L5 9l-.235.726zm4 0l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L9 9l-.235.726zm4 0l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L13 9l-.235.726zm-8 4l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L5 13l-.235.726zm4 0l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L9 13l-.235.726zm4 0l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L13 13l-.235.726zm-6-6l.618.449l-.236.725L7 8.452l.618.448l-.236-.725L8 7.726h-.764L7 7l-.235.726zm4 0l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L11 7l-.235.726zm4 0l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L15 7l-.235.726zm-12 4l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L3 11l-.235.726zM6.383 12.9L7 12.452l.618.448l-.236-.725l.618-.449h-.764L7 11l-.235.726h-.764l.618.449zm3.618-1.174l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L11 11l-.235.726zm4 0l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L15 11l-.235.726zm-12 4l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L3 15l-.235.726zM6.383 16.9L7 16.452l.618.448l-.236-.725l.618-.449h-.764L7 15l-.235.726h-.764l.618.449zm3.618-1.174l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L11 15l-.235.726zm4 0l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L15 15l-.235.726z"
      ></path>
    </svg>
  );

  const play = (
    <svg
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      //   xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      width="17px"
      height="17px"
      viewBox="0 0 163.861 163.861"
      //   style="enable-background:new 0 0 163.861 163.861;"
      //   xml:space="preserve"
    >
      <g>
        <path
          d="M34.857,3.613C20.084-4.861,8.107,2.081,8.107,19.106v125.637c0,17.042,11.977,23.975,26.75,15.509L144.67,97.275
		c14.778-8.477,14.778-22.211,0-30.686L34.857,3.613z"
        />
      </g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
    </svg>
  );
  const search = (
    <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
      <path
        d="M27.613 25.72 23.08 21.2a10.56 10.56 0 0 0 2.253-6.533C25.333 8.776 20.558 4 14.667 4S4 8.776 4 14.667c0 5.89 4.776 10.666 10.667 10.666A10.56 10.56 0 0 0 21.2 23.08l4.52 4.533a1.333 1.333 0 0 0 1.893 0 1.333 1.333 0 0 0 0-1.893ZM6.667 14.667a8 8 0 1 1 16 0 8 8 0 0 1-16 0Z"
        fill="#FFF"
      />
    </svg>
  );

  const user = (
    <svg
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      x="0px"
      y="0px"
      viewBox="0 0 512 512"
    >
      <g>
        <g>
          <path
            d="M437.02,330.98c-27.883-27.882-61.071-48.523-97.281-61.018C378.521,243.251,404,198.548,404,148
			C404,66.393,337.607,0,256,0S108,66.393,108,148c0,50.548,25.479,95.251,64.262,121.962
			c-36.21,12.495-69.398,33.136-97.281,61.018C26.629,379.333,0,443.62,0,512h40c0-119.103,96.897-216,216-216s216,96.897,216,216
			h40C512,443.62,485.371,379.333,437.02,330.98z M256,256c-59.551,0-108-48.448-108-108S196.449,40,256,40
			c59.551,0,108,48.448,108,108S315.551,256,256,256z"
            fill="var(--primary-light)"
          />
        </g>
      </g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
    </svg>
  );

  let iconElement;

  switch (icon) {
    case "arrowLeft":
      iconElement = arrowLeft;
      break;
    case "arrowUp":
      iconElement = arrowUp;
      break;
    case "chevronDown":
      iconElement = chevronDown;
      break;
    case "chevronLeft":
      iconElement = chevronLeft;
      break;
    case "chevronRight":
      iconElement = chevronRight;
      break;
    case "close":
      iconElement = close;
      break;
    case "flagUK":
      iconElement = flagUK;
      break;
    case "flagUS":
      iconElement = flagUS;
      break;
    case "play":
      iconElement = play;
      break;
    case "search":
      iconElement = search;
      break;
    case "user":
      iconElement = user;
      break;
    default:
      return null;
  }

  return iconElement;
};

export default Icon;
