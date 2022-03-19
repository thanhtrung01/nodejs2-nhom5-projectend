import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function FoodCard(props) {
    return (
        <div className="card">
            <div className="card-img"></div>
            <div className="card-content">
                <div className="card-title">
                    <h3>{props.food.name}</h3>
                </div>
                <div className="card-price">
                    <span>
                        {props.food.price}đ
                    </span>
                </div>
                <div className="card-description">
                    <p>
                        {props.food.description}
                    </p>
                </div>
                <div className="card-btn">
                    <Link
                        to= {`/foodId/${props.food._id}`}
                        className="link"
                    >
                        <button type="button" onClick={() =>{ 
                            console.log(`View more - ${props.food._id}`);
                            props.handleChangePageId(null);
                        }}>
                            View more
                        </button>
                    </Link>

                </div>
            </div>
        </div>
    );
}

export default FoodCard;