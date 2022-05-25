import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './profile.scss';
import { useSelector } from 'react-redux';

function Profile(props) {
	const user = useSelector((state) => state.user);
	const { username, email } = user;
	const [isEdit, setIsEdit] = useState(false);

	const [userNameInput, setUserNameInput] = useState(username);

	const handleEditUserInProfile = (e) => {
		e.preventDefault();
		setIsEdit(!isEdit);

		// handle when click edit button
	};

	const handleValueInputProfile = (e) => {
		setUserNameInput(e.target.value);
	};

	return (
		<div className="profile">
			<div className="profile-wrap">
				<h2 className="profile-setting">Cài đặt</h2>
				<form action="" className="form-profile">
					<h4 className="profile-title">Thông tin cá nhân</h4>
					<div className="line"></div>
					<div
						className={
							isEdit
								? 'profile-name'
								: 'profile-name profile-item'
						}
					>
						<label>Username</label>
						<input
							disabled={!isEdit}
							type="text"
							value={userNameInput}
							onChange={handleValueInputProfile}
						/>
					</div>
					<div className="line"></div>
					<div className="profile-name profile-item">
						<label>Email</label>
						<input disabled type="text" value={email} />
					</div>
					<div className="line"></div>
					<div className="profile-name profile-item">
						<label>Password</label>
						<input disabled type="text" value="**********" />
					</div>
					<div className="line"></div>
					<button
						className="profile-edit"
						onClick={handleEditUserInProfile}
					>
						{isEdit ? 'Save' : 'Edit'}
					</button>
				</form>
			</div>
		</div>
	);
}

Profile.propTypes = {};

export default Profile;
