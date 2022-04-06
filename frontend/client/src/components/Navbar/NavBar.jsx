import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.jpg';
import user from '../../assets/images/dog-cat-eat.jpg';
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
	const [isActive, setIsActive] = useState(0);
	const dispatch = useDispatch();

	const handleActiveIcon = (item) => {
		setIsActive(item);
	};

	const handleLogoutUser = () => {
		dispatch(setLogin(false));
	};

	return (
		<div className="nav-bar">
			<div className="nav-wrap">
				<div className="nav-logo">
					<img className="logo-img" src={logo} alt="" width="80" />
					<div className="nav-search">
						<input
							className="search-input"
							type="text"
							placeholder="Tìm kiếm sản phẩm"
						/>
						<i className="fa-solid fa-magnifying-glass search-icon"></i>
					</div>
				</div>
				<div className="nav-list">
					{navbarList.map((item, index) => (
						<Link to={item.path} key={index}>
							<div
								className={`list-item ${
									isActive === index ? 'active' : ''
								}`}
								onClick={() => handleActiveIcon(index)}
							>
								<i className={item.icon}></i>
							</div>
						</Link>
					))}
				</div>
				<div className="nav-user">
					<div className="user-img">
						<img src={user} alt="" />
					</div>
					<div className="user-name">Đặng Thanh Nhựt</div>
					<div className="user-logout" onClick={handleLogoutUser}>
						<Link to="/login">
							<i className="fa-solid fa-right-from-bracket"></i>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

NavBar.propTypes = {};

export default NavBar;
