import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.jpg';
import userImg from '../../assets/images/dog-cat-eat.jpg';
import './navbar.scss';
import { useSelector, useDispatch } from 'react-redux';
import { setLogin } from '../../actions/user';

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

	const listProductToBuy = useSelector((state) => state.cart);
	const [productToBuy1, productToBuy2] = listProductToBuy;
	const { imageUrl, title, category, quantityToBuy, price } = productToBuy1;

	const [isActive, setIsActive] = useState(0);
	const [hiddenSetting, setHiddenSetting] = useState(false);
	const dispatch = useDispatch();

	const handleActiveIcon = (item) => {
		setIsActive(item);
	};

	const handleLogoutUser = () => {
		dispatch(setLogin(false));
		// localStorage.removeItem('user');
	};

	const handleHiddenSetting = (e, nameMove) => {
		if (nameMove === 'home') {
			setHiddenSetting(false);
		} else {
			setHiddenSetting(!hiddenSetting);
		}
		// if (e.type === 'mouseover') {
		// 	setHiddenSetting(true);
		// } else {
		// 	setHiddenSetting(false);
		// }
	};

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
						placeholder="Tìm kiếm..."
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
							<div className="buy-header">Sản phẩm đã thêm </div>
							<div className="buy-container">
								<div className="buy-item">
									<div className="item-img">
										<img src={imageUrl} alt="" width="40" />
									</div>
									<div className="item-name">
										<p className="name-product">
											Giày Jordan 1 High Panda, Giày Thể
											Thao JD1 Cao Cổ Màu Đen, Da Bò Cao
											Cấp Full Size Nam Nữ | JDD002
										</p>
										<p className="name-category">
											Phân loại hàng: Bạc
										</p>
									</div>
									<div className="item-quantity">
										<p className="item-price">
											<span>90.000 ₫ </span> x 1
										</p>
										<p className="item-delete">Xóa</p>
									</div>
								</div>
								<div className="buy-item">
									<div className="item-img">
										<img src={imageUrl} alt="" width="40" />
									</div>
									<div className="item-name">
										<p className="name-product">
											Giày Jordan 1 High Panda, Giày Thể
											Thao JD1 Cao Cổ Màu Đen, Da Bò Cao
											Cấp Full Size Nam Nữ | JDD002
										</p>
										<p className="name-category">
											Phân loại hàng: Bạc
										</p>
									</div>
									<div className="item-quantity">
										<p className="item-price">
											<span>90.000 ₫ </span> x 1
										</p>
										<p className="item-delete">Xóa</p>
									</div>
								</div>
								<div className="buy-item">
									<div className="item-img">
										<img src={imageUrl} alt="" width="40" />
									</div>
									<div className="item-name">
										<p className="name-product">
											Giày Jordan 1 High Panda, Giày Thể
											Thao JD1 Cao Cổ Màu Đen, Da Bò Cao
											Cấp Full Size Nam Nữ | JDD002
										</p>
										<p className="name-category">
											Phân loại hàng: Bạc
										</p>
									</div>
									<div className="item-quantity">
										<p className="item-price">
											<span>90.000 ₫ </span> x 1
										</p>
										<p className="item-delete">Xóa</p>
									</div>
								</div>
								<div className="buy-item">
									<div className="item-img">
										<img src={imageUrl} alt="" width="40" />
									</div>
									<div className="item-name">
										<p className="name-product">
											Giày Jordan 1 High Panda, Giày Thể
											Thao JD1 Cao Cổ Màu Đen, Da Bò Cao
											Cấp Full Size Nam Nữ | JDD002
										</p>
										<p className="name-category">
											Phân loại hàng: Bạc
										</p>
									</div>
									<div className="item-quantity">
										<p className="item-price">
											<span>90.000 ₫ </span> x 1
										</p>
										<p className="item-delete">Xóa</p>
									</div>
								</div>
							</div>
							<div className="go-to-cart-wrap">
								<Link to="/cart" className="go-to-cart">
									Xem giỏ hàng
								</Link>
							</div>
						</div>
					</div>
					<div
						className="user-info"
						onClick={(e) => handleHiddenSetting(e)}
						// onMouseOver={(e) => handleHiddenSetting(e)}
						// onMouseLeave={(e) => handleHiddenSetting(e)}
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
								Hồ sơ
							</Link>
						</div>
						<div className="setting-item">
							<Link
								to="/login"
								className="user-logout"
								onClick={handleLogoutUser}
							>
								Đăng xuất
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	) : (
		<></>
	);
}

NavBar.propTypes = {};

export default NavBar;
