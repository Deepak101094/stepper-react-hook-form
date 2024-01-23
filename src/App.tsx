import FormContainer from "./registration-form/FormContainer.jsx";
import store from "./store/store.js";
import { Provider } from "react-redux";

function App() {
	return (
		<Provider store={store}>
			<FormContainer />
		</Provider>
	);
}

export default App;
