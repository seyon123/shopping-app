import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reducer, { initialState } from "./reducer";
import { StateProvider } from "./StateProvider";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

ReactDOM.render(
	<React.StrictMode>
		<StateProvider initialState={initialState} reducer={reducer}>
			<App />
		</StateProvider>
	</React.StrictMode>,
	document.getElementById("root")
);

serviceWorkerRegistration.register({
	onUpdate: registration => {
	  const waitingServiceWorker = registration.waiting;
	  if (waitingServiceWorker) {
		waitingServiceWorker.addEventListener("statechange", event => {
		  if (event.target.state === "activated") {
        alert("New Verison Found. Refressing...");
        window.location.reload()
		  }
		})
		waitingServiceWorker.postMessage({ type: "SKIP_WAITING" })
	  }
	}
})
