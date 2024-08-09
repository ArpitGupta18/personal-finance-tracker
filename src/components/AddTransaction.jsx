import React, { useRef, useState, useEffect } from "react";
import useTransactions from "../hooks/useTransactions";
import styles from "./AddTransaction.module.css";
import { useFinance } from "../context/FinanceContext";

const AddTransaction = ({ editMode, transactionToEdit, onEditComplete }) => {
	const { addTransaction, editTransaction } = useTransactions();
	const { settings } = useFinance();
	const [type, setType] = useState(
		editMode ? transactionToEdit.type : "Income"
	);
	const descriptionRef = useRef(
		editMode ? transactionToEdit.description : ""
	);
	const amountRef = useRef(editMode ? transactionToEdit.amount : "");

	useEffect(() => {
		if (editMode && transactionToEdit) {
			setType(transactionToEdit.type);
			descriptionRef.current.value = transactionToEdit.description;
			amountRef.current.value = transactionToEdit.amount;
		}
	}, [editMode, transactionToEdit, settings.conversionRate]);

	const handleSubmit = (event) => {
		event.preventDefault();

		const newTransaction = {
			type,
			description: descriptionRef.current.value,
			amount: parseFloat(amountRef.current.value),
		};

		if (editMode) {
			editTransaction(transactionToEdit.id, newTransaction);
			onEditComplete();
		} else {
			addTransaction(newTransaction);
		}

		descriptionRef.current.value = "";
		amountRef.current.value = "";
		setType("Income");
	};

	return (
		<div className={styles.addTransactionContainer}>
			<h2>{editMode ? "Edit Transaction" : "Add Transaction"}</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<p>Type: </p>
					<select
						value={type}
						onChange={(event) => setType(event.target.value)}
					>
						<option value="Income">Income</option>
						<option value="Expense">Expense</option>
						<option value="Savings">Savings</option>
					</select>
				</div>

				<div>
					<p>Description: </p>
					<input type="text" ref={descriptionRef} required />
				</div>

				<div>
					<p>Amount (USD): </p>
					<input type="number" ref={amountRef} required />
				</div>

				<button type="submit">
					{editMode ? "Save Changes" : "Add Transaction"}
				</button>
			</form>
		</div>
	);
};

export default AddTransaction;
