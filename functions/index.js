const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_51HmRU3Dl5dhSyKoHsLuzPTFCWrSei7fkGTRoEOldiIzYi0guiWgC49fK38QzAVzd5T7Gpr4zINifKZV5lpe9xQs700uKqujlFl");

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (request, response) => {
	response.send("Get");
});

app.post("/payments/create", async (req, res) => {
	const total = req.query.total;

	console.log("Total: $", total / 100);

	const paymentIntent = await stripe.paymentIntents.create({
		amount: total,
		currency: "cad",
	});

	res.status(201).send({
		clientSecret: paymentIntent.client_secret,
	});
});

exports.api = functions.https.onRequest(app);
