import { createContext, useState, useContext, useEffect } from "react";

export const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
	const [transactions, setTransactions] = useState([]);
	const [settings, setSettings] = useState({
		currency: "USD",
		symbol: "$",
		conversionRate: 1,
	});

	const conversionRates = {
		USD: 1,
		EUR: 0.92,
		GBP: 0.78,
		INR: 83.95,
	};

	useEffect(() => {
		const symbols = {
			USD: "$",
			EUR: "€",
			GBP: "£",
			INR: "₹",
		};
		setSettings((prevSettings) => ({
			...prevSettings,
			symbol: symbols[prevSettings.currency],
			conversionRate: conversionRates[prevSettings.currency],
		}));
	}, [settings.currency]);

	const addTransaction = (newTransaction) => {
		setTransactions([
			...transactions,
			{ ...newTransaction, id: Date.now() },
		]);
	};

	const deleteTransaction = (id) => {
		setTransactions(
			transactions.filter((transaction) => transaction.id !== id)
		);
	};

	const editTransaction = (id, updatedTransaction) => {
		setTransactions(
			transactions.map((transaction) =>
				transaction.id === id
					? { ...transaction, ...updatedTransaction }
					: transaction
			)
		);
	};

	return (
		<FinanceContext.Provider
			value={{
				transactions,
				setTransactions,
				settings,
				setSettings,
				addTransaction,
				deleteTransaction,
				editTransaction,
			}}
		>
			{children}
		</FinanceContext.Provider>
	);
};

export function useFinance() {
	return useContext(FinanceContext);
}
