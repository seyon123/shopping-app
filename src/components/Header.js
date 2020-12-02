import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import "./Header.css";
import { auth } from "../firebase";

function Header() {
	const [{ basket, user }, dispatch] = useStateValue();

	const handleAuthenticaton = () => {
		if (user) {
			auth.signOut();
		}
	};

	useEffect(() => {
		const btnToggle = document.querySelector("#themeToggle i");
		const theme = localStorage.getItem("theme");

		if (theme === "light") {
			btnToggle.classList.add("fa-sun");
			btnToggle.classList.remove("fa-moon");
			document.querySelector("body").classList.add(theme);
		}

		btnToggle.addEventListener("click", () => {
			if (btnToggle.classList.contains("fa-moon")) {
				btnToggle.classList.add("fa-sun");
				btnToggle.classList.remove("fa-moon");
				localStorage.setItem("theme", "light");
			} else {
				btnToggle.classList.add("fa-moon");
				btnToggle.classList.remove("fa-sun");
				localStorage.clear();
			}
			document.querySelector("body").classList.toggle("light");
		});
	}, []);

	return (
		<div className="header">
			<Link className="link headerTitle" to="/">
				<h1 className="headerLogo">ReactShop</h1>
			</Link>

			<div className="headerSearchContainer">
				<input className="headerSearchInput" type="text" />
				<i className="fas fa-search headerSearchIcon"></i>
			</div>
			<div className="break"></div>

			<div className="headerNavContainer">
				<Link to={!user ? "/login" : ""} className="link">
					<div onClick={handleAuthenticaton} className="headerOption">
						<span className="headerOptionLineOne">{user ? user.email.split("@")[0] : "Hello Guest"}</span>
						<span className="headerOptionLineTwo">{user ? "Sign Out" : "Sign In"}</span>
					</div>
				</Link>

				<Link to="/orders" className="link">
					<div className="headerOption">
						<span className="headerOptionLineOne">Returns</span>
						<span className="headerOptionLineTwo">& Orders</span>
					</div>
				</Link>

				<Link to="/checkout" className="link">
					<div className="headerOptionBasket">
						<i className="fas fa-shopping-basket"></i>
						<span className="headerOptionLineTwo headerBasketCount">{basket?.length}</span>
					</div>
				</Link>
			</div>

			<div id="themeToggle" className="headerTheme">
				<i className="far fa-moon"></i>
			</div>
		</div>
	);
}

export default Header;
