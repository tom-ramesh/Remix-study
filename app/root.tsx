import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  isRouteErrorResponse,
  useMatches,
} from "@remix-run/react";
import { ReactNode } from "react";
import Error from "~/components/util/Error";
import sharedStyles from "~/styles/shared.css";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: sharedStyles },
];

export const meta: MetaFunction = () => [
  { charSet: "utf-8", title: "New Remix App" },
  { name: "viewport", content: "width=device-width, initial-scale=1" },
];

function Document({ title, children }: { title: string; children: ReactNode }) {
  const matches: { handle: any }[] = useMatches();
  const disableJS = matches.some((match) => match?.handle?.disableJs);
console.log(matches);

  return (
    <html lang="en">
      <head>
        <Meta />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <Links />
        <title>{title}</title>
      </head>
      <body>
        {children}
        <ScrollRestoration />
        {!disableJS && <Scripts />}
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document title="">
      <Outlet />
    </Document>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  console.log(error);

  return (
    <Document title="">
      <main>
        <Error title="An error occured">
          {isRouteErrorResponse(error) ? (
            <p>{error.data}</p>
          ) : (
            <p>{"Somethinh went wrong"}</p>
          )}
          <p>
            Back to <Link to="/">safety</Link>
          </p>
        </Error>
      </main>
    </Document>
  );
}
