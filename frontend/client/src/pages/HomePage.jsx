import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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
