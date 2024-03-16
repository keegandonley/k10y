import "./globals.css";
import "./theme.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { merge } from "@/util/classNames";
import { background } from "@/theme/colors";
import { getHasChosenTheme, userTheme } from "@/util/cookies";
import { Analytics } from "@vercel/analytics/react";
import { Suspense } from "react";
import { BASEURL, DESCRIPTION, NAME } from "@/metadata";
import MainNavigation from "@/components/MainNavigation";
import { ModalBoundary } from "@/components/ModalBoundary";
import ThemeProvider from "./themeProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import dynamic from "next/dynamic";
import LoadingProvider from "./loadingProvider";
import { GeistSans } from "geist/font/sans";
import { ClerkProvider } from "@clerk/nextjs";

const AuthDisplay = dynamic(() =>
  import("../components/AuthDisplay").then((m) => m.AuthDisplay)
);

const DynamicEventWaiter = dynamic(
  () => import("./event").then((m) => m.EventWaiter),
  {
    ssr: false,
  }
);

config.autoAddCss = false;

export default async function RootLayout({ children, postModal }: any) {
  const theme = userTheme();
  const hasChosenTheme = getHasChosenTheme();

  return (
    <ClerkProvider>
      <html lang="en" id="fullscreen-context">
        <body
          className={merge(
            GeistSans.className,
            "preload",
            theme === "dark" && "dark"
          )}
        >
          <AuthDisplay />
          <ThemeProvider>
            <LoadingProvider>
              {/* Display banner text from the edge config if an event is active */}
              <DynamicEventWaiter />
              <MainNavigation
                initialTheme={theme}
                hasChosenTheme={hasChosenTheme}
              />
              <main>{children}</main>
              <ModalBoundary>{postModal}</ModalBoundary>
            </LoadingProvider>
          </ThemeProvider>
          {/* Adding suspense to try https://github.com/vercel/next.js/issues/48442#issuecomment-1519139562 */}
          <Suspense fallback={null}>
            <Analytics />
            <SpeedInsights />
          </Suspense>
        </body>
      </html>
    </ClerkProvider>
  );
}

export async function generateViewport() {
  const theme = userTheme();

  return {
    themeColor: theme === "light" ? background.light : background.dark,
  };
}

export async function generateMetadata() {
  return {
    metadataBase: new URL("https://keegan.codes"),
    title: NAME,
    description: DESCRIPTION,
    openGraph: {
      title: NAME,
      description: DESCRIPTION,
      url: `${BASEURL}`,
      siteName: NAME,
      locale: "en_US",
      authors: ["Keegan Donley"],
      images: [
        {
          url: `/api/og/page?page=home&width=1200&height=630`,
          width: 1200,
          height: 630,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: NAME,
      description: DESCRIPTION,
      creator: "@keegandonley",
      images: [`/api/og/page?page=home&width=1200&height=630`],
    },
  };
}
