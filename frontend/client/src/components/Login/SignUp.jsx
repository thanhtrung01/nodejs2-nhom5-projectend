import React, { useState } from 'react';
import PropTypes from 'prop-types';

function SignUp(props) {
	const { handleChangeForm } = props;
	const [objSignUpUser, setObjSignUpUser] = useState({
		email: '',
		name: '',
		password: '',
		passwordAgain: '',
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
			case 'name':
				setValidName(false);
				setObjSignUpUser({
					...objSignUpUser,
					name: e.target.value,
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
	console.log('Current Obj', objSignUpUser);

	const checkFieldUser = (email, name, password, passwordAgain) => {
		let isValid = true;
		const arrNumberValid = [];

		const arrValidateUser = ['email', 'name', 'password', 'passwordAgain'];
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
			objSignUpUser.name,
			objSignUpUser.password
		);
		if (validUser.isValid) {
			console.log('submit value form đăng kí', objSignUpUser);
		} else {
			if (validUser.arrNumberValid.includes(0)) {
				console.log('invalid Email');
				setValidEmail(true);
				// setValidName(true);
			}
			if (validUser.arrNumberValid.includes(1)) {
				// console.log('invalid name');
				setValidName(true);
			}
			if (validUser.arrNumberValid.includes(2)) {
				// 	console.log('invalid password');
				setValidPassword(true);
			}
			if (validUser.arrNumberValid.includes(3)) {
				// console.log('invalid passwordAgain');
				setValidPasswordAgain(true);
			}
		}
	};

	return (
		<div className="sign-in">
			<h2 className="title">Đăng kí</h2>
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
						<p className="input-valid">Vui lòng nhập trường này</p>
					) : (
						''
					)}
					<i className="fa-solid fa-envelope form-icon"></i>
				</div>
				<div className="form-input">
					<label htmlFor="input-name" className="input-name">
						Tên đăng nhập:
					</label>
					<input
						className="input-text"
						type="text"
						id="input-name"
						placeholder="Tên đăng nhập"
						value={objSignUpUser.name}
						onChange={(e) => handleValueUser(e, 'name')}
					/>
					{validName ? (
						<p className="input-valid">Vui lòng nhập trường này</p>
					) : (
						''
					)}
					<i className="fa-solid fa-user form-icon"></i>
				</div>
				<div className="form-input">
					<label htmlFor="input-name" className="input-name">
						Mật khẩu:
					</label>
					<input
						className="input-text"
						type={isHiddenPassword ? 'text' : 'password'}
						id="input-name"
						placeholder="Mật khẩu"
						value={objSignUpUser.password}
						onChange={(e) => handleValueUser(e, 'password')}
					/>
					{validPassword ? (
						<p className="input-valid">Vui lòng nhập trường này</p>
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
						Nhập lại mật khẩu:
					</label>
					<input
						className="input-text"
						type={isHiddenPasswordAgain ? 'text' : 'password'}
						id="input-name"
						placeholder="Nhập lại mật khẩu"
						value={objSignUpUser.passwordAgain}
						onChange={(e) => handleValueUser(e, 'passwordAgain')}
					/>
					{validPasswordAgain ? (
						<p className="input-valid">Vui lòng nhập trường này</p>
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
						Đăng nhập
					</span>
				</div>
				<button className="btn-submit" onClick={handleSignUpUser}>
					Đăng kí
				</button>
			</form>
		</div>
	);
}

SignUp.propTypes = {};

export default SignUp;
