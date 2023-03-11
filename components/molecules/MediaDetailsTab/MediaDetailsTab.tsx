import React from "react";

interface MediaDetailsTabProps {
  children: React.ReactNode;
}

const MediaDetailsTab: React.FC<MediaDetailsTabProps> = ({ children }) => {
  return <>{children}</>;
};

export default MediaDetailsTab;
