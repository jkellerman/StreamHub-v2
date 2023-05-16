import { FC, ReactNode } from "react";

import Footer from "@/components/molecules/Footer/Footer";
import Header from "@/components/organisms/Header/Header";

interface CoreLayoutProps {
  children: ReactNode;
}

const CoreLayout: FC<CoreLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default CoreLayout;
