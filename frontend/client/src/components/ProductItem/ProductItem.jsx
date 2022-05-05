import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './product-item.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCart, updateProductToCart } from '../../actions/cart';

function ProductItem(props) {
	const {
		index,
		title,
		description,
		price,
		priceOld,
		imageProduct,
		quantity,
	} = props;

	const dispatch = useDispatch();

	// const [hiddenOrder, setHiddenOrder] = useState(false)

	const productToBuy = useSelector((state) => state.cart);
	// console.log('productToBuy In ProductItem', productToBuy);

	const priceHadConvert = price
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

	const handleOrderProduct = () => {
		console.log('123', props);

		const productInCart = productToBuy.find((item, index) => {
			return item.code === props.code;
		});

		console.log('productInCart', productInCart);
		if (productInCart) {
			dispatch(updateProductToCart(productInCart.index));
		} else {
			dispatch(addProductToCart({ ...props, quantityToBuy: 1 }));
		}
	};

	return (
		<div className="product-item">
			<Link className="link-item" to={`/detail-product/1`}>
				<div className="product-img">
					<img src={imageProduct} alt="" />
				</div>
				<div className="product-content">
					<div className="product-title">
						<p>{title}</p>
					</div>
					<div className="product-review">
						<div className="review-list">
							<i className="fa-solid fa-star review-icon"></i>
							<i className="fa-solid fa-star review-icon"></i>
							<i className="fa-solid fa-star review-icon"></i>
							<i className="fa-solid fa-star review-icon"></i>
							<i className="fa-solid fa-star review-icon"></i>
						</div>
						<div className="review-bought">Đã bán 1000+</div>
					</div>

					<div className="product-price">
						<div className="price-display">{priceHadConvert} ₫</div>
						<div className="price-discount">-43%</div>
					</div>
				</div>
			</Link>
			<p className="product-order" onClick={handleOrderProduct}>
				Đặt mua sản phẩm
			</p>
		</div>
	);
}

ProductItem.propTypes = {};

export default ProductItem;
