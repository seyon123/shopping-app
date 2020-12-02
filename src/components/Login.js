import React, { useEffect, useState } from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../firebase";

function Login() {
	const history = useHistory();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		document.title = `Login | ReactShop`;
	}, []);

	const signIn = (e) => {
		e.preventDefault();

		auth.signInWithEmailAndPassword(email, password)
			.then((auth) => {
				history.push("/");
			})
			.catch((error) => alert(error.message));
	};

	const register = (e) => {
		e.preventDefault();

		auth.createUserWithEmailAndPassword(email, password)
			.then((auth) => {
				if (auth) {
					history.push("/");
				}
			})
			.catch((error) => alert(error.message));
	};

	return (
		<div className="login">
			<div className="loginContainer">
				<Link to="/" className="link">
					<h1 className="loginLogo">ReactShop</h1>
				</Link>
				<h1>Sign-in</h1>

				<form>
					<h5>E-mail</h5>
					<input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

					<h5>Password</h5>
					<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

					<button type="submit" onClick={signIn} className="loginSignInButton">
						Sign In
					</button>
				</form>

				<button className="loginRegisterButton" onClick={register}>
					Create your ReactShop Account
				</button>

				<p>
					Disclaimer: This is a fake store called ReactShop. This was created for demo purposes only. Do not try to purchase any products through this store. If you want to try this app
					without giving your information use email: <b>demo@demo.com</b> and <b>Demo123</b> as password.
				</p>
			</div>
		</div>
	);
}

export default Login;
