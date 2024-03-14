import { LinksFunction, LoaderFunctionArgs, json } from "@remix-run/node";
import {
  Link,
  Outlet,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import expensesStyles from "~/styles/expenses.css";
import ExpensesList from "~/components/expenses/ExpensesList";
import ExpensesHeader from "~/components/navigation/ExpensesHeader";
import { FaDownload, FaPlus } from "react-icons/fa";
import { getExpenses } from "~/data/expenses.server";
import { requireUserSession } from "~/data/auth.server";

export default function ExpensesLayout() {
  const expenses = useLoaderData();

  return (
    <>
      <ExpensesHeader />
      <Outlet />
      <main>
        <section id="expenses-actions">
          <Link to="add">
            <FaPlus />
            <span>Add Expense</span>
          </Link>
          <a href="/expenses/raw">
            <FaDownload />
            <span>Load Raw Data</span>
          </a>
        </section>
        <ExpensesList expenses={expenses} />
      </main>
    </>
  );
}

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: expensesStyles },
];

export async function loader({ request }: LoaderFunctionArgs) {
  //protecting the route if user is not logged in
  console.log("ecpenss loader");

  const userId = await requireUserSession(request);
  const expenses = await getExpenses(userId);
  // if (!expenses || expenses.length === 0) {
  //   throw new Response("No expenses found", { status: 500 });
  //   // throw json("No expenses found", { status: 500 });
  // }
  return expenses;
}
