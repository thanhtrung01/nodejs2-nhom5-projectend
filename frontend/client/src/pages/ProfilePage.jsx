import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

function ProfilePage(props) {
	const value = useSelector((state) => state.product);
	console.log('value', value);

	return <div>ProfilePage</div>;
}

ProfilePage.propTypes = {};

export default ProfilePage;
