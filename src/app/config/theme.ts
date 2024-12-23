import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

export const theme = extendTheme({
  fonts: {
    heading: "'Satoshi', sans-serif",
    body: "'Satoshi', sans-serif",
  },
  colors: {
    brand: {
      100: "#EDE9F7",
      500: "#8B5CF6",
      700: "#4A22B3",
    },
    primary: {
      50: "#f9f9f9",
      100: "#E6EAEE",
      200: "#B1B4B9",
      500: "#8B9097",
      600: "#555E67",
      700: "#01060C",
      800: "#020E1C",
      900: "#000000",
    },
  },
  breakpoints: {
    base: "0px",
    sm: "320px",
    md: "768px",
    lg: "960px",
    xl: "1200px",
    "2xl": "1536px",
  },
});
