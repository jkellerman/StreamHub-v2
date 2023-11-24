export const opacity = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 160,
    },
  },
};

export const scale = {
  hidden: {
    scale: 0,
  },
  visible: {
    scale: 1,
  },
};

export const enterY = {
  hidden: {
    y: -150,
  },
  visible: {
    y: 0,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 20,
    },
  },
};
