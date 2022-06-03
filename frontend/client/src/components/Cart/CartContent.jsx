import React from 'react';
import PropTypes from 'prop-types';
import product6 from '../../assets/images/product6.jpg';
import { useDispatch } from 'react-redux';
import {
	addProductToCart,
	reduceProductToCart,
	updateProductToCart,
	deleteProductToCart,
} from '../../actions/cart';
import productApi from '../../api/productApi';

function CartContent(props) {
	const {
		productToBuy,
		isQuantity,
		isDeleteProduct,
		handleDeleteProductById,
	} = props;
	const dispatch = useDispatch();

	// console.log('productToBuy', productToBuy);

	const handleRiseQuantity = (index) => {
		dispatch(updateProductToCart(index));
	};

	const handleReduceQuantity = (index) => {
		console.log('reduce');
		dispatch(reduceProductToCart(index));
	};

	const handleDeleteItem = (index) => {
		console.log('index', index);
		dispatch(deleteProductToCart(index));
	};

	const handleDeleteProductFromAdmin = (id) => {
		console.log('delete product by id', id);
		// const resDeleteProduct = await productApi.deleteProduct(id);
		handleDeleteProductById(id);
	};

	return (
		<div className="cart-content-wrap">
			{productToBuy.map((item, indexItem) => {
				const {
					_id,
					imageProduct,
					title,
					price,
					quantityToBuy,
					index,
					quantity,
				} = item;
				return (
					<div className="cart-item-to-buy" key={indexItem}>
						<div className="item-image">
							<img
								className="product-image"
								width="80"
								src={imageProduct}
								alt=""
							/>
							<p className="product-title">{title}</p>
							<p className="product-category">
								Phân loại hàng: {item.idCategory.nameCategory}
								{/* Phân loại hàng: fake */}
							</p>
						</div>
						<div className="item-info">
							<div className="item-wrap">
								<div className="item-price item-info-detail">
									₫
									{price
										.toString()
										.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
								</div>
							</div>
							{isQuantity ? (
								<div className="quantity-product-admin">
									{quantity}
								</div>
							) : (
								<div className="item-wrap">
									<div className="item-quantity item-info-detail">
										<button
											onClick={() =>
												handleReduceQuantity(index)
											}
										>
											-
										</button>
										<input
											className="quantity-input"
											type="text"
											value={quantityToBuy}
										/>
										<button
											onClick={() =>
												handleRiseQuantity(index)
											}
										>
											+
										</button>
									</div>
								</div>
							)}
							{isQuantity ? (
								<></>
							) : (
								<div className="item-wrap">
									<div className="item-totalPrice item-info-detail">
										₫
										{(quantityToBuy * price)
											.toString()
											.replace(
												/\B(?=(\d{3})+(?!\d))/g,
												'.'
											)}
									</div>
								</div>
							)}
							<div className="item-wrap">
								{isDeleteProduct ? (
									<div
										className="item-delete item-info-detail"
										onClick={() =>
											handleDeleteProductFromAdmin(_id)
										}
									>
										Xóa
									</div>
								) : (
									<div
										className="item-delete item-info-detail"
										onClick={() => handleDeleteItem(index)}
									>
										Xóa
									</div>
								)}
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}

CartContent.propTypes = {};

export default CartContent;
