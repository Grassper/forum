import { extendTheme } from "native-base";

export const NativeBaseTheme = extendTheme({
  fontConfig: {
    Montserrat: {
      300: {
        normal: "ml",
      },
      400: {
        normal: "mr",
      },
      500: {
        normal: "mm",
      },
      600: {
        normal: "ms",
      },
      700: {
        normal: "mb",
      },
    },
    RobotoSlab: {
      300: {
        normal: "rl",
      },
      400: {
        normal: "rr",
      },
      500: {
        normal: "rm",
      },
      600: {
        normal: "rs",
      },
      700: {
        normal: "rb",
      },
    },
  },

  // Make sure values below matches any of the keys in `fontConfig`
  fonts: {
    heading: "RobotoSlab",
    body: "Montserrat",
  },
});
