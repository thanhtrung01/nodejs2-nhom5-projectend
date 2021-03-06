import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.jpg';
import userImg from '../../assets/images/dog-cat-eat.jpg';
import './navbar.scss';
import { useSelector, useDispatch } from 'react-redux';
import { setLogin } from '../../actions/user';
import product7 from '../../assets/images/product7.jpg';
import { deleteProductToCart } from '../../actions/cart';
import { addValueSearch } from '../../actions/searchProduct';

const navbarList = [
	{
		path: '/',
		icon: 'fa-solid fa-house',
	},
	{
		path: '/cart',
		icon: 'fa-solid fa-cart-shopping',
	},
	{
		path: '/profile',
		icon: 'fa-solid fa-user',
	},
];

function NavBar(props) {
	const { status } = props;
	const user = useSelector((state) => state.user);
	const { username } = user;

	const [valueInputSearch, setValueInputSearch] = useState('');

	const listProductToBuy = useSelector((state) => state.cart);

	const [isActive, setIsActive] = useState(0);
	const [hiddenSetting, setHiddenSetting] = useState(false);
	const dispatch = useDispatch();

	// const handleActiveIcon = (item) => {
	// 	setIsActive(item);
	// };

	const handleLogoutUser = () => {
		dispatch(setLogin(false));
		localStorage.removeItem('user_login');
	};

	const handleHiddenSetting = (e, nameMove) => {
		if (nameMove === 'home') {
			setHiddenSetting(false);
		} else {
			setHiddenSetting(!hiddenSetting);
		}
	};

	const handleDeleteItemProduct = (index) => {
		dispatch(deleteProductToCart(index));
	};

	const handleValueInputSearch = (e) => {
		setValueInputSearch(e.target.value);
		dispatch(addValueSearch(e.target.value));
	};
	// console.log({ valueInputSearch });

	return status ? (
		<div className="nav-bar">
			<div className="nav-wrap">
				<div className="nav-logo">
					<Link
						to="/"
						onClick={(e) => handleHiddenSetting(e, 'home')}
					>
						<img src={logo} alt="" className="logo-image" />
					</Link>
				</div>
				<div className="nav-search">
					<input
						type="text"
						name=""
						id=""
						className="search-input"
						placeholder="T??m ki???m..."
						value={valueInputSearch}
						onChange={handleValueInputSearch}
					/>
					<i className="fa-solid fa-magnifying-glass search-icon"></i>
				</div>

				<div className="nav-user">
					<div className="user-cart">
						<Link to="/cart">
							<i className="fa-solid fa-cart-shopping cart-icon"></i>
						</Link>
						<span className="cart-number">
							{listProductToBuy.reduce((amount, item) => {
								return amount + item.quantityToBuy;
							}, 0)}
						</span>
						<div className="cart-list-to-buy">
							<div className="buy-header">S???n ph???m ???? th??m </div>
							<div className="buy-container">
								{listProductToBuy.map(
									(itemProduct, indexProduct) => {
										const {
											title,
											idCategory,
											price,
											quantityToBuy,
											imageProduct,
											index,
										} = itemProduct;
										return (
											<div
												className="buy-item"
												key={indexProduct}
											>
												<div className="item-img">
													{product7 && (
														<img
															src={imageProduct}
															alt=""
															width="40"
														/>
													)}
												</div>
												<div className="item-name">
													<p className="name-product">
														{title}
													</p>
													<p className="name-category">
														Ph??n lo???i h??ng:{' '}
														{
															idCategory.nameCategory
														}
													</p>
												</div>
												<div className="item-quantity">
													<p className="item-price">
														<span>
															{price
																.toString()
																.replace(
																	/\B(?=(\d{3})+(?!\d))/g,
																	'.'
																)}{' '}
															???{' '}
														</span>{' '}
														x {quantityToBuy}
													</p>
													<p
														className="item-delete"
														onClick={() =>
															handleDeleteItemProduct(
																index
															)
														}
													>
														X??a
													</p>
												</div>
											</div>
										);
									}
								)}
							</div>
							<div className="go-to-cart-wrap">
								<Link to="/cart" className="go-to-cart">
									Xem gi??? h??ng
								</Link>
							</div>
						</div>
					</div>
					<div
						className="user-info"
						onClick={(e) => handleHiddenSetting(e)}
					>
						<img
							src={userImg}
							alt=""
							width="80"
							className="user-img"
						/>
						<p className="user-name">{username}</p>
					</div>

					<div
						className={`user-setting ${
							hiddenSetting ? 'active' : ''
						}`}
					>
						<div className="setting-item">
							<Link
								to="/profile"
								onClick={handleHiddenSetting}
								className="user-profile"
							>
								H??? s??
							</Link>
						</div>
						<div className="setting-item">
							<Link
								to="/login"
								className="user-logout"
								onClick={handleLogoutUser}
							>
								????ng xu???t
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	) : (
		<>
			<div className="nav-bar">
				<div className="nav-wrap">
					<div className="nav-logo">
						<Link
							to="/"
							onClick={(e) => handleHiddenSetting(e, 'home')}
						>
							<img src={logo} alt="" className="logo-image" />
						</Link>
					</div>

					<div className="nav-user">
						<div
							className="user-info"
							onClick={(e) => handleHiddenSetting(e)}
						>
							<img
								src={userImg}
								alt=""
								width="80"
								className="user-img"
							/>
							<p className="user-name">{username}</p>

							<div
								className="user-logout"
								style={{ color: 'white' }}
								onClick={handleLogoutUser}
							>
								<i className="fa-solid fa-arrow-right-from-bracket"></i>
							</div>
						</div>

						{/* <div
							className={`user-setting ${
								hiddenSetting ? 'active' : ''
							}`}
						>
							<div className="setting-item">
								<Link
									to="/profile"
									onClick={handleHiddenSetting}
									className="user-profile"
								>
									H??? s??
								</Link>
							</div>
							<div className="setting-item">
								<Link
									to="/login"
									className="user-logout"
									onClick={handleLogoutUser}
								>
									????ng xu???t
								</Link>
							</div>
						</div> */}
					</div>
				</div>
			</div>
		</>
	);
}

NavBar.propTypes = {};

export default NavBar;
