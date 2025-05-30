import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ko", "en", "cn", "jp"],
  defaultLocale: "ko",
  // pathnames: {
  //   '/': '/',
  //   '/pathnames': {
  //     ko: '/pfadnamen'
  //   }
  // }
});
