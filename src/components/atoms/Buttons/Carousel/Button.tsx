import styles from "./Button.module.scss";

interface ButtonProps {
  left?: boolean;
  right?: boolean;
  handleClickPrev?: () => void;
  handleClickNext?: () => void;
}

const Button: React.FC<ButtonProps> = ({ left, right, handleClickNext, handleClickPrev }) => {
  return (
    <>
      {left && (
        <button className={styles.button} onClick={handleClickPrev}>
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
        </button>
      )}
      {right && (
        <button className={styles.button} onClick={handleClickNext}>
          <svg
            version="1.1"
            id="svg8286"
            xmlSpace="preserve"
            width="24"
            height="24"
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
        </button>
      )}
    </>
  );
};

export default Button;
