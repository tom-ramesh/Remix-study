import { prisma } from "./database.server";

export async function addExpense(expenseData, userId) {
  try {
    return await prisma.expense.create({
      data: {
        title: expenseData.title,
        amount: +expenseData.amount,
        date: new Date(expenseData.date),
        User: { connect: { id: userId } },
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getExpenses(userId) {
  if (!userId) {
    throw new Response("Failed to Fetch!!!!", { status: 500 });
  }

  try {
    return await prisma.expense.findMany({
      where: { userId },
      orderBy: { date: "desc" },
    });
  } catch (error) {
    console.log(error);
    throw new Response("Failed to Fetch!!!!", { status: 500 });
  }
}

export async function getExpense(id) {
  try {
    const expense = prisma.expense.findFirst({ where: { id } });
    return expense;
  } catch (error) {
    console.log(error);
    // throw error;
    throw new Response("Failed to Fetch", { status: 500 });
  }
}

export async function updateExpense(id, expenseData) {
  try {
    await prisma.expense.update({
      where: { id },
      data: {
        title: expenseData.title,
        amount: +expenseData.amount,
        date: new Date(expenseData.date),
      },
    });
  } catch (error) {
    //this being caught in error boundary of root
    throw new Response("Coudn't update item!!!!!!", { status: 500 });
  }
}

export async function deleteExpense(id) {
  try {
    await prisma.expense.delete({ where: { id } });
  } catch (error) {
    throw new Response("Coudn't delete item!!!!!!", { status: 500 });
  }
}
