import { useLayoutEffect, useEffect, useState } from 'react';
import axios from 'axios';
import Food from '../components/foodId/Food'
import { Link, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function FoodId({
    pageId,
    handleChangePageId,
    handleChangeLoading,
    isLoading
}) {
    const [foodApi, setFoodApi] = useState();

    console.log(foodApi)
    const { _id } = useParams();
    console.log(_id);

    useLayoutEffect(() =>{
        handleChangePageId(null);
    },[pageId])

    useEffect(()=>{
        if(!foodApi)
            callApi();
    },[foodApi])

    const callApi = async () => {
        handleChangeLoading(true);
        await axios.get(`http://localhost:5000/v1/api/food/${_id}`)
            .then(res => {
                const persons = res.data;
                setFoodApi(persons);

                //toast
                // toast.success("Get Data Successfully!!!", {
                //     position: toast.POSITION.TOP_RIGHT,
                //     autoClose: 2000
                // });

                // console.log(persons);
            })
            .catch(err => {
                //toast
                toast.error("Get Data Failed!!!", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000
                });
            })
        handleChangeLoading(false);
    }

    return (
        <>
            <h1>Food Id: {_id}</h1>
            {foodApi && <Food callApi={callApi} handleChangeLoading={handleChangeLoading} foodApi={foodApi} _id={_id}></Food>}
        </>
    )

}

export default FoodId;