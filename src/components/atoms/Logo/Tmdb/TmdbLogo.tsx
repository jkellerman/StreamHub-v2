import Image from "next/future/image";

import attribution from "@/public/assets/attribution.svg";

const TmdbLogo = () => {
  return (
    <>
      {" "}
      <>
        <Image src={attribution} alt="MovieDB Logo" unoptimized={true} width={40} height={16} />
      </>
    </>
  );
};

export default TmdbLogo;
