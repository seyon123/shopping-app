import React, { useEffect, useState } from "react";
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

	useEffect(() => {
		document.title = `Checkout | ReactShop`;
	}, []);

	useState(() => {
		const getClientSecret = async () => {
			const response = await axios({
				method: "post",
				url: `/payments/create?total=${(getBasketTotal(basket) * 1.13 * 100).toFixed(0)}`,
			});
			setClientSecret(response.data.clientSecret);
		};

		getClientSecret();
	}, [basket]);

	console.log("[CLIENTSECRET]", clientSecret);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setProcessing(true);

		const billingDetails = {
			name: e.target.name.value,
			email: e.target.email.value,
			address: {
				address: e.target.address.value,
				city: e.target.city.value,
				province: e.target.province.value,
				postal_code: e.target.postal_code.value,
				country: e.target.country.value,
			},
		};

		const payload = await stripe
			.confirmCardPayment(clientSecret, {
				payment_method: {
					card: elements.getElement(CardElement),
				},
			})
			.then(({ paymentIntent }) => {
				db.collection("users").doc(user?.uid).collection("orders").doc(paymentIntent.id).set({
					basket,
					amount: paymentIntent.amount,
					created: paymentIntent.created,
					billing_details: billingDetails,
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
					Checkout (<Link to="/checkout">{basket?.length} items</Link>)
				</h1>
				<div className="paymentSection">
					<div className="paymentTitle">
						<h3>Review items</h3>
					</div>
					<div className="paymentItems">
						{basket.map((item, i) => (
							<ProductCheckout key={i} id={item.id} title={item.title} image={item.image} price={item.price} rating={item.rating} />
						))}
					</div>
				</div>

				<div className="paymentSection">
					<div className="paymentTitle">
						<h3>Order Total: </h3>
					</div>
					<div className="paymentTotal">
						<div className="paymentInfo">
							{getBasketTotal(basket) !== 0 ? (
								<>
									<CurrencyFormat
										renderText={(value) => (
											<>
												<p>
													Items: <span className="amount">{value}</span>
												</p>
												<p>
													Shipping: <span className="amount">$5.99</span>{" "}
												</p>
												<p>
													FREE Shipping: <span className="amount">-$5.99</span>{" "}
												</p>
											</>
										)}
										decimalScale={2}
										value={getBasketTotal(basket)}
										displayType="text"
										thousandSeperator={true}
										prefix="$"
									/>
									<CurrencyFormat
										renderText={(value) => (
											<>
												<br />
												<p>
													Total Before Tax: <span className="amount">{value}</span>
												</p>
											</>
										)}
										decimalScale={2}
										value={getBasketTotal(basket)}
										displayType="text"
										thousandSeperator={true}
										prefix="$"
									/>
									<CurrencyFormat
										renderText={(value) => (
											<>
												<p>
													Estimated Tax: <span className="amount">{value}</span>
												</p>
											</>
										)}
										decimalScale={2}
										value={getBasketTotal(basket) * 0.13}
										displayType="text"
										thousandSeperator={true}
										prefix="$"
									/>
								</>
							) : (
								""
							)}
							<CurrencyFormat
								renderText={(value) => (
									<>
										<br />
										<h3>
											Final Total: <span className="amount">{value}</span>
										</h3>
									</>
								)}
								decimalScale={2}
								value={getBasketTotal(basket) * 1.13}
								displayType="text"
								thousandSeperator={true}
								prefix="$"
							/>
						</div>
					</div>
				</div>
				<form onSubmit={handleSubmit}>
					<div className="paymentSection">
						<div className="paymentTitle">
							<h3>Delivery/Billing Info</h3>
						</div>
						<div className="paymentAddress">
							<div className="paymentInfo">
								<p>
									Email: <input name="email" className="text" type="email" defaultValue={user?.email} required></input>
								</p>
								<p>
									Name: <input name="name" className="text" type="text" required />
								</p>
								<p>
									City: <input name="city" className="text" type="text" required />
								</p>
								<p>
									Address: <input name="address" className="text" type="text" required />
								</p>
								<p>
									State/Province: <input name="province" className="text" type="text" required />
								</p>
								<p>
									Zip/Postal Code: <input name="postal_code" className="text" type="text" required />
								</p>
								<p>
									Country: <input name="country" className="text" type="text" required />
								</p>
							</div>
						</div>
					</div>

					<div className="paymentSection">
						<div className="paymentTitle">
							<h3>Payment Details</h3>
						</div>
						<div className="paymentDetails">
							<div className="paymentPriceContainer">
								<p className="disclaimer">
									Use 4242 4242 4242 4242, a valid expiration date in the future, and any CVC number. Please dont use your real credit card info. This is not a real store!
								</p>
								<CardElement
									className="cardInfo"
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
								<button disabled={processing || disabled || succeeded} className="paymentButton">
									<span>{processing ? <p>Processing</p> : "Buy Now"}</span>
								</button>
							</div>
							{error && <div>error</div>}
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Payment;
