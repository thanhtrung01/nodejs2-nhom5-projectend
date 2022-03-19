import { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';

import { ToastContainer, toast } from 'react-toastify';


function FormCreate({
    handleChangeLoading
}) {
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");

    console.log(name, price, description);

    const handleSubmit = async () => {
        handleChangeLoading(true);
        try {
            const res = await axios.post(`http://localhost:5000/v1/api/food/create-food`, {
                name: name,
                price: price,
                description: description,
            }).then((res) => {
                const person = res.data
                console.log(person);

                //toast
                toast.success(" Create Item Successfully!!!", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000
                });
                setName("");
                setPrice(0);
                setDescription("");
            })
                .catch((err) => {
                    //toast
                    toast.error("Create Item failed", {
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
        console.log("submit");
    }

    return <div className="wrapper">
        <form className="form-create">
            <div className="form-title">
                <h2>Create Food</h2>
            </div>
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
    </div>;
}

export default FormCreate;