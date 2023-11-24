import dynamic from "next/dynamic";
import { FC, ReactNode } from "react";

const Footer = dynamic(() => import("@/components/Footer/Footer"));

interface CoreLayoutProps {
  children: ReactNode;
}

const CoreLayout: FC<CoreLayoutProps> = ({ children }) => {
  return (
    <>
      {children}
      <Footer />
    </>
  );
};

export default CoreLayout;
