import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './product-item.scss';

function ProductItem(props) {
	const { title, description, price, priceOld, imageUrl, quantity } = props;

	// const [hiddenOrder, setHiddenOrder] = useState(false)

	return (
		<div className="product-item">
			<Link className="link-item" to={`/detail-product/1`}>
				<div className="product-img">
					<img src={imageUrl} alt="" />
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
						<div className="price-display">{price}.000 ₫</div>
						<div className="price-discount">-43%</div>
					</div>
				</div>
			</Link>
			<p className="product-order">Đặt mua sản phẩm</p>
		</div>
	);
}

ProductItem.propTypes = {};

export default ProductItem;
