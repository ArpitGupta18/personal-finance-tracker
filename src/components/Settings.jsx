import React from "react";
import { useFinance } from "../context/FinanceContext";
import styles from "./Settings.module.css";

const Settings = () => {
	const { settings, setSettings } = useFinance();

	const handleCurrencyChange = (event) => {
		setSettings({ ...settings, currency: event.target.value });
		console.log(settings);
	};

	return (
		<div className={styles.settingsContainer}>
			<h2>Settings</h2>
			<p>Currency: </p>
			<select value={settings.currency} onChange={handleCurrencyChange}>
				<option value="USD">USD - $</option>
				<option value="EUR">EUR - €</option>
				<option value="GBP">GBP - £</option>
				<option value="INR">INR - ₹</option>
			</select>
		</div>
	);
};

export default Settings;
