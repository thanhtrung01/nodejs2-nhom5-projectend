import { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';
import FormEditFood from './FormEditFood'
import { useHistory} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

function Food({
    foodApi,
    handleChangeLoading,
    _id,
    callApi
}) {
    const [editClick, setEditClick] = useState(false);
    const [deleteClick, setDeleteClick] = useState(false);
    const history = useHistory()

    const handleClickEdit = (value) => {
        setEditClick(value);
    }

    const handleClickDelete = (value) => {
        setDeleteClick(value);
    }

    const handleDelete = async () => {
        setDeleteClick(false);
        handleChangeLoading(true);
        try {
            const res = await axios.delete(`http://localhost:5000/v1/api/food/delete/${_id}`, ).then((res) => {
                //toast
                toast.success("Delete Food Successfully!!!", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000
                });
                history.replace("/")
            })
                .catch((err) => {
                    //toast
                    toast.error("Delete Food failed", {
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

    return (
        <>
            {
                (editClick || deleteClick) && <div className="container-background">
                    <div className="form__food">
                        <div className="click">
                            <p
                                className="click_title"
                            >
                                {editClick ? "Edit" : "Delete"}
                            </p>
                            <p
                                className="click-x"
                                onClick={() => {
                                    handleClickEdit(false);
                                    handleClickDelete(false)
                                }
                                }
                            >
                                x
                            </p>
                        </div>
                        {
                            deleteClick && <div className="delete-food">
                                <button
                                    type="button"
                                    onClick={() => handleDelete()}
                                    className="btn-food_delete"
                                >Delete
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleClickDelete(false)}
                                    className="btn-food_edit"
                                >cancel
                                </button>
                            </div>
                        }
                        {
                            editClick && <FormEditFood
                                handleChangeLoading={handleChangeLoading}
                                foodApi={foodApi}
                                _id={_id}
                                handleClickEdit={handleClickEdit}
                                setDeleteClick={setDeleteClick}
                                callApi={callApi}
                            />
                        }
                    </div>
                </div>
            }
            <div className="warraper-food">
                <div className="container-food">
                    <h1>Image</h1>
                </div>
                <div className="container-food">
                    <h2 className="title-food">
                        {foodApi.name}
                    </h2>
                    <p className="price-food">
                        <span className="price-food_sub">{foodApi.price}đ</span>
                    </p>
                    <p className="description-food">

                        <span className="description-food_sub"> {foodApi.description}</span>

                    </p>
                    <div className="btn-food">
                        <button
                            type="button"
                            onClick={() => handleClickEdit(true)}
                            className="btn-food_edit"
                        >Edit
                        </button>

                        <button
                            type="button"
                            onClick={() => handleClickDelete(true)}
                            className="btn-food_delete"
                        >Delete
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Food;