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
import { useEffect, useState } from 'react';
import DetailProductPage from './pages/DetailProductPage';
import NavBar from './components/Navbar/NavBar';
import { useSelector } from 'react-redux';

function App() {
	const [login, setLogin] = useState(true);
	const isLogin = useSelector((state) => state.user.isLogin);
	useEffect(() => {
		// console.log(isLogin);
		setLogin(isLogin);
	}, [isLogin]);

	return login ? (
		<div>
			<Router>
				<div>
					<NavBar />

					<Switch>
						<Route exact path="/login">
							{login ? (
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
					{login ? (
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
