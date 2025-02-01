import type { ConfigTheme } from '@nextui-org/react'

export const theme: ConfigTheme = {
  themes: {
    light: {
      colors: {
        background: "#FFFFFF",
        foreground: "#11181C",
        primary: {
          50: "#E6F9F0",
          100: "#CCF3E1",
          200: "#99E7C3",
          300: "#66DBA5",
          400: "#33CF87",
          500: "#00A651",
          600: "#008C44",
          700: "#007337",
          800: "#00592A",
          900: "#00401D",
          DEFAULT: "#00A651",
          foreground: "#FFFFFF",
        },
        focus: "#00A651",
      },
      layout: {
        disabledOpacity: "0.3",
        radius: {
          small: "4px",
          medium: "6px",
          large: "8px",
        },
        borderWidth: {
          small: "1px",
          medium: "2px",
          large: "3px",
        },
      },
    },
  },
}
