import React from "react";
import "./ProductCheckout.css";
import { useStateValue } from "../StateProvider";

function ProductCheckout({ id, image, title, price, rating, hideButton }) {
	const [{ basket }, dispatch] = useStateValue();

	const removeFromBasket = () => {
		dispatch({
			type: "REMOVE_FROM_BASKET",
			id: id,
		});
	};

	return (
		<div className="checkoutProduct">
			<img className="checkoutProductImage" src={image} />

			<div className="checkoutProductInfo">
				<p className="checkoutProductTitle">{title}</p>
				<p className="checkoutProductPrice">
					<small>$</small>
					<strong>{price}</strong>
				</p>
				<div className="checkoutProductRating">
					{Array(rating)
						.fill()
						.map((_, i) => (
							<i key={i} className="fas fa-star"></i>
						))}
					{Array(5 - rating)
						.fill()
						.map((_, i) => (
							<i key={i} className="far fa-star"></i>
						))}
				</div>
				{!hideButton && (
					<button onClick={removeFromBasket}>
						<i className="fas fa-trash-alt"></i> Remove from Basket
					</button>
				)}
			</div>
		</div>
	);
}

export default ProductCheckout;
