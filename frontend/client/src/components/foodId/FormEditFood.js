import { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';
import { ToastContainer, toast } from 'react-toastify';


function FormEditFood({
    handleChangeLoading,
    foodApi,
    _id,
    handleClickEdit,
    callApi
}) {
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    
    useEffect(() => {
        if(foodApi){
            setName(foodApi.name)
            setPrice(foodApi.price)
            setDescription(foodApi.description)
        }
    },[foodApi])

    const handleSubmit = async () => {
        handleClickEdit(false);
        handleChangeLoading(true);
        try {
            const res = await axios.patch(`http://localhost:5000/v1/api/food/update/${_id}`, {
                name: name,
                price: price,
                description: description,
            }).then((res) => {
                const person = res.data
                console.log(person);

                //toast
                toast.success("Update Food Successfully!!!", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000
                });
                callApi();
            })
                .catch((err) => {
                    //toast
                    toast.error("Update Food failed", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 2000
                    });
                });
        }
        catch (err) {
            //toast
            toast.error("Create Item failed", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000
            });
            console.log("Failed");
        }
        handleChangeLoading(false);
    }

    return <form className="form-create">
        <div className="form-group form-name">
            <label htmlFor="name">
                Food Name
            </label>
            <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
        </div>
        <div className="form-group form-pice">
            <label htmlFor="price">
                Food price
            </label>
            <input
                type="number"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}

            />
        </div>
        <div className="form-group form-description">
            <label htmlFor="description">
                Description
            </label>
            <textarea
                type="text"
                name="name"
                value={description}
                onChange={(e) => setDescription(e.target.value)}

            />
        </div>
        <div className="form-group form-submit">
            <input type="button" value="Submit" onClick={() => handleSubmit()} />
        </div>
    </form>
}

export default FormEditFood;