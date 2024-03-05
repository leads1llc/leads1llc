import resetsStylesHref from "./styles/resets.css";
import tailwindStylesHref from "./styles/tailwind.css"
import fontsStylesHref from "./styles/fonts.css";
import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

export const links: LinksFunction = () => [
  ...(resetsStylesHref ? [
    { rel: "stylesheet", href: resetsStylesHref },
    { rel: "stylesheet", href: tailwindStylesHref },
    { rel: "stylesheet", href: fontsStylesHref }
  ] : []),
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
