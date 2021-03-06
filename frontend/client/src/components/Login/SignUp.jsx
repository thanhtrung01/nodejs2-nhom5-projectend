import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import userApi from '../../api/userApi';
import { useDispatch } from 'react-redux';
import { createUser } from '../../actions/user';
import { toast } from 'react-toastify';

function SignUp(props) {
	const { handleChangeForm } = props;
	const dispatch = useDispatch();

	const [objSignUpUser, setObjSignUpUser] = useState({
		email: '',
		username: '',
		password: '',
		passwordAgain: '',
		isAdmin: false,
	});
	const [validEmail, setValidEmail] = useState(false);
	const [validName, setValidName] = useState(false);
	const [validPassword, setValidPassword] = useState(false);
	const [validPasswordAgain, setValidPasswordAgain] = useState(false);

	const [isHiddenPassword, setIsHiddenPassword] = useState(false);
	const [isHiddenPasswordAgain, setIsHiddenPasswordAgain] = useState(false);

	const handleHiddenPassword = (e) => {
		setIsHiddenPassword(!isHiddenPassword);
	};

	const handleHiddenPasswordAgain = (e) => {
		setIsHiddenPasswordAgain(!isHiddenPasswordAgain);
	};

	const handleValueUser = (e, filed) => {
		switch (filed) {
			case 'email':
				setValidEmail(false);
				setObjSignUpUser({
					...objSignUpUser,
					email: e.target.value,
				});
				break;
			case 'username':
				setValidName(false);
				setObjSignUpUser({
					...objSignUpUser,
					username: e.target.value,
				});
				break;
			case 'password':
				setValidPassword(false);
				setObjSignUpUser({
					...objSignUpUser,
					password: e.target.value,
				});
				break;
			case 'passwordAgain':
				setValidPasswordAgain(false);
				setObjSignUpUser({
					...objSignUpUser,
					passwordAgain: e.target.value,
				});
				break;
			default:
				console.log('err');
		}
	};
	// console.log('Current Obj', objSignUpUser);

	const checkFieldUser = (email, username, password, passwordAgain) => {
		let isValid = true;
		const arrNumberValid = [];

		const arrValidateUser = [
			'email',
			'username',
			'password',
			'passwordAgain',
		];
		for (let i = 0; i < arrValidateUser.length; i++) {
			if (!objSignUpUser[arrValidateUser[i]]) {
				isValid = false;
				arrNumberValid.push(i);
				console.log('Missing required field', i);
			}
		}
		// console.log('arrNumberValid', arrNumberValid);
		return {
			arrNumberValid,
			isValid,
		};
	};

	const handleSignUpUser = (e) => {
		e.preventDefault();
		const validUser = checkFieldUser(
			objSignUpUser.username,
			objSignUpUser.password
		);
		if (validUser.isValid) {
			console.log('????ng nh???p t??? sign up');
			fetchUserList();
			console.log('objSignUpUser', objSignUpUser);

			dispatch(createUser(objSignUpUser));

			// reset form
			setObjSignUpUser({
				email: '',
				username: '',
				password: '',
				passwordAgain: '',
			});
			toast('????ng k?? th??nh c??ng');
		} else {
			if (validUser.arrNumberValid.includes(0)) {
				console.log('invalid Email');
				setValidEmail(true);
			}
			if (validUser.arrNumberValid.includes(1)) {
				setValidName(true);
			}
			if (validUser.arrNumberValid.includes(2)) {
				setValidPassword(true);
			}
			if (validUser.arrNumberValid.includes(3)) {
				setValidPasswordAgain(true);
			}
		}
	};

	const fetchUserList = async () => {
		console.log('???? ch???y v??o fetchUserList');
		try {
			console.log('ch???y v??o t???o user d?????i db');
			const newObjUser = { ...objSignUpUser };
			console.log('newObjUser before save db', newObjUser);
			delete newObjUser.passwordAgain;
			const response = await userApi.createUser({
				...newObjUser,
			});
			console.log('response');
			console.log('response', response);
		} catch (error) {
			console.log('Faild to fetch user list: ', error);
		}
	};

	return (
		<div className="sign-in">
			<h2 className="title">????ng k??</h2>
			<form action="" className="form-in">
				<div className="form-input">
					<label htmlFor="input-name" className="input-name">
						Email:
					</label>
					<input
						className="input-text"
						type="text"
						id="input-name"
						placeholder="Email"
						value={objSignUpUser.email}
						onChange={(e) => handleValueUser(e, 'email')}
					/>
					{validEmail ? (
						<p className="input-valid">Vui l??ng nh???p tr?????ng n??y</p>
					) : (
						''
					)}
					<i className="fa-solid fa-envelope form-icon"></i>
				</div>
				<div className="form-input">
					<label htmlFor="input-name" className="input-name">
						Username
					</label>
					<input
						className="input-text"
						type="text"
						id="input-name"
						placeholder="Username"
						value={objSignUpUser.username}
						onChange={(e) => handleValueUser(e, 'username')}
					/>
					{validName ? (
						<p className="input-valid">Vui l??ng nh???p tr?????ng n??y</p>
					) : (
						''
					)}
					<i className="fa-solid fa-user form-icon"></i>
				</div>
				<div className="form-input">
					<label htmlFor="input-name" className="input-name">
						M???t kh???u:
					</label>
					<input
						className="input-text"
						type={isHiddenPassword ? 'text' : 'password'}
						id="input-name"
						placeholder="M???t kh???u"
						value={objSignUpUser.password}
						onChange={(e) => handleValueUser(e, 'password')}
					/>
					{validPassword ? (
						<p className="input-valid">Vui l??ng nh???p tr?????ng n??y</p>
					) : (
						''
					)}
					{isHiddenPassword ? (
						<i
							className="fa-solid fa-eye hidden-input"
							onClick={handleHiddenPassword}
						></i>
					) : (
						<i
							className="fa-solid fa-eye-slash hidden-input"
							onClick={handleHiddenPassword}
						></i>
					)}
					<i className="fa-solid fa-key form-icon"></i>
				</div>
				<div className="form-input">
					<label htmlFor="input-name" className="input-name">
						Nh???p l???i m???t kh???u:
					</label>
					<input
						className="input-text"
						type={isHiddenPasswordAgain ? 'text' : 'password'}
						id="input-name"
						placeholder="Nh???p l???i m???t kh???u"
						value={objSignUpUser.passwordAgain}
						onChange={(e) => handleValueUser(e, 'passwordAgain')}
					/>
					{validPasswordAgain ? (
						<p className="input-valid">Vui l??ng nh???p tr?????ng n??y</p>
					) : (
						''
					)}
					{isHiddenPasswordAgain ? (
						<i
							className="fa-solid fa-eye hidden-input"
							onClick={handleHiddenPasswordAgain}
						></i>
					) : (
						<i
							className="fa-solid fa-eye-slash hidden-input"
							onClick={handleHiddenPasswordAgain}
						></i>
					)}
					<i className="fa-solid fa-key form-icon"></i>
				</div>
				<div className="wrap-text">
					<span onClick={handleChangeForm} className="text-redirect">
						????ng nh???p
					</span>
				</div>
				<button className="btn-submit" onClick={handleSignUpUser}>
					????ng k??
				</button>
			</form>
		</div>
	);
}

SignUp.propTypes = {};

export default SignUp;
