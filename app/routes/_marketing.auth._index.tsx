/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionFunctionArgs, LinksFunction, redirect } from "@remix-run/node";
import authStyles from "~/styles/auth.css";
import AuthForm from "~/components/auth/AuthForm";
import { validateCredentials } from "~/data/validation.server";
import { signup, login } from "~/data/auth.server";

export default function AuthPage() {
  return <AuthForm />;
}

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: authStyles },
];

export async function action({ request }: ActionFunctionArgs) {
  const searchParams = new URL(request.url).searchParams;

  const authMode = searchParams.get("mode") || "login";

  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);

  try {
    validateCredentials(credentials);
  } catch (error) {
    return error;
  }

  try {
    if (authMode === "login") {
      return await login(credentials as any);
    } else {
      return await signup(credentials as { email: string; password: string });
    }
  } catch (error: any) {
    if (error.status === 422) {
      return { credentials: error.message };
    } else if (error.status === 401) {
      return { credentials: error.message };
    }
  }
}
