import React from "react";
import "./Order.css";
import moment from "moment";
import ProductCheckout from "./ProductCheckout";
import CurrencyFormat from "react-currency-format";

function Order({ order }) {
	return (
		<div className="order">
			<h2>Order</h2>
			<p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
			<p className="orderId">
				<b>Order ID</b>: {order.id}
			</p>

			{order.data.basket.map((item, i) => (
				<ProductCheckout key={i} id={item.id} title={item.title} image={item.image} price={item.price} rating={item.rating} hideButton />
			))}

			<CurrencyFormat
				renderText={(value) => <h3 className="orderTotal">Order Total: {value}</h3>}
				decimalScale={2}
				value={order.data.amount / 100}
				displayType={"text"}
				thousandSeparator={true}
				prefix={"$"}
			/>
		</div>
	);
}

export default Order;
