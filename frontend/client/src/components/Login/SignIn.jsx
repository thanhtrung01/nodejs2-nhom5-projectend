import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

function SignIn(props) {
	const { handleChangeForm } = props;
	const [objUser, setObjUser] = useState({
		name: '',
		password: '',
	});
	const [validName, setValidName] = useState(false);
	const [validPassword, setValidPassword] = useState(false);
	const [isHiddenPassword, setIsHiddenPassword] = useState(false);

	const checkFieldUser = (name, password) => {
		let isValid = true;
		const arrNumberValid = [];

		const arrValidateUser = ['name', 'password'];
		for (let i = 0; i < arrValidateUser.length; i++) {
			if (!objUser[arrValidateUser[i]]) {
				isValid = false;
				arrNumberValid.push(i);
				console.log('Missing required field', i);
			}
		}
		console.log('arrNumberValid', arrNumberValid);
		return {
			arrNumberValid,
			isValid,
		};
	};

	const handleObjUser = (e, fieldInput) => {
		if (fieldInput === 'email') {
			setValidName(false);

			setObjUser((prev) => ({
				...prev,
				name: e.target.value,
			}));
		} else {
			setValidPassword(false);
			setObjUser((prev) => ({
				...prev,
				password: e.target.value,
			}));
		}
	};

	const handleSubmitForm = (e) => {
		e.preventDefault();
		const validUser = checkFieldUser(objUser.name, objUser.password);
		if (validUser.isValid) {
			console.log('submit value form Đăng nhập', objUser);
		} else {
			if (!validUser.arrNumberValid[0]) {
				setValidName(true);
			}
			if (validUser.arrNumberValid.includes(1)) {
				console.log('123');
				setValidPassword(true);
			}
		}
	};

	// console.log('validName', validName);

	const handleHiddenPassword = (e) => {
		setIsHiddenPassword(!isHiddenPassword);
	};

	return (
		<div className="sign-in">
			<h2 className="title">Đăng nhập</h2>
			<form action="" className="form-in">
				<div className="form-input">
					<label htmlFor="input-name" className="input-name">
						Tên đăng nhập:
					</label>
					<input
						className="input-text"
						type="text"
						id="input-name"
						placeholder="Tên đăng nhập"
						value={objUser.name}
						onChange={(e) => handleObjUser(e, 'email')}
					/>
					<i className="fa-solid fa-user form-icon"></i>
					{validName ? (
						<p className="input-valid">Vui lòng nhập trường này</p>
					) : (
						''
					)}
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
						value={objUser.password}
						onChange={(e) => handleObjUser(e, 'password')}
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
				<div className="wrap-text">
					<span onClick={handleChangeForm} className="text-redirect">
						Đăng kí
					</span>
				</div>
				<button
					onClick={handleSubmitForm}
					className="btn-submit"
					type="submit"
				>
					Đăng nhập
				</button>
			</form>
		</div>
	);
}

SignIn.propTypes = {};

export default SignIn;
