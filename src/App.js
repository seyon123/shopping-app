import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import Login from "./components/Login";
import Checkout from "./components/Checkout";
import Payment from "./components/Payment";
import Footer from "./components/Footer";
// import Orders from "./components/Orders"
import { auth } from "./firebase";

import "./App.css";
import { useEffect } from "react";
import { useStateValue } from "./StateProvider";

function App() {
	const [{ user }, dispatch] = useStateValue();

	useEffect(() => {
		auth.onAuthStateChanged((authUser) => {
			console.log("user:", authUser);
			if (authUser) {
				dispatch({
					type: "SET_USER",
					user: authUser,
				});
			} else {
				dispatch({
					type: "SET_USER",
					user: null,
				});
			}
		});
	}, []);

	return (
		<div className="App">
			<Router>
				<Switch>
					<Route path="/login">
						<Login />
					</Route>
					{/* <Route path="/orders">
						<Header />
						<Orders />
					</Route> */}
					<Route path="/checkout">
						<Header />
						<Checkout />
						<Footer />
					</Route>
					<Route path="/payment">
						<Header />
						<Payment />
						<Footer />
					</Route>
					<Route path="/">
						<Header />
						<Home />
						<Footer />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
