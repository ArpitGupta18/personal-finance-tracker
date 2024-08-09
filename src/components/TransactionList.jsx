import React, { useState, useMemo } from "react";
import useTransactions from "../hooks/useTransactions";
import AddTransaction from "./AddTransaction";
import { useFinance } from "../context/FinanceContext";
import styles from "./TransactionList.module.css";
const TransactionList = () => {
	const { transactions, deleteTransaction } = useTransactions();
	const { settings } = useFinance();
	const [editMode, setEditMode] = useState(false);
	const [transactionToEdit, setTransactionToEdit] = useState(null);

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

	const handleEdit = (transaction) => {
		setTransactionToEdit(transaction);
		setEditMode(true);
	};

	const handleEditComplete = () => {
		setEditMode(false);
		setTransactionToEdit(null);
	};

	return (
		<div className={styles.transactionListContainer}>
			<div className={styles.transactionListHeader}>
				<h2>Transactions</h2>
				<div className={styles.totalSummary}>
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
			</div>
			{editMode ? (
				<AddTransaction
					editMode={true}
					transactionToEdit={transactionToEdit}
					onEditComplete={handleEditComplete}
				/>
			) : (
				<ul>
					{transactions.map((transaction) => (
						<li key={transaction.id}>
							<div className={styles.transactionDetails}>
								<span>
									{transaction.description} -{" "}
									{transaction.type}:
								</span>
								<span>
									{settings.symbol}
									{(
										transaction.amount *
										settings.conversionRate
									).toFixed(2)}
								</span>
							</div>
							<div className={styles.transactionActions}>
								<button
									className={styles.editButton}
									onClick={() => handleEdit(transaction)}
								>
									Edit
								</button>
								<button
									className={styles.deleteButton}
									onClick={() =>
										deleteTransaction(transaction.id)
									}
								>
									Delete
								</button>
							</div>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default TransactionList;
