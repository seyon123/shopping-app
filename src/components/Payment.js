import React from "react";
import "./Payment.css";
import { useStateValue } from "../StateProvider";
import { getBasketTotal } from "../reducer";
import CurrencyFormat from "react-currency-format";
import ProductCheckout from "./ProductCheckout";
import { Link } from "react-router-dom";

function Payment() {
    // eslint-disable-next-line
    const [{ user, basket }, dispatch] = useStateValue();

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
						<h3>Review items and delivery</h3>
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
						<h3>Payment Methods</h3>
					</div>
					<div className="paymentDetails">
						<form >
							{/* <CardElement onChange={handleChange} /> */}
							<div className="paymentPriceContainer">
								<CurrencyFormat
									renderText={(value) => (
										<h3>Order Total: {value}</h3>
									)}
									decimalScale={2}
									value={getBasketTotal(basket)}
									displayType="text"
									thousandSeperator={true}
									prefix="$"
								/>
								<button className="paymentButton">
									<span>Buy Now</span>
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Payment;
