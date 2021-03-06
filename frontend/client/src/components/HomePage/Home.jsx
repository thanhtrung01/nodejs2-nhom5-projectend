import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import './home.scss';
import userApi from '../../api/userApi';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
	Navigation,
	Pagination,
	Scrollbar,
	A11y,
	Autoplay,
} from 'swiper';
import slide1 from '../../assets/images/slide1.png';
import slide2 from '../../assets/images/slide2.png';
import slide3 from '../../assets/images/slide3.png';
import categoryHome1 from '../../assets/images/category-home1.png';
import categoryHome2 from '../../assets/images/category-home2.png';
import categoryHome3 from '../../assets/images/category-home3.png';
import categoryHome4 from '../../assets/images/category-home4.png';
import categoryHome5 from '../../assets/images/category-home5.png';
import categoryHome6 from '../../assets/images/category-home6.png';
import categoryHome7 from '../../assets/images/category-home7.png';
import categoryHome8 from '../../assets/images/category-home8.png';
import categoryHome9 from '../../assets/images/category-home9.png';
import categoryHome10 from '../../assets/images/category-home10.png';
import categoryHome11 from '../../assets/images/category-home11.png';
import categoryHome12 from '../../assets/images/category-home12.png';
import categoryHome13 from '../../assets/images/category-home13.png';
import categoryHome14 from '../../assets/images/category-home14.png';
import categoryHome15 from '../../assets/images/category-home15.png';
import categoryHome16 from '../../assets/images/category-home16.png';
import product1 from '../../assets/images/product1.jpg';
import product2 from '../../assets/images/product2.jpg';
import product3 from '../../assets/images/product3.jpg';
import product4 from '../../assets/images/product4.jpg';
import product5 from '../../assets/images/product5.jpg';
import product6 from '../../assets/images/product6.jpg';
import product7 from '../../assets/images/product7.jpg';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { Link } from 'react-router-dom';
import ProductItem from '../ProductItem/ProductItem';
import productApi from '../../api/productApi';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../actions/product';

const swiperOptions = {
	direction: 'horizontal',
	slidesPerView: 1,
	spaceBetween: 0,
	mousewheel: true,
	pagination: true,
	effect: 'fade',
	speed: 1000,
};

SwiperCore.use([Autoplay, Pagination]);

const productList = [
	{
		id: 1,
		title: 'Balo du l???ch ??i h???c gi?? r??? th???i trang cute ?????p MiniCat BL464 ( kh??ng c?? m??c g???u)',
		description: 'Meat Balls For Pet',
		category: '',
		price: 89,
		// priceOld: '108.000???',
		imageUrl: product1,
		categorySlug: 'meat-balls-for-pet',
		slug: 'meat-balls-for-pet',
		sale: true,
		quantity: 121,
	},
	{
		id: 2,
		title: 'Gi??y Jordan 1 High Panda, Gi??y Th??? Thao JD1 Cao C??? M??u ??en, Da B?? Cao C???p Full Size Nam N??? | JDD002',
		description: 'Meat Balls For Pet',
		category: '',
		price: 90,
		// priceOld: '108.000???',
		imageUrl: product2,
		categorySlug: 'meat-balls-for-pet',
		slug: 'meat-balls-for-pet',
		sale: true,
		quantity: 121,
	},
	{
		id: 3,
		title: '??o Thun T L??O Hiphop Nam N??? Ulzzang Unisex TATO v???i Cotton cao c???p, th???m h??t m??? h??i,n??ng ?????ng. D??? ph???i ?????.',
		description: 'Meat Balls For Pet',
		category: '',
		price: 90,
		// priceOld: '108.000???',
		imageUrl: product3,
		categorySlug: 'meat-balls-for-pet',
		slug: 'meat-balls-for-pet',
		sale: true,
		quantity: 121,
	},
	{
		id: 4,
		title: 'B??? n??? ??o thun cotton + qu???n loang,set ????? n??? m???c h?? ??i ch??i,??i d???o',
		description: 'Meat Balls For Pet',
		category: '',
		price: 90,
		// priceOld: '108.000???',
		imageUrl: product4,
		categorySlug: 'meat-balls-for-pet',
		slug: 'meat-balls-for-pet',
		sale: true,
		quantity: 121,
	},
	{
		id: 5,
		title: '??o thun CHESS b??n c??? unisex - Ph??ng c???c tay d??ng su??ng, oversize in h??nh h???a ti???t c?? t??nh, n???i b???t',
		description: 'Meat Balls For Pet',
		category: '',
		price: 90,
		// priceOld: '108.000???',
		imageUrl: product5,
		categorySlug: 'meat-balls-for-pet',
		slug: 'meat-balls-for-pet',
		sale: true,
		quantity: 121,
	},
	{
		id: 6,
		title: 'D??p ??i bi???n n??? quai ngang m??a h?? phi??n b???n H??n Qu???c ????? d??y ch???ng tr?????t, T111',
		description: 'Meat Balls For Pet',
		category: '',
		price: 90,
		// priceOld: '108.000???',
		imageUrl: product6,
		categorySlug: 'meat-balls-for-pet',
		slug: 'meat-balls-for-pet',
		sale: true,
		quantity: 121,
	},
	{
		id: 7,
		title: 'K??? s??ch ????? b??n b???ng g??? ??a n??ng B??o shop m??u tr???ng th??o r???i l???p gh??p d??? d??ng ti???n l???i',
		description: 'Meat Balls For Pet',
		category: '',
		price: 90,
		// priceOld: '108.000???',
		imageUrl: product7,
		categorySlug: 'meat-balls-for-pet',
		slug: 'meat-balls-for-pet',
		sale: true,
		quantity: 121,
	},
];

const listCategory = [
	{
		name: 'Th???i trang nam',
		image: categoryHome1,
	},
	{
		name: '??i???n tho???i & ph??? ki???n',
		image: categoryHome2,
	},
	{
		name: 'Thi???t B??? ??i???n T???',
		image: categoryHome3,
	},
	{
		name: 'M??y t??nh & laptop',
		image: categoryHome4,
	},
	{
		name: 'M??y ???nh & m??y quay phim',
		image: categoryHome5,
	},
	{
		name: '?????ng h???',
		image: categoryHome6,
	},
	{
		name: 'Gi??y d??p nam',
		image: categoryHome7,
	},
	{
		name: 'Thi???t b??? ??i???n gia d???ng',
		image: categoryHome8,
	},
	{
		name: 'Th???i trang n???',
		image: categoryHome9,
	},
	{
		name: 'M??? & b??',
		image: categoryHome10,
	},
	{
		name: 'Nh?? c???a & ?????i s???ng',
		image: categoryHome11,
	},
	{
		name: 'S???c ?????p',
		image: categoryHome12,
	},
	{
		name: 'S???c kh???e',
		image: categoryHome13,
	},
	{
		name: 'Gi??y d??p n???',
		image: categoryHome14,
	},
	{
		name: 'T??i v?? n???',
		image: categoryHome15,
	},
	{
		name: 'Ph??? ki???n & trang s???c n???',
		image: categoryHome16,
	},
];

function Home(props) {
	const navigationPrevRef = useRef();
	const navigationNextRef = useRef();
	const [products, setProducts] = useState([]);
	const [productsCopy, setProductsCopy] = useState([]);

	const dispatch = useDispatch();
	// const currentUser = useSelector((state) => state.user);
	// console.log('currentUser', currentUser);

	// localStorage.setItem('user_login', JSON.stringify(currentUser));

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

	const valueSearchInputNavBar = useSelector((state) => state.search.value);

	useEffect(() => {
		const filterProducts = productsCopy.filter((itemProduct, index) => {
			return itemProduct.title
				.toLowerCase()
				.includes(valueSearchInputNavBar.toLowerCase());
		});
		setProducts(filterProducts);
	}, [valueSearchInputNavBar, productsCopy]);

	return (
		<div className="home">
			<Swiper
				modules={[Navigation, Pagination, Scrollbar, A11y]}
				{...swiperOptions}
				pagination={{ clickable: true }}
				slidesPerView={1} // s??? l?????ng slide 1 l??c tr??n m??n h??nh
				autoplay={{ delay: 2000 }}
				navigation={{
					prevEl: navigationPrevRef.current,
					nextEl: navigationNextRef.current,
				}}
			>
				<SwiperSlide>
					<img src={slide1} alt="" width="100%" height="100%" />
				</SwiperSlide>
				<SwiperSlide>
					<img src={slide2} alt="" width="100%" height="100%" />
				</SwiperSlide>
				<SwiperSlide>
					<img src={slide3} alt="" width="100%" height="100%" />
				</SwiperSlide>
				<div ref={navigationPrevRef} />
				<div ref={navigationNextRef} />
			</Swiper>

			<div className="header-category">
				<h3 className="category-title">Danh m???c s???n ph???m</h3>
				<div className="category-list">
					{listCategory.map((itemCategory, index) => (
						<div className="category-item" key={index}>
							<Link className="category-link" to="/category">
								<img
									src={itemCategory.image}
									alt=""
									width="60"
								/>
								<p className="category-name">
									{itemCategory.name}
								</p>
							</Link>
						</div>
					))}
				</div>
			</div>

			<div className="header-product">G???i ?? h??m nay</div>

			<div className="home-product">
				{products.map((productItem, index) => (
					<ProductItem key={index} index={index} {...productItem} />
				))}
			</div>
		</div>
	);
}

Home.propTypes = {};

export default Home;
