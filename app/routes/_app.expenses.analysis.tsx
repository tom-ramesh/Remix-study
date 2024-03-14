import ExpenseStatistics from "~/components/expenses/ExpenseStatistics";
import Chart from "~/components/expenses/Chart";
import { getExpenses } from "~/data/expenses.server";
import { useLoaderData } from "@remix-run/react";
import { requireUserSession } from "~/data/auth.server";
import { LoaderFunctionArgs } from "@remix-run/node";

export default function ExpensesAnalysisPage() {
  const expenses = useLoaderData();

  return (
    <main>
      <Chart expenses={expenses} />
      <ExpenseStatistics expenses={expenses} />
    </main>
  );
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireUserSession(request);
  const expenses = await getExpenses(userId);

  return expenses;
  // throw new Response("Not found any expenses", { status: 500 });
};
