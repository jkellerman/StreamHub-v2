interface IconProps {
  icon: string | null;
  width?: string;
  height?: string;
}

const Icon: React.FC<IconProps> = ({ icon, width, height }) => {
  const arrowLeft = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
      <path
        d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 278.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
        fill="#FFF"
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
        fill="#FFF"
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
              fill: "#FFFFFF",
              stroke: "#FFFFFF",
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
                  fill: "#FFFFFF",
                  stroke: "#FFFFFF",
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
              fill: "#FFFFFF",
              fillOpacity: 1,
              fillRule: "nonzero",
              stroke: "#FFFFFF",
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
                  fill: "#FFFFFF",
                  stroke: "#FFFFFF",
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
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="17" height="17">
      <line x1="5" y1="19" x2="19" y2="5" stroke="#8892b0" strokeWidth="2" />
      <line x1="5" y1="5" x2="19" y2="19" stroke="#8892b0" strokeWidth="2" />
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
      width="32"
      height="32"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 45 45"
      preserveAspectRatio="xMidYMin slice"
    >
      <path
        d="M27.613 25.72 23.08 21.2a10.56 10.56 0 0 0 2.253-6.533C25.333 8.776 20.558 4 14.667 4S4 8.776 4 14.667c0 5.89 4.776 10.666 10.667 10.666A10.56 10.56 0 0 0 21.2 23.08l4.52 4.533a1.333 1.333 0 0 0 1.893 0 1.333 1.333 0 0 0 0-1.893ZM6.667 14.667a8 8 0 1 1 16 0 8 8 0 0 1-16 0Z"
        fill="#FFF"
      />
    </svg>
  );

  let iconElement;

  switch (icon) {
    case "arrowLeft":
      iconElement = arrowLeft;
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
    case "play":
      iconElement = play;
      break;
    case "search":
      iconElement = search;
      break;
    default:
      return null;
  }

  return iconElement;
};

export default Icon;