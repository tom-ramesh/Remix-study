import {
  HeadersFunction,
  LinksFunction,
  LoaderFunctionArgs,
} from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import marketingStyles from "~/styles/marketing.css";
import MainHeader from "~/components/navigation/MainHeader";
import { getUserFromSession, requireUserSession } from "~/data/auth.server";

export default function MarketingLayout() {
  return (
    <>
      <MainHeader />
      <Outlet />
    </>
  );
}

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: marketingStyles },
];

export async function loader({ request }: LoaderFunctionArgs) {
  return getUserFromSession(request);
}

export const headers: HeadersFunction = () => ({
  "Cache-Control": "max-age=3600",
});

