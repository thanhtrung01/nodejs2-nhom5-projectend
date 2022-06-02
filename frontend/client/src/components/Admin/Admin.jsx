import React, { useEffect, useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './admin.scss';
import userApi from '../../api/userApi';
import userImg from '../../assets/images/dog-cat-eat.jpg';
import productApi from '../../api/productApi';
import CartContent from '../Cart/CartContent';

function Admin(props) {
	const [users, setUsers] = useState([]);
	const [orders, setOrders] = useState([]);
	const [listProducts, setListProducts] = useState([]);
	const [isShowUsers, setIsShowUsers] = useState(false);

	useEffect(() => {
		const getAllUserApi = async () => {
			try {
				const response = await userApi.getAll();
				setUsers(response.users);
			} catch (error) {
				console.log('Failed to fetch user list: ', error);
			}
		};

		getAllUserApi();
	}, []);

	useEffect(() => {
		const getAllOrders = async () => {
			try {
				const response = await productApi.getAllOrders();
				console.log('response orders in Admin', response.orders);
				setOrders(response.orders);
				// console.log('response orders in Admin', response.orders);
			} catch (e) {
				console.log('Failed to fetch order list: ', e);
			}
		};
		getAllOrders();
	}, []);

	useEffect(() => {
		const getAllProducts = async () => {
			try {
				const response = await productApi.getAll();
				console.log('response', response.products);
				setListProducts(response.products);
			} catch (e) {
				console.log('failed to get all products', e);
			}
		};
		getAllProducts();
	}, []);

	const show = () => {
		const newUsers = [...users];
		const listIsOrders = users.map((user, index) => {
			return orders.some((itemOrder, index) => {
				return itemOrder.user.email === user.email;
			});
		});

		let number = 0;
		listIsOrders.forEach((trueOrder, index) => {
			if (trueOrder) {
				newUsers[index].orders = orders[number].orderItems;
				number++;
			}
		});
		setUsers(newUsers);
	};

	console.log('users', users);

	const handleShowUsers = (showElement) => {
		if (showElement === 'users') {
			setIsShowUsers(true);
			show();
		} else {
			setIsShowUsers(false);
		}
	};

	return (
		<div className="admin">
			<div className="header">
				<button
					className="show create-new-product"
					onClick={() => handleShowUsers('product')}
				>
					Sản phẩm
				</button>
				<button
					className="show"
					onClick={() => handleShowUsers('users')}
				>
					Users
				</button>
			</div>
			{isShowUsers ? (
				<table class="table table-hover">
					<thead>
						<tr>
							<th>Name</th>
							<th>Role</th>
							<th>Phone</th>
							<th>Order</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user, index) => {
							return (
								<tr className="user-item" key={index}>
									<td className="user-info">
										<div className="user-image">
											<img src={userImg} alt="" />
										</div>
										<div className="user-detail">
											<div className="user-name">
												{user.username}
											</div>
											<div className="user-email">
												{user.email}
											</div>
										</div>
									</td>
									<td>{user.isAdmin ? 'Admin' : 'User'}</td>
									<td>{user.phone ? user.phone : 'none'}</td>
									<td style={{ width: '380px' }}>
										{user.orders &&
											user.orders.map((order, index) => {
												return (
													<div key={index}>
														<span>
															{
																order.product
																	.title
															}
														</span>
														<span
															style={{
																marginLeft:
																	'10px',
																color: '#e89f90',
															}}
														>
															Số lượng:{' '}
															{order.qty}
														</span>
													</div>
												);
											})}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			) : (
				<div className="admin-product">
					<div className="cart-container">
						<div className="cart-content">
							<div className="admin-product-header">
								<div className="header-name-product">
									Tên sản phẩm
								</div>
								<div className="header-name-category">
									Loại sản phẩm
								</div>
								<div className="header-name-price">Giá</div>
								<div className="header-name-quantity">
									Số lượng
								</div>
								<div className="header-name-operate">
									Thao tác
								</div>
							</div>
							<CartContent
								productToBuy={listProducts}
								isQuantity={true}
							/>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

Admin.propTypes = {};

export default Admin;
