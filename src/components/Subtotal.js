import React from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../StateProvider";
import { getBasketTotal } from "../reducer";
import { useHistory } from "react-router-dom";

function Subtotal() {
	const history = useHistory();
	const [{ user, basket }, dispatch] = useStateValue();
	console.log(basket);

	return (
		<div className="subtotal">
			<CurrencyFormat
				renderText={(value) => (
					<>
						<p>
							Subtotal ({basket.length} items): <strong>{value}</strong>
						</p>
						<small className="subtotalGift">
							<input type="checkbox" /> This order contains a gift
						</small>
					</>
				)}
				decimalScale={2}
				value={getBasketTotal(basket) * 1.13}
				displayType={"text"}
				thousandSeparator={true}
				prefix={"$"}
			/>

			<button
				onClick={(e) => {
					if (user && basket.length !== 0) {
						dispatch({
							type: "SET_DRAWER",
							toggle: false,
						});
						history.push("/payment");
					} else {
						if (!user) {
							alert("You must sign-in to make a purchase");
						} else if (basket.length === 0) {
							alert("Please add at least 1 item to make a purchase");
						}
					}
				}}
			>
				Proceed to checkout
			</button>
		</div>
	);
}

export default Subtotal;
