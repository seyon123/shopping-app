import React from "react";
import "./Home.css";
import Product from "./Product";

function Home() {
	return (
		<div className="home">
			<div className="homeContainer">
				<img
					className="homeImage"
					src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
					alt=""
				/>
				<div className="homeRow">
					<Product
						id="90829332"
						title="De'Longhi All-In-One Combination Coffee and Espresso Machine, Black/Stainless"
						price={299.99}
						rating={4}
						image="https://images-na.ssl-images-amazon.com/images/I/71uLuTiXQlL._AC_SL1500_.jpg"
					/>
					<Product
						id="49538094"
						title="Xbox Series X"
						price={1100.0}
						rating={5}
						image="https://images-na.ssl-images-amazon.com/images/I/51A41nLe5IL._AC_SL1200_.jpg"
					/>
					<Product
						id="49538094"
						title="Xbox Series X"
						price={1100.0}
						rating={5}
						image="https://images-na.ssl-images-amazon.com/images/I/51A41nLe5IL._AC_SL1200_.jpg"
					/>
				</div>

				<div className="homeRow">
					<Product
						id="4903850"
						title="PlayStation 5 Console - PlayStation 5 Edition"
						price={629.99}
						rating={5}
						image="https://images-na.ssl-images-amazon.com/images/I/619BkvKW35L._AC_SL1500_.jpg"
					/>
					<Product
						id="23445930"
						title="All-new Echo Dot (4th Gen) | Smart speaker with clock and Alexa | Glacier White"
						price={79.99}
						rating={4}
						image="https://images-na.ssl-images-amazon.com/images/I/61nNGJH14kL._AC_SL1000_.jpg"
					/>
					<Product
						id="3254354345"
						title="New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)"
						price={598.99}
						rating={4}
						image="https://images-na.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SX385_.jpg"
					/>
				</div>

				<div className="homeRow">
					<Product
						id="12321341"
						title="HyperX Alloy Origins Core - Tenkeyless Mechanical Gaming Keyboard, Software Controlled Light & Macro Customization, Compact Form Factor, RGB LED Backlit, Linear HyperX Red Switch"
						price={124.99}
						rating={5}
						image="https://images-na.ssl-images-amazon.com/images/I/61b%2B3QeNq-L._AC_SL1428_.jpg"
					/>
					<Product
						id="12321341"
						title="HyperX Alloy Origins Core - Tenkeyless Mechanical Gaming Keyboard, Software Controlled Light & Macro Customization, Compact Form Factor, RGB LED Backlit, Linear HyperX Red Switch"
						price={124.99}
						rating={5}
						image="https://images-na.ssl-images-amazon.com/images/I/61b%2B3QeNq-L._AC_SL1428_.jpg"
					/>
				</div>
			</div>
		</div>
	);
}

export default Home;
