import React, { useEffect, useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './admin.scss';
import userApi from '../../api/userApi';
import userImg from '../../assets/images/dog-cat-eat.jpg';

function Admin(props) {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const getAllUserApi = async () => {
			try {
				const response = await userApi.getAll();
				console.log('response in Admin', response);
				// setUsers(response.products);
				// dispatch(addProduct(response.products));
			} catch (error) {
				console.log('Faild to fetch user list: ', error);
			}
		};
		getAllUserApi();
	}, []);

	return (
		<div className="admin">
			<table class="table table-hover">
				<thead>
					<tr>
						<th>Name</th>
						<th>Role</th>
						<th>Order</th>
					</tr>
				</thead>
				<tbody>
					<tr className="user-item">
						<td className="user-info">
							<div className="user-image">
								<img src={userImg} alt="" />
							</div>
							<div className="user-detail">
								<div className="user-name">Doe</div>
								<div className="user-email">doe@gmail.com</div>
							</div>
						</td>
						<td>User</td>
						<td>
							<p>Order Id</p>
							<div>
								<p>name product</p>
								<p>quantity</p>
							</div>
							<p>Total price</p>
							<p>Delivery status</p>
						</td>
					</tr>
					<tr className="user-item">
						<td className="user-info">
							<div className="user-image">
								<img src={userImg} alt="" />
							</div>
							<div className="user-detail">
								<div className="user-name">Doe</div>
								<div className="user-email">doe@gmail.com</div>
							</div>
						</td>
						<td>User</td>
						<td>
							<p>Order Id</p>
							<div>
								<p>name product</p>
								<p>quantity</p>
							</div>
							<p>Total price</p>
							<p>Delivery status</p>
						</td>
					</tr>
					{/* <tr>
						<td>Mary</td>
						<td>Moe</td>
						<td>mary@example.com</td>
					</tr>
					<tr>
						<td>July</td>
						<td>Dooley</td>
						<td>july@example.com</td>
					</tr> */}
				</tbody>
			</table>
		</div>
	);
}

Admin.propTypes = {};

export default Admin;
