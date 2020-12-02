import React, { useState, useEffect } from "react";
import "./Orders.css";
import { db } from "../firebase";
import { useStateValue } from "../StateProvider";
import Order from "./Order";

function Orders() {
	const [{ user }] = useStateValue();
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		document.title = `Orders | ReactShop`;
	}, []);

	useEffect(() => {
		if (user) {
			db.collection("users")
				.doc(user?.uid)
				.collection("orders")
				.orderBy("created", "desc")
				.onSnapshot((snap) => {
					setOrders(
						snap.docs.map((doc) => ({
							id: doc.id,
							data: doc.data(),
						}))
					);
				});
		} else {
			setOrders([]);
		}
	}, [user]);

	return (
		<div className="orders">
			<h1>Your Orders</h1>

			<div className="ordersContainer">
				{orders?.map((order, i) => (
					<Order key={i} order={order} />
				))}
			</div>
		</div>
	);
}

export default Orders;
