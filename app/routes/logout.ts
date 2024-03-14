import { ActionFunctionArgs } from "@remix-run/node";
import { destroyUserSession } from "~/data/auth.server";

export function action({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    throw new Response("Invalid requestmethod", { status: 400 });
  }

  return destroyUserSession(request);
}
