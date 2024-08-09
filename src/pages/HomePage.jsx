import React from "react";
import AddTransactionPage from "./AddTransactionPage";
import styles from "./HomePage.module.css";
const HomePage = () => {
	return (
		<div className={styles.homeContainer}>
			<div className={styles.content}>
				<h1 className={styles.homeTitle}>
					Welcome to Personal Finance Tracker
				</h1>
				<p className={styles.homeDescription}>
					Easily manage your finances by tracking your income,
					expenses, and savings. Start making informed decisions
					today!
				</p>
			</div>
		</div>
	);
};

export default HomePage;
