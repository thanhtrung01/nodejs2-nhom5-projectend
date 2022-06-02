import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './profile.scss';
import { useDispatch, useSelector } from 'react-redux';
import userApi from '../../api/userApi';
import { signInUser } from '../../actions/user';

function Profile(props) {
	const dispatch = useDispatch();

	const user = useSelector((state) => state.user);
	const { username, email, phone, _id } = user;
	const [isEdit, setIsEdit] = useState(false);

	const [userNameInput, setUserNameInput] = useState(username);
	const [phoneInput, setPhoneInput] = useState(phone || '');

	const handleEditUserInProfile = async (e) => {
		e.preventDefault();
		setIsEdit(!isEdit);

		// handle when click edit button
		if (isEdit) {
			console.log('userNameInput', userNameInput);
			console.log('phoneInput', phoneInput);

			const newUserAfterEdit = await userApi.editUserPut(_id, {
				username: userNameInput,
				phone: phoneInput,
			});
			console.log('newUserAfterEdit', newUserAfterEdit.user);
			dispatch(signInUser(newUserAfterEdit.user));
		}
	};
	console.log('phone user', phone);

	const handleValueNameInputProfile = (e) => {
		setUserNameInput(e.target.value);
	};

	const handleValuePhoneInputProfile = (e) => {
		setPhoneInput(e.target.value);
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
							onChange={handleValueNameInputProfile}
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
					<div
						className={
							isEdit
								? 'profile-name'
								: 'profile-name profile-item'
						}
					>
						<label>Phone</label>
						<input
							disabled={!isEdit}
							type="text"
							value={phoneInput}
							onChange={handleValuePhoneInputProfile}
						/>
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
