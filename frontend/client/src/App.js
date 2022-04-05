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
import ProfilePage from './pages/ProfilePage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import { useState } from 'react';
import DetailProductPage from './pages/DetailProductPage';

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
							<CartPage />
						</Route>
						<Route path="/profile">
							<ProfilePage />
						</Route>
						<Route path="/detail-product">
							<DetailProductPage />
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
					<LoginPage />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
