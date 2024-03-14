import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
  json,
  redirect,
} from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import ExpensesForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import {
  deleteExpense,
  getExpense,
  updateExpense,
} from "~/data/expenses.server";
import { validateExpenseInput } from "~/data/validation.server";

export default function UpdateExpensesPage() {
  const navigate = useNavigate();

  function closeHandler() {
    navigate("..");
  }

  return (
    <Modal onClose={closeHandler}>
      <ExpensesForm />
    </Modal>
  );
}

// export async function loader({ params }: LoaderFunctionArgs) {
//   const expenseId = params.id;
//   const expense = await getExpense(expenseId);
//   return expense;
// }

export async function action({ params, request }: ActionFunctionArgs) {
  const expenseId = params.id;
  if (request.method === "PATCH") {
    const formData = await request.formData();
    const expenseData = Object.fromEntries(formData);

    try {
      validateExpenseInput(expenseData);
    } catch (error) {
      console.log(error);
    }

    await updateExpense(expenseId, expenseData);
    return redirect("/expenses");
  } else if (request.method === "DELETE") {
    await deleteExpense(expenseId);
    // return redirect("/expenses");
    return json({ message: "deleted expense" });
  }
}

export const meta: MetaFunction = ({ params, location, data, matches }) => {
  const allExpenses: { [key: string]: string }[] =
    matches.find((expense) => expense.id === "routes/expenses")?.data ?? [];
  const expense = allExpenses.find((expense) => expense.id === params.id);

  return [{ title: expense?.title }];
};
