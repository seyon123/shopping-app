import axios from "axios";

const instance = axios.create({
	baseURL: "https://us-central1-reactshoppy.cloudfunctions.net/api",
	//http://localhost:5000
});

export default instance;
