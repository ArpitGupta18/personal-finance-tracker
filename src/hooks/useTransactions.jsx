import { useFinance } from "../context/FinanceContext";

const useTransactions = () => {
	const { transactions, addTransaction, deleteTransaction, editTransaction } =
		useFinance();

	return { transactions, addTransaction, deleteTransaction, editTransaction };
};

export default useTransactions;
