import React, { useMemo } from "react";
import useTransactions from "../hooks/useTransactions";
import { useFinance } from "../context/FinanceContext";
import styles from "./Reports.module.css";

const Reports = () => {
	const { transactions } = useTransactions();
	const { settings } = useFinance();
	const summary = useMemo(() => {
		const income = transactions
			.filter((transaction) => transaction.type === "Income")
			.reduce((acc, transaction) => acc + transaction.amount, 0);
		const expense = transactions
			.filter((transaction) => transaction.type === "Expense")
			.reduce((acc, transaction) => acc + transaction.amount, 0);
		const savings = transactions
			.filter((transaction) => transaction.type === "Savings")
			.reduce((acc, transaction) => acc + transaction.amount, 0);

		return {
			income: income * settings.conversionRate,
			expense: expense * settings.conversionRate,
			savings: savings * settings.conversionRate,
		};
	}, [transactions, settings.conversionRate]);

	return (
		<div className={styles.reportsContainer}>
			<h2>Reports</h2>
			<p>
				Total Income: {settings.symbol} {"  "}
				{summary.income.toFixed(2)}
			</p>
			<p>
				Total Expenses: {settings.symbol} {"  "}
				{summary.expense.toFixed(2)}
			</p>
			<p>
				Total Savings: {settings.symbol} {"  "}
				{summary.savings.toFixed(2)}
			</p>
		</div>
	);
};

export default Reports;
