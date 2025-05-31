// const {
//   default: flattenColorPalette,
// } = require("tailwindcss/lib/util/flattenColorPalette");
// const svgToDataUri = require("mini-svg-data-uri");

// const config = {
//   darkMode: ["class", "class"],
//   content: [
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   prefix: "",
//   theme: {
//     container: {
//       center: true,
//       padding: "2rem",
//       screens: {
//         "2xl": "1400px",
//         xs: "360px",
//       },
//     },
//     extend: {
//       colors: {
//         blue: {
//           100: "#B4C6EE",
//           400: "#417BFF",
//           500: "#3371FF",
//         },
//         red: {
//           400: "#DD4F56",
//           500: "#DC4349",
//         },
//         dark: {
//           100: "#09111F",
//           200: "#0B1527",
//           300: "#0F1C34",
//           350: "#12213B",
//           400: "#27344D",
//           500: "#2E3D5B",
//         },
//         background: "hsl(var(--background))",
//         foreground: "hsl(var(--foreground))",
//         card: {
//           DEFAULT: "hsl(var(--card))",
//           foreground: "hsl(var(--card-foreground))",
//         },
//         popover: {
//           DEFAULT: "hsl(var(--popover))",
//           foreground: "hsl(var(--popover-foreground))",
//         },
//         primary: {
//           DEFAULT: "hsl(var(--primary))",
//           foreground: "hsl(var(--primary-foreground))",
//         },
//         secondary: {
//           DEFAULT: "hsl(var(--secondary))",
//           foreground: "hsl(var(--secondary-foreground))",
//         },
//         muted: {
//           DEFAULT: "hsl(var(--muted))",
//           foreground: "hsl(var(--muted-foreground))",
//         },
//         accent: {
//           DEFAULT: "hsl(var(--accent))",
//           foreground: "hsl(var(--accent-foreground))",
//         },
//         destructive: {
//           DEFAULT: "hsl(var(--destructive))",
//           foreground: "hsl(var(--destructive-foreground))",
//         },
//         border: "hsl(var(--border))",
//         input: "hsl(var(--input))",
//         ring: "hsl(var(--ring))",
//         chart: {
//           1: "hsl(var(--chart-1))",
//           2: "hsl(var(--chart-2))",
//           3: "hsl(var(--chart-3))",
//           4: "hsl(var(--chart-4))",
//           5: "hsl(var(--chart-5))",
//         },
//       },
//       fontFamily: {
//         sans: ["var(--font-inter)"],
//         mono: ["var(--font-roboto-mono)"],
//       },
//       keyframes: {
//         "accordion-down": {
//           from: {
//             height: "0",
//           },
//           to: {
//             height: "var(--radix-accordion-content-height)",
//           },
//         },
//         "accordion-up": {
//           from: {
//             height: "var(--radix-accordion-content-height)",
//           },
//           to: {
//             height: "0",
//           },
//         },
//       },
//       backgroundImage: {
//         doc: "url(/assets/images/doc.png)",
//         modal: "url(/assets/images/modal.png)",
//       },
//       animation: {
//         "accordion-down": "accordion-down 0.2s ease-out",
//         "accordion-up": "accordion-up 0.2s ease-out",
//       },
//       borderRadius: {
//         lg: "var(--radius)",
//         md: "calc(var(--radius) - 2px)",
//         sm: "calc(var(--radius) - 4px)",
//       },
//     },
//   },
//   plugins: [
//     function ({ matchUtilities, theme, addUtilities }) {
//       matchUtilities(
//         {
//           "bg-grid": (value) => ({
//             backgroundImage: `url("${svgToDataUri(
//               `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke-width="2" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
//             )}")`,
//           }),
//         },
//         { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
//       );

//       // 추가한 커스텀 유틸리티 클래스
//       const newUtilities = {
//         ".mask-with-browser-support": {
//           mask: "linear-gradient(black, black), linear-gradient(black, black)",
//           maskClip: "content-box, border-box",
//           maskComposite: "exclude",
//           "-webkit-mask":
//             "linear-gradient(black, black) content-box, linear-gradient(black, black)",
//           "-webkit-mask-clip": "content-box, border-box",
//           "-webkit-mask-composite": "xor",
//         },
//       };

//       addUtilities(newUtilities);
//     },
//     require("tailwindcss-animate"),
//   ],
// };

// module.exports = config;

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class"],
  plugins: [
    require("tailwind-animate"),
  ],
};