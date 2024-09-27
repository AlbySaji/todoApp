import { Provider } from "react-redux";
import Todo from "./feature/todoList";
import { store } from "./Store/store";
function App() {
	return (
		<Provider store={store}>
			<Todo />
		</Provider>
	);
}

export default App;
