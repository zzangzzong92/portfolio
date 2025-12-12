import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ko", "en", "zh", "ja"],
  defaultLocale: "ko",

  // pathnames: {
  //   '/': '/',
  //   '/pathnames': {
  //     ko: '/pfadnamen'
  //   }
  // }
});
