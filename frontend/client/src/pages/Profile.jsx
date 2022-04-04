import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

function Profile(props) {
	const value = useSelector((state) => state.product);
	console.log('value', value);

	return <div>Profile</div>;
}

Profile.propTypes = {};

export default Profile;
