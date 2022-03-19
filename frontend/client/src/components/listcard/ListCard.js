import { useEffect, useState } from 'react';
import './style.css';   
import FoodCard from './FoodCard'

function ListCard(props) {
    return (
        <div className="list-card">
            {
                props.array && props.array.map((food)=>{
                    return <FoodCard handleChangePageId={props.handleChangePageId} food={food} key={food._id}/>
                })
            }
        </div>
    );
}

export default ListCard;