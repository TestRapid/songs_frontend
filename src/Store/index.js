import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

// importing store
import reducers from "./reducers";

// implementing store
const store = createStore(reducers, compose(applyMiddleware(thunk)));

const Store = ({ children }) => <Provider store={store}>{children}</Provider>;
export default Store;
