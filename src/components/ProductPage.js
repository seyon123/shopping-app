import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import Product from "./Product";
import "./ProductPage.css";

function ProductPage() {
	const { productid } = useParams();
	const [product, setProduct] = useState({});

	useEffect(() => {
		if (productid) {
			db.collection("products")
				.doc(productid)
				.get()
				.then((doc) => {
					setProduct(doc.data());
				});
		}
	}, [productid]);

	return (
		product && (
			<div className="singleProductContainerOuter">
				<div className="singleProductContainer">
					<Product title={product?.title} price={product?.price} rating={product?.rating || 0} image={product?.image} />
					{console.log(product)}
				</div>
			</div>
		)
	);
}

export default ProductPage;
