import resetsStylesHref from "./styles/resets.css";
import tailwindStylesHref from "./styles/tailwind.css"
import fontsStylesHref from "./styles/fonts.css";
import type { LinksFunction } from "@remix-run/node";
import { GoogleReCaptchaProvider } from '@google-recaptcha/react';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { Leads1LLCLogoMark } from "./components/Leads1LLCLogoMark";
import { COLORS } from "./styles/variables";

export const links: LinksFunction = () => [
  ...(resetsStylesHref ? [
    { rel: "stylesheet", href: resetsStylesHref },
    { rel: "stylesheet", href: tailwindStylesHref },
    { rel: "stylesheet", href: fontsStylesHref }
  ] : []),
];

export function ErrorBoundary() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="flex w-screen h-screen justify-center items-center bg-dark-500">
          <Leads1LLCLogoMark foregroundColor={COLORS["light-500"]} backgroundColor={COLORS["dark-500"]} size={200} />
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <GoogleReCaptchaProvider
          type="v2-checkbox"
          siteKey="6Lczm8IpAAAAAHpfThwr4cL6ea85VXH2Cru38NeI">
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </GoogleReCaptchaProvider>
      </body>
    </html>
  );
}
