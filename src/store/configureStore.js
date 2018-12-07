import { createStore, applyMiddleware } from "redux";

import thunk from "redux-thunk";

import reducers from "../Reducers/reducers";
const store = createStore(reducers, applyMiddleware(thunk));

export default store;
