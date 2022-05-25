import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './category.scss';

import ProductItem from '../ProductItem/ProductItem';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../actions/product';
import productApi from '../../api/productApi';
import { Link, useParams, useRouteMatch } from 'react-router-dom';

const listCategories = [
	'Tất cả',
	'Áo khoác',
	'Áo Vest và Blazer',
	'Áo Hoodie, Áo Len & Áo Nỉ',
	'Quần Jeans',
	'Quần Dài/Quần Âu',
];

const slugCategories = [
	'',
	'ao-khoac',
	'ao-vest',
	'ao-hoodie',
	'quan-jeans',
	'quan-dai',
];

function Category(props) {
	const [products, setProducts] = useState([]);
	const [productsCopy, setProductsCopy] = useState([]);
	const dispatch = useDispatch();

	const { slugCategory } = useParams();
	console.log({ slugCategory });

	const [numberCategory, setNumberCategory] = useState(0);

	const valueSearchInputNavBar = useSelector((state) => state.search.value);

	useEffect(() => {
		const getAllProductApi = async () => {
			try {
				const response = await productApi.getAll();
				setProducts(response.products);
				setProductsCopy(response.products);
				dispatch(addProduct(response.products));
			} catch (error) {
				console.log('Faild to fetch user list: ', error);
			}
		};
		getAllProductApi();
	}, []);

	useEffect(() => {
		const filterProducts = productsCopy.filter((itemProduct, index) => {
			return itemProduct.title
				.toLowerCase()
				.includes(valueSearchInputNavBar.toLowerCase());
		});
		setProducts(filterProducts);
	}, [valueSearchInputNavBar, productsCopy]);

	const handleClickCategory = (index) => {
		setNumberCategory(index);
	};
	// console.log('NumberCategory', numberCategory);
	// `${url}/${slugCategories[index]}`
	return (
		<div className="category-wrap">
			<div className="category-left">
				<div className="left-header">
					<i className="fa-solid fa-list left-header-icon"></i>
					<p className="left-header-title">Tất Cả Danh Mục</p>
				</div>
				<ul className="left-list-option">
					{listCategories.map((itemCategory, index) => (
						<li
							className={
								numberCategory === index
									? 'list-option active'
									: 'list-option'
							}
							key={index}
							onClick={() => handleClickCategory(index)}
						>
							<Link
								to={`/category/${slugCategories[index]}`}
								className="option-link"
							>
								{itemCategory}
							</Link>
						</li>
					))}
					<svg
						viewBox="0 0 4 7"
						className="option-active shopee-svg-icon shopee-category-list__main-category__caret icon-down-arrow-right-filled"
						style={{ top: numberCategory * 36 + 16 + 'px' }}
					>
						<polygon points="4 3.5 0 0 0 7"></polygon>
					</svg>
				</ul>
			</div>
			<div className="category-right">
				<div className="sort-product">
					<div className="sort-item sort-text">Sắp xếp theo</div>
					<div className="sort-item sort-popular">Phổ biến</div>
					<div className="sort-item sort-newest">Mới nhất</div>
					<div className="sort-item sort-bestseller">Bán chạy</div>
					<div className="sort-item sort-price">
						<span>Giá</span>
						<svg
							width="12"
							viewBox="0 0 10 6"
							className="shopee-svg-icon icon-arrow-down-small"
						>
							<path
								d="M9.7503478 1.37413402L5.3649665 5.78112957c-.1947815.19574157-.511363.19651982-.7071046.00173827a.50153763.50153763 0 0 1-.0008702-.00086807L.2050664 1.33007451l.0007126-.00071253C.077901 1.18820749 0 1.0009341 0 .79546595 0 .35614224.3561422 0 .7954659 0c.2054682 0 .3927416.07790103.5338961.20577896l.0006632-.00066318.0226101.02261012a.80128317.80128317 0 0 1 .0105706.0105706l3.3619016 3.36190165c.1562097.15620972.4094757.15620972.5656855 0a.42598723.42598723 0 0 0 .0006944-.00069616L8.6678481.20650022l.0009529.0009482C8.8101657.07857935 8.9981733 0 9.2045341 0 9.6438578 0 10 .35614224 10 .79546595c0 .20495443-.077512.39180497-.2048207.53283641l.0003896.00038772-.0096728.00972053a.80044712.80044712 0 0 1-.0355483.03572341z"
								fillRule="nonzero"
							></path>
						</svg>

						<ul className="sort-price-list">
							<li className="sort-price-list-item">
								Giá: Thấp đến Cao
							</li>
							<li className="sort-price-list-item">
								Giá: Cao đến Thấp
							</li>
						</ul>
					</div>
				</div>

				<div className="category-right-content">
					{products ? (
						products.map((productItem, index) => (
							<ProductItem
								key={index}
								index={index}
								{...productItem}
							/>
						))
					) : (
						<></>
					)}
				</div>
			</div>
		</div>
	);
}

Category.propTypes = {};

export default Category;
