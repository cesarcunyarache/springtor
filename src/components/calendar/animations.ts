import { Variants, Transition } from "framer-motion";


export const transition: Transition = {
  type: "spring", 
  stiffness: 200,
  damping: 20,
};

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition,
  },
  exit: {
    opacity: 0,
    transition,
  },
};

export const slideFromLeft: Variants = {
  initial: { x: -20, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition,
  },
  exit: {
    x: 20,
    opacity: 0,
    transition,
  },
};

export const slideFromRight: Variants = {
  initial: { x: 20, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition,
  },
  exit: {
    x: -20,
    opacity: 0,
    transition,
  },
};

export const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Hover y tap para botones
export const buttonHover: Variants = {
  hover: {
    scale: 1.05,
    transition: { type: "spring", stiffness: 300 },
  },
  tap: {
    scale: 0.95,
    transition: { type: "spring", stiffness: 300 },
  },
};
