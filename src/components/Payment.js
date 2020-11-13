import React, { useState } from "react";
import "./Payment.css";
import { useStateValue } from "../StateProvider";
import { getBasketTotal } from "../reducer";
import CurrencyFormat from "react-currency-format";
import ProductCheckout from "./ProductCheckout";
import { Link, useHistory } from "react-router-dom";
import axios from "../axios";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { db } from "../firebase";

function Payment() {
	const [{ user, basket }, dispatch] = useStateValue();

	const stripe = useStripe();
	const elements = useElements();
	const history = useHistory();
	const [succeeded, setSucceeded] = useState(false);
	const [processing, setProcessing] = useState("");
	const [error, setError] = useState(null);
	const [disabled, setDisabled] = useState(true);
	const [clientSecret, setClientSecret] = useState(true);

	useState(() => {
		const getClientSecret = async () => {
			const response = await axios({
				method: "post",
				url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
			});
			setClientSecret(response.data.clientSecret);
		};

		getClientSecret();
	}, [basket]);

	console.log("[CLIENTSECRET]", clientSecret);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setProcessing(true);

		const payload = await stripe
			.confirmCardPayment(clientSecret, {
				payment_method: {
					card: elements.getElement(CardElement),
				},
			})
			.then(({ paymentIntent }) => {
				db.collection("users")
					.doc(user?.uid)
					.collection("orders")
					.doc(paymentIntent.id)
					.set({
						basket,
						amount: paymentIntent.amount,
						created: paymentIntent.created,
					});

				setSucceeded(true);
				setError(null);
				setProcessing(false);

				dispatch({
					type: "EMPTY_BASKET",
				});

				history.replace("/orders");
			});
	};

	const handleChange = (e) => {
		setDisabled(e.empty);
		setError(e.error ? e.error.message : "");
	};

	return (
		<div className="payment">
			<div className="paymentContainer">
				<h1>
					Checkout (<Link to="/checkout">{basket?.length} items</Link>
					)
				</h1>
				<div className="paymentSection">
					<div className="paymentTitle">
						<h3>Delivery Address</h3>
					</div>
					<div className="paymentAddress">
						<p>{user?.email}</p>
						<p>123 Some Address</p>
						<p>City, State/Province</p>
						<p>Zip/Postal Code</p>
						<p>Country</p>
					</div>
				</div>
				<div className="paymentSection">
					<div className="paymentTitle">
						<h3>Review items</h3>
					</div>
					<div className="paymentItems">
						{basket.map((item, i) => (
							<ProductCheckout
								key={i}
								id={item.id}
								title={item.title}
								image={item.image}
								price={item.price}
								rating={item.rating}
							/>
						))}
					</div>
				</div>

				<div className="paymentSection">
					<div className="paymentTitle">
						<h3>Order Total: </h3>
					</div>
					<div className="paymentTotal">
						<div className="paymentInfo">
							{getBasketTotal(basket) !== 0 ? 
							<>
								<CurrencyFormat
									renderText={(value) => <><h4>Items: <span className="amount">{value}</span></h4><h4>Shipping: <span className="amount">$5.99</span> </h4><h4>FREE Shipping: <span className="amount">-$5.99</span> </h4></>}
									decimalScale={2}
									value={getBasketTotal(basket)}
									displayType="text"
									thousandSeperator={true}
									prefix="$"
								/>
								<CurrencyFormat
									renderText={(value) => <><br/><h4>Total Before Tax: <span className="amount">{value}</span></h4></>}
									decimalScale={2}
									value={getBasketTotal(basket)}
									displayType="text"
									thousandSeperator={true}
									prefix="$"
								/>
								<CurrencyFormat
									renderText={(value) => <><h4>Estimated Tax: <span className="amount">{value}</span></h4></>}
									decimalScale={2}
									value={getBasketTotal(basket)*0.13}
									displayType="text"
									thousandSeperator={true}
									prefix="$"
								/>
							</> : ""}
							<CurrencyFormat
								renderText={(value) => <><br/><h3>Final Total: <span className="amount">{value}</span></h3></>}
								decimalScale={2}
								value={getBasketTotal(basket)*1.13}
								displayType="text"
								thousandSeperator={true}
								prefix="$"
							/>
						</div>
					</div>
				</div>

				<div className="paymentSection">
					<div className="paymentTitle">
						<h3>Payment Details</h3>
					</div>
					<div className="paymentDetails">
						<form onSubmit={handleSubmit}>
							<div className="paymentPriceContainer">
								<p className="disclaimer">Use 4242 4242 4242 4242, a valid expiration date in the future, and any CVC number. Please dont use your real credit card info. This is not a real store!</p>
								<CardElement
									onChange={handleChange}
									options={{
										style: {
											base: {
												margin: "20px",
												fontSize: "16px",
												color: "#424770",
											},
											invalid: {
												color: "#9e2146",
											},
										},
									}}
								/>
								<button
									disabled={
										processing || disabled || succeeded
									}
									className="paymentButton"
								>
									<span>
										{processing ? (
											<p>Processing</p>
										) : (
											"Buy Now"
										)}
									</span>
								</button>
							</div>
							{error && <div>error</div>}
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Payment;
