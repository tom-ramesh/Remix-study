import {
  Form,
  Link,
  useActionData,
  useSubmit,
  useNavigation,
  useLoaderData,
  useMatches,
  useParams,
} from "@remix-run/react";

function ExpenseForm() {
  const today = new Date().toISOString().slice(0, 10); // yields something like 2023-09-10
  const validationErrors = useActionData();
  const navigation = useNavigation();
  // const expenseData = useLoaderData();
  const matches = useMatches();
  const params = useParams();
  const allExpenses = matches.find(
    (match) => match.id === "routes/expenses"
  )?.data;
  const expenseData = allExpenses.find((expense) => expense.id === params.id);
  const isSubmitting = navigation.state !== "idle";

  const defautValues = expenseData
    ? {
        title: expenseData.title,
        amount: expenseData.amount,
        date: expenseData.date,
      }
    : { title: "", amount: "", date: "" };
  // const submit = useSubmit();

  // function handleSubmit(event) {
  //   event.preventDefault();

  //   submit(event.target, { action: "/expenes/add", method: "post" });
  // }

  return (
    <Form
      method={expenseData ? "patch" : "post"}
      className="form"
      id="expense-form"
      // onSubmit={handleSubmit}
    >
      <p>
        <label htmlFor="title">Expense Title</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          maxLength={30}
          defaultValue={defautValues.title}
        />
      </p>

      <div className="form-row">
        <p>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            // min="0"
            step="0.01"
            required
            defaultValue={defautValues.amount}
          />
        </p>
        <p>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            max={today}
            required
            defaultValue={
              defautValues.date ? defautValues.date.slice(0, 10) : ""
            }
          />
        </p>
      </div>
      {validationErrors && (
        <ul>
          {Object.values(validationErrors).map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      <div className="form-actions">
        <button disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Expense"}
        </button>
        <Link to="..">Cancel</Link>
      </div>
    </Form>
  );
}

export default ExpenseForm;
