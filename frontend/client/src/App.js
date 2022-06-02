import './App.css';
import HomePage from './pages/HomePage';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import ProfilePage from './pages/ProfilePage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import { useEffect, useState } from 'react';
import DetailProductPage from './pages/DetailProductPage';
import NavBar from './components/Navbar/NavBar';
import { useSelector } from 'react-redux';
import AdminPage from './pages/AdminPage';
import CategoryPage from './pages/CategoryPage';
import Footer from './components/Footer/Footer';
import { useDispatch } from 'react-redux';
import { signInUser } from './actions/user';

function App() {
	const dispatch = useDispatch();
	const [login, setLogin] = useState(true);
	const isLogin = useSelector((state) => state.user.isLogin);
	const isAdmin = useSelector((state) => state.user.isAdmin);
	console.log('isAdmin', isAdmin);

	useEffect(() => {
		setLogin(isLogin);
	}, [isLogin]);

	return login ? (
		<div className="app">
			<Router>
				<NavBar status={!isAdmin} />
				<div className="app-container">
					<div className="app-wrap">
						<div>
							<Switch>
								<Route exact path="/login">
									{login && !isAdmin ? (
										<Redirect from="/login" to="/" />
									) : (
										<Redirect from="/login" to="/admin" />
									)}
								</Route>
								<Route exact path="/">
									<HomePage />
								</Route>
								<Route path="/admin">
									<AdminPage />
								</Route>
								<Route path="/cart">
									<CartPage />
								</Route>
								<Route path="/profile">
									<ProfilePage />
								</Route>
								<Route path="/category/:slugCategory">
									<CategoryPage />
								</Route>
								<Route path="/category">
									<CategoryPage />
								</Route>
								<Route path="/detail-product/:slug">
									<DetailProductPage />
								</Route>
								<Redirect from="*" to="/" />
							</Switch>
						</div>
					</div>
				</div>
				<Footer />
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
				<Route path="/admin">
					{login && isAdmin ? (
						<Redirect to="/admin" />
					) : (
						<Redirect from="/admin" to="/login" />
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
