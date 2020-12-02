import React, { useEffect, useState } from "react";
import "./Home.css";
import Product from "./Product";
import { db } from "../firebase";

function Home() {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		document.title = `ReactShop`;

		db.collection("products").onSnapshot((snapshot) => {
			setProducts(
				snapshot.docs.map((doc) => ({
					id: doc.id,
					product: doc.data(),
				}))
			);
		});
	}, []);

	return (
		products.length > 0 && (
			<div className="home">
				<div className="homeContainer">
					<img className="homeImage" src="https://images-na.ssl-images-amazon.com/images/G/15/kindle/journeys/MDUxZTAzODMt/MDUxZTAzODMt-MTlkMjQ1MmEt-w1500._CB418674021_.jpg" alt="" />
					<div className="homeRow">
						<Product id={products[0].id} title={products[0].product.title} price={products[0].product.price} rating={products[0].product.rating} image={products[0].product.image} />
						<Product id={products[1].id} title={products[1].product.title} price={products[1].product.price} rating={products[1].product.rating} image={products[1].product.image} />
						<Product id={products[2].id} title={products[2].product.title} price={products[2].product.price} rating={products[2].product.rating} image={products[2].product.image} />
					</div>

					<div className="homeRow">
						<Product id={products[3].id} title={products[3].product.title} price={products[3].product.price} rating={products[3].product.rating} image={products[3].product.image} />
						<Product id={products[4].id} title={products[4].product.title} price={products[4].product.price} rating={products[4].product.rating} image={products[4].product.image} />
						<Product id={products[5].id} title={products[5].product.title} price={products[5].product.price} rating={products[5].product.rating} image={products[5].product.image} />
					</div>

					<div className="homeRow">
						<Product id={products[6].id} title={products[6].product.title} price={products[6].product.price} rating={products[6].product.rating} image={products[6].product.image} />
						<Product id={products[7].id} title={products[7].product.title} price={products[7].product.price} rating={products[7].product.rating} image={products[7].product.image} />
					</div>
				</div>
			</div>
		)
	);
}

export default Home;
