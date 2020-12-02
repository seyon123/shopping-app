import axios from "axios";

const instance = axios.create({
	baseURL: "https://us-central1-reactshoppy.cloudfunctions.net/api",
	//http://localhost:5001/reactshoppy/us-central1/api
	//"https://us-central1-reactshoppy.cloudfunctions.net/api"
});

export default instance;
