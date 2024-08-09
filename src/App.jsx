import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddTransactionPage from "./pages/AddTransactionPage";
import TransactionsPage from "./pages/TransactionsPage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";
import { FinanceProvider } from "./context/FinanceContext";

function App() {
	return (
		<>
			<Router>
				<FinanceProvider>
					<div className="App">
						<header className="App-header">
							<nav>
								<ul>
									<li>
										<Link to="/">Home</Link>
									</li>
									<li>
										<Link to="/add">Add Transaction</Link>
									</li>
									<li>
										<Link to="/transactions">
											Transactions List
										</Link>
									</li>
									<li>
										<Link to="/reports">Reports</Link>
									</li>
									<li>
										<Link to="/settings">Settings</Link>
									</li>
								</ul>
							</nav>
							<div className="nav-footer">Arpit Gupta</div>
						</header>
						<main className="main-content">
							<Routes>
								<Route path="/" element={<HomePage />}></Route>
								<Route
									path="/add"
									element={<AddTransactionPage />}
								></Route>
								<Route
									path="/transactions"
									element={<TransactionsPage />}
								></Route>
								<Route
									path="/reports"
									element={<ReportsPage />}
								></Route>
								<Route
									path="/settings"
									element={<SettingsPage />}
								></Route>
							</Routes>
						</main>
					</div>
				</FinanceProvider>
			</Router>
		</>
	);
}

export default App;
