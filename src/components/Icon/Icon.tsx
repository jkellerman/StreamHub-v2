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
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.9999 19.5V7.914L6.49994 12.414L5.08594 11L11.9999 4.086L18.9139 11L17.4999 12.414L12.9999 7.914V19.5H10.9999Z"
        fill="var(--secondary)"
      />
    </svg>
  );
  const arrowLeft = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20.3279 11V13H7.49988L10.7429 16.243L9.32788 17.657L3.67188 12L9.32788 6.34302L10.7429 7.75702L7.49988 11H20.3279Z"
        fill="var(--tertiary-light)"
      />
    </svg>
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
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.6 21L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16C7.68333 16 6.146 15.3707 4.888 14.112C3.63 12.8533 3.00067 11.316 3 9.5C2.99933 7.684 3.62867 6.14667 4.888 4.888C6.14733 3.62933 7.68467 3 9.5 3C11.3153 3 12.853 3.62933 14.113 4.888C15.373 6.14667 16.002 7.684 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L21 19.6L19.6 21ZM9.5 14C10.75 14 11.8127 13.5627 12.688 12.688C13.5633 11.8133 14.0007 10.7507 14 9.5C13.9993 8.24933 13.562 7.187 12.688 6.313C11.814 5.439 10.7513 5.00133 9.5 5C8.24867 4.99867 7.18633 5.43633 6.313 6.313C5.43967 7.18967 5.002 8.252 5 9.5C4.998 10.748 5.43567 11.8107 6.313 12.688C7.19033 13.5653 8.25267 14.0027 9.5 14Z"
        fill="white"
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
