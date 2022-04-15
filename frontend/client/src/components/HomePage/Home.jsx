import React from 'react';
import PropTypes from 'prop-types';
import './home.scss';

const dataProduct = [
	{
		id: 1,
		title: 'Meat Balls For Pet',
		price: '15',
		priceOld: '20',
		categorySlug: 'meat-balls-for-pet',
		slug: 'meat-balls-for-pet',
		// image: product1,
		sale: true,
		quantity: 1,
	},
	{
		id: 2,
		title: 'Pets Supplements',
		price: '30',
		priceOld: '64',
		categorySlug: 'pets-supplements',
		slug: 'pets-supplements',
		// image: product2,
		sale: true,
		quantity: 1,
	},
	{
		id: 3,
		title: 'Tasty Mix Cat Food',
		price: '50',
		// priceOld: "64",
		categorySlug: 'tasty-mix-cat-food',
		slug: 'tasty-mix-cat-food',
		// image: product3,
		quantity: 1,
	},
	{
		id: 4,
		title: 'Adult Dog Food',
		price: '25',
		priceOld: '40',
		categorySlug: 'tasty-mix-cat-food',
		slug: 'tasty-mix-cat-food',
		// image: product4,
		sale: true,
		quantity: 1,
	},
	{
		id: 5,
		title: 'Biscuits Dog Treats',
		price: '54',
		// priceOld: "40",
		categorySlug: 'biscuits-dog-treats',
		slug: 'biscuits-dog-treats',
		// image: product5,
		sale: true,
		quantity: 1,
	},
	{
		id: 6,
		title: 'Pet Supplements',
		price: '50',
		// priceOld: "40",
		categorySlug: 'pet-supplements',
		slug: 'tasty-mix-cat-food',
		// image: product6,
		quantity: 1,
	},
	{
		id: 7,
		title: 'Food for Adult Dogs',
		price: '30',
		priceOld: '40',
		categorySlug: 'food-for-adult-dogs',
		slug: 'food-for-adult-dogs',
		// image: product7,
		sale: true,
		quantity: 1,
	},
	{
		id: 8,
		title: 'Cat Food',
		price: '64',
		// priceOld: "40",
		categorySlug: 'cat-food',
		slug: 'cat-food',
		// image: product8,
		quantity: 1,
	},
];
function Home(props) {
	return <div className="home">Home123</div>;
}

Home.propTypes = {};

export default Home;
