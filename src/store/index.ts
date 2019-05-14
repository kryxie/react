import {createStore, combineReducers} from "redux";

import {deviceReducer} from "./device/reducers";

export const rootReducer = combineReducers({
	device: deviceReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
	return createStore(rootReducer);
}
