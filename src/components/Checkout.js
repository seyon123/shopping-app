import React, { useEffect } from "react";
import "./Checkout.css";
import Subtotal from "./Subtotal";
import { useStateValue } from "../StateProvider";
import ProductCheckout from "./ProductCheckout";

function Checkout() {
	const [{ basket, user }, dispatch] = useStateValue();

	useEffect(() => {
		document.title = `Cart | ReactShop`;
	}, []);

	return (
		<div className="checkout">
			<div className="checkoutLeft">
				<div>
					<h3>Hello, {user ? `${user.email.split("@")[0]} (${user.email})` : "Guest"}</h3>
					<h2 className="checkoutTitle">Your shopping Basket</h2>

					{basket.map((item, i) => (
						<ProductCheckout key={i} id={item.id} title={item.title} image={item.image} price={item.price} rating={item.rating} />
					))}
				</div>
			</div>

			<div className="checkoutRight">
				<Subtotal />
			</div>
		</div>
	);
}

export default Checkout;
