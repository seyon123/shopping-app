import React from "react";
import "./Product.css";
import { useStateValue } from "../StateProvider";

function Product({ id, title, image, price, rating }) {
	const [{ basket }, dispatch] = useStateValue();

	const addToBasket = () => {
		dispatch({
			type: "ADD_TO_BASKET",
			item: {
				id: id,
				title: title,
				image: image,
				price: price,
				rating: rating,
			},
		});
	};

	return (
		<div className="product">
			<div className="productInfo">
				<p>{title}</p>
				<p className="productPrice">
					<small>$</small>
					<strong>{price}</strong>
				</p>
				<div className="productRating">
					{Array(rating)
						.fill()
						.map((_, i) => (
							<i key={i} className="fas fa-star"></i>
						))}
					{Array(5 - rating)
						.fill()
						.map((_, i) => (
							<i key={i} className="non fas fa-star"></i>
						))}
				</div>
			</div>

			<img src={image} alt="" />

			<button onClick={addToBasket}>
				<i className="fas fa-shopping-basket"></i> Add to Basket
			</button>
		</div>
	);
}

export default Product;
