import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import './detail-product.scss';

import product1 from '../../assets/images/product1.jpg';
import product2 from '../../assets/images/product2.jpg';
import product3 from '../../assets/images/product3.jpg';
import product4 from '../../assets/images/product4.jpg';
import product5 from '../../assets/images/product5.jpg';
import product6 from '../../assets/images/product6.jpg';
import product7 from '../../assets/images/product7.jpg';

import facebook from '../../assets/images/facebook.svg';
import messenger from '../../assets/images/messenger.svg';
import pinterest from '../../assets/images/pinterest.svg';
import twitter from '../../assets/images/twitter.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
	addProductToCart,
	reduceProductToCart,
	updateProductToCart,
} from '../../actions/cart';

import product2Main from '../../assets/images/product2-main.jpg';
import Icon from './Icon';

function DetailProduct(props) {
	const { slug } = useParams();
	const dispatch = useDispatch();
	const [quantityDetailProduct, setQuantityDetailProduct] = useState(1);

	const products = useSelector((state) => state.product);
	const productToBuy = useSelector((state) => state.cart);

	const indexItemProduct = products.findIndex(
		(item, index) => item.slug === slug
	);

	console.log('indexItemProduct', indexItemProduct);

	const itemProduct = products.find((item, index) => item.slug === slug);

	const newItemProduct = { ...itemProduct, index: indexItemProduct };

	console.log('newItemProduct', newItemProduct);

	const { imageProduct, price, title, index } = newItemProduct;

	const handleRiseQuantity = () => {
		setQuantityDetailProduct(quantityDetailProduct + 1);
	};

	const handleReduceQuantity = () => {
		setQuantityDetailProduct(
			quantityDetailProduct - 1 === 0 ? 1 : quantityDetailProduct - 1
		);
	};

	const handleOrderProduct = () => {
		const productInCart = productToBuy.find((item, index) => {
			return item.code === newItemProduct.code;
		});

		console.log('productInCart', productInCart);
		if (productInCart) {
			dispatch(updateProductToCart(productInCart.index));
		} else {
			dispatch(
				addProductToCart({
					...newItemProduct,
					quantityToBuy: quantityDetailProduct,
				})
			);
		}
	};

	return (
		<div className="detail-product">
			<div className="detail-product-wrap">
				<div className="detail-product-left">
					<div className="left-image-main">
						<img src={imageProduct} alt="" width="450" />
					</div>
					<div className="left-image-list">
						<div className="left-image-item active">
							<img src={product1} alt="" width="80" />
						</div>
						<div className="left-image-item">
							<img src={product2} alt="" width="80" />
						</div>
						<div className="left-image-item">
							<img src={product3} alt="" width="80" />
						</div>
						<div className="left-image-item">
							<img src={product4} alt="" width="80" />
						</div>
						<div className="left-image-item">
							<img src={product5} alt="" width="80" />
						</div>
					</div>
					<div className="left-share">
						<div className="share-media">
							<p>Chia s???:</p>
							<div className="media-list">
								<img
									src={messenger}
									alt=""
									className="media-item"
								/>
								<img
									src={facebook}
									alt=""
									className="media-item"
								/>
								<img
									src={pinterest}
									alt=""
									className="media-item"
								/>
								<img
									src={twitter}
									alt=""
									className="media-item"
								/>
							</div>
						</div>
						<div className="left-like">
							<svg width="24" height="20" className="_1Jj7iG">
								<path
									d="M19.469 1.262c-5.284-1.53-7.47 4.142-7.47 4.142S9.815-.269 4.532 1.262C-1.937 3.138.44 13.832 12 19.333c11.559-5.501 13.938-16.195 7.469-18.07z"
									stroke="#FF424F"
									strokeWidth="1.5"
									fill="none"
									fillRule="evenodd"
									strokeLinejoin="round"
								></path>
							</svg>
							<p className="like-number">???? th??ch (2,3k)</p>
						</div>
					</div>
				</div>
				<div className="detail-product-right">
					<div className="right-header">
						<h3 className="header-title">
							<span className="header-tag-like">Y??u Th??ch</span>
							<span className="title-content">{title}</span>
						</h3>
						<div className="right-review">
							<div className="review-star">
								<span className="star-percent">5.0</span>
								<div className="star-list">
									<i className="fa-solid fa-star"></i>
									<i className="fa-solid fa-star"></i>
									<i className="fa-solid fa-star"></i>
									<i className="fa-solid fa-star"></i>
									<i className="fa-solid fa-star"></i>
								</div>
							</div>
							<div className="review-number review-common">
								<span className="number-people">39.1k</span>
								<span className="number-text">????nh Gi??</span>
							</div>
							<div className="review-bought review-common">
								<span className="number-people">128.9k</span>
								<span className="number-text">???? b??n</span>
							</div>
						</div>

						<div className="right-price">
							<div className="price-detail">
								<p className="price-old">49.000.000 ???</p>
								<p className="price-current">
									{price
										.toString()
										.replace(
											/\B(?=(\d{3})+(?!\d))/g,
											'.'
										)}{' '}
									???
								</p>
								<span>50% GI???M</span>
							</div>
							<div className="price-description">
								<div className="tag-price">
									<Icon />
								</div>
								<div className="price-info">
									<p className="info-title">
										<span>G?? C??ng R???</span>
										<svg
											width="14"
											enableBackground="new 0 0 15 15"
											viewBox="0 0 15 15"
											role="img"
											className="stardust-icon stardust-icon-help"
										>
											<circle
												cx="7.5"
												cy="7.5"
												fill="none"
												r="6.5"
												strokeMiterlimit="10"
											></circle>
											<path
												stroke="none"
												d="m5.3 5.3c.1-.3.3-.6.5-.8s.4-.4.7-.5.6-.2 1-.2c.3 0 .6 0 .9.1s.5.2.7.4.4.4.5.7.2.6.2.9c0 .2 0 .4-.1.6s-.1.3-.2.5c-.1.1-.2.2-.3.3-.1.2-.2.3-.4.4-.1.1-.2.2-.3.3s-.2.2-.3.4c-.1.1-.1.2-.2.4s-.1.3-.1.5v.4h-.9v-.5c0-.3.1-.6.2-.8s.2-.4.3-.5c.2-.2.3-.3.5-.5.1-.1.3-.3.4-.4.1-.2.2-.3.3-.5s.1-.4.1-.7c0-.4-.2-.7-.4-.9s-.5-.3-.9-.3c-.3 0-.5 0-.7.1-.1.1-.3.2-.4.4-.1.1-.2.3-.3.5 0 .2-.1.5-.1.7h-.9c0-.3.1-.7.2-1zm2.8 5.1v1.2h-1.2v-1.2z"
											></path>
										</svg>
									</p>
									<span className="info-text">
										Gi?? t???t nh???t so v???i c??c s???n ph???m c??ng
										lo???i tr??n Shopee!
									</span>
								</div>
							</div>
						</div>

						<div className="right-color">
							<div className="color-title">M??U</div>
							<div className="color-content">
								<p className="color-item">XANH ??EN</p>
								<p className="color-item">N??U ?????</p>
								<p className="color-item">S???C GI???A</p>
								<p className="color-item">CAM N??U</p>
								<p className="color-item">XANH ??EN</p>
								<p className="color-item">N??U ?????</p>
								<p className="color-item">S???C GI???A</p>
								<p className="color-item">CAM N??U</p>
							</div>
						</div>
						<div className="right-color right-size">
							<div className="color-title">SIZE</div>
							<div className="color-content">
								<p className="color-item">S (35 - 47 kg)</p>
								<p className="color-item">M (48 - 59 kg)</p>
								<p className="color-item">L (60 - 67 kg)</p>
								<p className="color-item">XL (68 - 75 kg)</p>
								<p className="color-item">XXL (76 - 85 kg)</p>
							</div>
						</div>
						<div className="right-quantity">
							<div className="number-title">S??? l?????ng</div>
							<div className="number-quantity">
								<div className="quantity-wrap">
									<button
										className="btn-decrease btn-item"
										onClick={() =>
											handleReduceQuantity(index)
										}
									>
										-
									</button>
									<input
										value={quantityDetailProduct}
										type="text"
										className="input-quantity"
									/>
									<button
										className="btn-increase btn-item"
										onClick={() =>
											handleRiseQuantity(index)
										}
									>
										+
									</button>
								</div>
								<p className="number-available">
									229535 s???n ph???m c?? s???n
								</p>
							</div>
						</div>
						<div className="right-add-to-cart">
							<button
								className="btn-add"
								onClick={handleOrderProduct}
							>
								Th??m v??o gi??? h??ng
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className="info-product">
				<div className="info-product-left">
					<div className="info-section">
						<h3 className="info-header">CHI TI???T S???N PH???M</h3>
						<div className="product-specific">
							<div className="specific-item">
								<p className="item-title">Chi???u d??i tay ??o</p>
								<p className="item-extra">Tay ng???n</p>
							</div>
							<div className="specific-item">
								<p className="item-title">Ch???t li???u</p>
								<p className="item-extra">Cotton</p>
							</div>
							<div className="specific-item">
								<p className="item-title">M???u</p>
								<p className="item-extra">S???c</p>
							</div>
							<div className="specific-item">
								<p className="item-title">Kho h??ng</p>
								<p className="item-extra">229534</p>
							</div>
						</div>
					</div>
					<div className="info-section">
						<h3 className="info-header">M?? T??? S???N PH???M</h3>
						<div className="more-info-product">
							<p>
								??o thun nam POLO thi???t k??? s???c ngang v???i c?? s???u
								cotton cao c???p ng???n tay c???c sang tr???ng.
							</p>
							<p>
								Shop ??o Polo VNXK h??n h???nh ???????c ph???c v??? qu??
								kh??ch. Nh???ng s???n ph???m m???i nh???t v???n li??n t???c ???????c
								c???p nh???t m???i ng??y ph?? h???p v???i nhi???u l???a tu???i.
							</p>
							<br />
							<div className="more-section">
								<p>1. GI???I THI???U S???N PH???M</p>
								<br />
								<p>
									- ??o ph??ng Polo nam tr???ng l?? s??? l???a ch???n
									ho??n h???o cho c??c ch??ng trai. ??o 3 m??u trung
									t??nh r???t d??? m???c, form ??o v???a v???n c?? th???,
									tho???i m??i theo t???ng c??? ?????ng.
								</p>
								<p>
									- M??u s???c trung t??nh v?? ph???i m??u tuy???t v???i
									m?? r???t ??t ??o polo c?? t???o n??n s??? d??? d??ng
									trong vi???c ph???i ????? v?? t???o ra cho m??nh nhi???u
									phong c??ch kh??c nhau.
								</p>
								<p>
									- ??o ???????c l??m t??? ch???t li???u c?? s???u cotton co
									gi??n v???i b??? m???t v???i m???m m???i, th???m h??t m??? h??i
									t???t t???o c???m gi??c tho???i m??i, tho??ng m??t cho
									ng?????i m???c. ????y c??ng l?? ch???t li???u d??? gi???t
									s???ch, gi??p b???n ti???t ki???m m???t kho???ng th???i
									gian ????ng k???.
								</p>
							</div>
							<div className="more-section">
								<br />
								<br />
								<p>2. TH??NG TIN S???N PH???M </p>
								<br />
								<p>
									- Ch???t li???u: 100% ch???t cotton c?? s???u, th???m
									h??t m??? h??i , gi???t kh??ng ra m??u , kh??ng m???t
									form
								</p>
								<p>- C??c Size S - M - L- XL- XXL - XXXL</p>
								<br />
								<p className="size-padding">
									+ Size S : 35-47 kg cao 1m5-1m55
									<br />
									+ Size M : 48 - 59 kg cao 1m55 - 1m65
									<br />
									+ Size L : 60 - 67kg cao 1m65 - 1m80
									<br /> + Size XL : 68- 75kg cao 1m65 - 1m80
									<br /> + Size XXL : 76 - 85kg cao 1m65 -
									1m85
									<br /> + Size XXXL : 86 - 95kg cao 1m65 -
									1m85
								</p>
								<p>
									- M??u s???c : ??en , tr???ng , Xanh B??ch , Xanh
									Thi??n Thanh , Xanh ??en , ????? T????i , ????? ???? ,
									V??ng , Bi???n , Cam , Xanh Ya , Xanh K??t ,
									Xanh L?? , Xanh c???m , X??m ?????m , X??m L???t , M??u
									n??u , Xanh V???t
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="info-product-right"></div>
			</div>
		</div>
	);
}

DetailProduct.propTypes = {};

export default DetailProduct;
