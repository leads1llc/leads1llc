import rootStylesHref from "./root.css";
import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { Nav } from "./layout/Nav";
import { Body } from "./layout/Body";

export const links: LinksFunction = () => [
  ...(rootStylesHref ? [{ rel: "stylesheet", href: rootStylesHref }] : []),
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
        <Nav />
        <Body>
          <Outlet />
        </Body>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
