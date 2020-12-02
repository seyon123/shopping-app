import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import Login from "./components/Login";
import Checkout from "./components/Checkout";
import Payment from "./components/Payment";
import ProductPage from "./components/ProductPage";
import Footer from "./components/Footer";
import Orders from "./components/Orders";
import { auth } from "./firebase";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import "./App.css";
import { useEffect } from "react";
import { useStateValue } from "./StateProvider";

const promise = loadStripe("pk_test_51HmRU3Dl5dhSyKoHs3lTX5ZY3l7L1y6bixBlzjPfRBzOSuzkEJcLXVzpmiKTGDQk6ybCIhubIrG86M69I7v4UCHR00G0Aix5VU");

function App() {
	const [{ user, basket }, dispatch] = useStateValue();

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
	}, [dispatch]);

	return (
		<div className="App">
			<Router>
				<Switch>
					<Route exact path="/login">
						<Login />
					</Route>
					<Route exact path="/orders">
						<Header />
						<Orders />
						<Footer />
					</Route>
					<Route exact path="/checkout">
						<Header />
						<Checkout />
						<Footer />
					</Route>
					<Route exact path="/payment">
						<Header />
						{basket?.length ? (
							<Elements stripe={promise}>
								<Payment />
							</Elements>
						) : (
							<Redirect to="/" />
						)}
						<Footer />
					</Route>
					<Route exact path="/product/:productid">
						<Header />
						<ProductPage />
						<Footer />
					</Route>
					<Route exact path="/">
						<Header />
						<Home />
						<Footer />
					</Route>
					<Route>
						<Redirect to="/" />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
