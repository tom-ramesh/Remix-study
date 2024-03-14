import { LinksFunction } from "@remix-run/node";
import { Outlet, isRouteErrorResponse, useRouteError } from "@remix-run/react";
import expensesStyles from "~/styles/expenses.css";
import ExpensesHeader from "~/components/navigation/ExpensesHeader";
import Error from "~/components/util/Error";

export default function ExpensesAnalysisLayout() {
  return (
    <>
      <ExpensesHeader />
      <Outlet />
    </>
  );
}

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: expensesStyles },
];

export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <>
      <ExpensesHeader />
      <Error title="Something went wrong">
        <p>
          {isRouteErrorResponse(error) ? error.data : "Something went wrong"}
        </p>
      </Error>
    </>
  );
}
