import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './admin.scss';
import userApi from '../../api/userApi';
import userImg from '../../assets/images/dog-cat-eat.jpg';
import productApi from '../../api/productApi';
import CartContent from '../Cart/CartContent';
import categoryApi from '../../api/categoryApi';
import { toast } from 'react-toastify';

// import imageTest from '../../../../../backend/'

function Admin(props) {
	const [users, setUsers] = useState([]);
	const [orders, setOrders] = useState([]);
	const [listProducts, setListProducts] = useState([]);
	const [isShowUsers, setIsShowUsers] = useState(false);

	const [listCategoryApi, setListCategoryApi] = useState([]);
	const [isUpdateProduct, setIsUpdateProduct] = useState(false);

	const [infoObjProduct, setInfoObjProduct] = useState({
		code: '',
		title: '',
		description: '',
		price: '',
		sale: '',
		slug: '',
		status: '',
		idCategory: '',
		quantity: '',
		imageProduct: '',
	});

	const inputImgElement = useRef();

	const {
		code,
		title,
		description,
		price,
		sale,
		slug,
		status,
		idCategory,
		quantity,
		imageProduct,
	} = infoObjProduct;

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
				// console.log('response orders in Admin', response.orders);
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
				// console.log('response', response.products);
				setListProducts(response.products);
			} catch (e) {
				console.log('failed to get all products', e);
			}
		};
		getAllProducts();
	}, [isUpdateProduct]);

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

	const handleShowUsers = (showElement) => {
		if (showElement === 'users') {
			setIsShowUsers(true);
			show();
		} else {
			setIsShowUsers(false);
		}
	};

	const handleDeleteProductById = async (productId) => {
		const resDeleteProduct = await productApi.deleteProduct(productId);
		setIsUpdateProduct(!isUpdateProduct);
	};

	useEffect(() => {
		const getAllCategories = async () => {
			try {
				const responseCategories = await categoryApi.getAll();
				setListCategoryApi(responseCategories.categories);

				setInfoObjProduct({
					...infoObjProduct,
					idCategory: responseCategories.categories[0]._id,
				});
			} catch (e) {
				console.log('failed to get all categories', e);
			}
		};
		getAllCategories();
	}, []);

	const handleValueProduct = (e, nameInput) => {
		switch (nameInput) {
			case 'code':
				setInfoObjProduct({
					...infoObjProduct,
					code: e.target.value,
				});
				return;
			case 'title':
				setInfoObjProduct({
					...infoObjProduct,
					title: e.target.value,
				});
				return;
			case 'description':
				setInfoObjProduct({
					...infoObjProduct,
					description: e.target.value,
				});
				return;
			case 'price':
				setInfoObjProduct({
					...infoObjProduct,
					price: e.target.value,
				});

				return;
			case 'sale':
				setInfoObjProduct({
					...infoObjProduct,
					sale: e.target.value,
				});
				return;
			case 'slug':
				setInfoObjProduct({
					...infoObjProduct,
					slug: e.target.value,
				});
				return;
			case 'status':
				setInfoObjProduct({
					...infoObjProduct,
					status: e.target.value,
				});
				return;
			case 'category':
				const objCategoryToProduct = listCategoryApi.find(
					(itemCategory, index) => {
						return itemCategory.nameCategory === e.target.value;
					}
				);

				console.log('idCategoryToProduct', objCategoryToProduct);

				setInfoObjProduct({
					...infoObjProduct,
					idCategory: objCategoryToProduct._id,
				});
				return;
			case 'quantity':
				setInfoObjProduct({
					...infoObjProduct,
					quantity: e.target.value,
				});
				return;
			case 'imageProduct':
				setInfoObjProduct({
					...infoObjProduct,
					imageProduct: e.target.files[0],
				});
				return;
			default:
				console.log('Not');
		}

		console.log();
	};

	const handleSubmitInfoProduct = async (e) => {
		e.preventDefault();

		try {
			console.log('infoObjProduct', infoObjProduct);
			const newInfoObjProduct = {
				...infoObjProduct,
				price: +infoObjProduct.price,
			};
			const responseCreateProduct = await productApi.createProduct(
				newInfoObjProduct
			);
			setInfoObjProduct({
				code: '',
				title: '',
				description: '',
				price: '',
				sale: '',
				slug: '',
				status: '',
				idCategory: '',
				quantity: '',
				imageProduct: '',
			});

			inputImgElement.current.value = '';
			setIsUpdateProduct(!isUpdateProduct);
			toast('tạo sản phẩm thành công');
		} catch (error) {
			console.log('error to submit create product', error);
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
				<table className="table table-hover">
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
							<div className="admin-product-create-product">
								Create new product
								<form>
									<div className="form-row">
										<div className="form-group col-md-6">
											<label htmlFor="inputEmail4">
												Code
											</label>
											<input
												type="text"
												className="form-control"
												id="inputEmail4"
												placeholder="Code"
												value={code}
												onChange={(e) =>
													handleValueProduct(
														e,
														'code'
													)
												}
											/>
											{/* <span>
												Vui lòng nhập trường này
											</span> */}
										</div>
										<div className="form-group col-md-6">
											<label htmlFor="inputPassword4">
												Title
											</label>
											<input
												type="text"
												className="form-control"
												id="inputPassword4"
												placeholder="Title"
												value={title}
												onChange={(e) =>
													handleValueProduct(
														e,
														'title'
													)
												}
											/>
										</div>
										<div className="form-group col-md-6">
											<label htmlFor="inputPassword4">
												Description
											</label>
											<input
												type="text"
												className="form-control"
												id="inputPassword4"
												placeholder="Description"
												value={description}
												onChange={(e) =>
													handleValueProduct(
														e,
														'description'
													)
												}
											/>
										</div>
										<div className="form-group col-md-6">
											<label htmlFor="inputPassword4">
												Price
											</label>
											<input
												type="text"
												className="form-control"
												id="inputPassword4"
												placeholder="Price"
												value={price}
												onChange={(e) =>
													handleValueProduct(
														e,
														'price'
													)
												}
											/>
										</div>
										<div className="form-group col-md-6">
											<label htmlFor="inputPassword4">
												Sale
											</label>
											<input
												type="text"
												className="form-control"
												id="inputPassword4"
												placeholder="Sale"
												value={sale}
												onChange={(e) =>
													handleValueProduct(
														e,
														'sale'
													)
												}
											/>
										</div>
										<div className="form-group col-md-6">
											<label htmlFor="inputPassword4">
												Slug
											</label>
											<input
												type="text"
												className="form-control"
												id="inputPassword4"
												placeholder="Slug"
												value={slug}
												onChange={(e) =>
													handleValueProduct(
														e,
														'slug'
													)
												}
											/>
										</div>
										<div className="form-group col-md-6">
											<label htmlFor="inputPassword4">
												Status
											</label>
											<input
												type="text"
												className="form-control"
												id="inputPassword4"
												placeholder="true or false"
												value={status}
												onChange={(e) =>
													handleValueProduct(
														e,
														'status'
													)
												}
											/>
										</div>
										<div className="form-group col-md-6">
											<label htmlFor="inputState">
												Category
											</label>
											<select
												id="inputState"
												className="form-control"
												onChange={(e) =>
													handleValueProduct(
														e,
														'category'
													)
												}
											>
												{listCategoryApi &&
													listCategoryApi.map(
														(
															itemCategory,
															index
														) => (
															<option key={index}>
																{
																	itemCategory.nameCategory
																}
															</option>
														)
													)}
											</select>
										</div>
										<div className="form-group col-md-6">
											<label htmlFor="inputPassword4">
												Quantity
											</label>
											<input
												type="text"
												className="form-control"
												id="inputPassword4"
												placeholder="Quantity"
												value={quantity}
												onChange={(e) =>
													handleValueProduct(
														e,
														'quantity'
													)
												}
											/>
										</div>
										<div className="form-group col-md-6">
											<label htmlFor="inputPassword4">
												Image Product
											</label>
											<input
												type="file"
												className="form-control"
												id="inputPassword4"
												placeholder="Password"
												ref={inputImgElement}
												onChange={(e) =>
													handleValueProduct(
														e,
														'imageProduct'
													)
												}
											/>
										</div>
									</div>

									<button
										type="submit"
										className="btn btn-primary"
										onClick={handleSubmitInfoProduct}
									>
										Create
									</button>
								</form>
							</div>
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
								isDeleteProduct={true}
								handleDeleteProductById={
									handleDeleteProductById
								}
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
