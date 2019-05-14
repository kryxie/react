import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import configureStore from './store';
import {Route, Switch} from "react-router";
import {BrowserRouter} from 'react-router-dom';
import {router} from "./router";

const store = configureStore();

const Root: React.FC = () => (
	<Provider store={store}>
		<BrowserRouter>
			<Switch>
				{router.map((route, index) => {
					let content = React.createElement(route.component);

					return (<Route key={index} path={route.path} render={() => {
						return route.layout ? React.createElement(route.layout, {}, content) : content;
					}}/>);
				})}
			</Switch>
		</BrowserRouter>
	</Provider>
);

ReactDOM.render(<Root/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
