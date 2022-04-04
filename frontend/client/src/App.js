import logo from './logo.svg';
import './App.css';
import HomePage from './pages/HomePage';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect,
} from 'react-router-dom';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import Login from './pages/Login';
import { useState } from 'react';
import DetailProduct from './pages/DetailProduct';

function App() {
	const [isLogin, setIsLogin] = useState(true);
	return isLogin ? (
		<div>
			<Router>
				<div>
					<ul>
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/cart">Cart</Link>
						</li>
						<li>
							<Link to="/profile">Profile</Link>
						</li>
					</ul>
					<Switch>
						<Route exact path="/login">
							{isLogin ? (
								<Redirect from="/login" to="/" />
							) : (
								<Redirect from="/login" to="/login" />
							)}
						</Route>
						<Route exact path="/">
							<HomePage />
						</Route>
						<Route path="/cart">
							<Cart />
						</Route>
						<Route path="/profile">
							<Profile />
						</Route>
						<Route path="/detail-product">
							<DetailProduct />
						</Route>
					</Switch>
				</div>
			</Router>
		</div>
	) : (
		<Router>
			<Switch>
				<Route exact path="/">
					{isLogin ? (
						<Redirect to="/" />
					) : (
						<Redirect from="/" to="/login" />
					)}
				</Route>
				<Route path="/login">
					<Login />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
