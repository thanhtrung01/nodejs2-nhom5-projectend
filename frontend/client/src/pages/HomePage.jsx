import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Cart from './Cart';
import Profile from './Profile';

function HomePage(props) {
	return (
		<div>
			Hello home
			<Link to="/detail-product">Detail product</Link>
		</div>
	);
}

HomePage.propTypes = {};

export default HomePage;
