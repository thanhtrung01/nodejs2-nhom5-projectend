import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import userApi from '../../api/userApi';
import { useDispatch } from 'react-redux';
import { signInUser } from '../../actions/user';
import { toast } from 'react-toastify';

function SignIn(props) {
	const { handleChangeForm } = props;
	const dispatch = useDispatch();
	const [objUser, setObjUser] = useState({
		email: '',
		password: '',
	});
	const [validName, setValidName] = useState(false);
	// const [userLogin, setUserLogin] = useState({});
	const [validPassword, setValidPassword] = useState(false);
	const [foundUser, setFoundUser] = useState(true);
	const [isHiddenPassword, setIsHiddenPassword] = useState(false);

	const checkFieldUser = () => {
		let isValid = true;
		const arrNumberValid = [];

		const arrValidateUser = ['email', 'password'];
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
		setFoundUser(true);
		if (fieldInput === 'email') {
			setValidName(false);

			setObjUser((prev) => ({
				...prev,
				email: e.target.value,
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
		const validUser = checkFieldUser();
		if (validUser.isValid) {
			// console.log('submit value form đăng nhập', objUser);
			// login
			loginUserHome();
			toast('Đăng nhập thành công');
		} else {
			if (!validUser.arrNumberValid[0]) {
				setValidName(true);
			}
			if (validUser.arrNumberValid.includes(1)) {
				setValidPassword(true);
			}
		}
	};

	const loginUserHome = async () => {
		try {
			const newObjUser = { ...objUser };
			console.log({ newObjUser });
			const response = await userApi.loginUser({
				...newObjUser,
			});
			console.log('Sign in user', response);

			localStorage.setItem(
				'user_login',
				JSON.stringify({ ...response.user, isLogin: true })
			);
			dispatch(signInUser({ ...response.user, isLogin: true }));
		} catch (error) {
			console.log('Faild to login user: ', error);
			setFoundUser(false);
		}
	};

	const userLocalStorage =
		JSON.parse(localStorage.getItem('user_login')) || '';

	useEffect(() => {
		const handleRefreshPage = () => {
			if (userLocalStorage.email) {
				// console.log('dispatch');
				dispatch(signInUser(userLocalStorage));
			} else {
				console.log('not dispatch');
			}
		};

		handleRefreshPage();
	}, [userLocalStorage, dispatch]);

	const handleHiddenPassword = (e) => {
		setIsHiddenPassword(!isHiddenPassword);
	};
	// console.log(userLogin);

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
						value={objUser.email}
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
					{foundUser ? (
						''
					) : (
						<p className="input-valid">
							Không tìm thấy tài khoản của bạn
						</p>
					)}
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
