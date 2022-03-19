import { useEffect, useState } from 'react';
import axios from 'axios';
import ListCard from '../components/listcard/ListCard'
import { ToastContainer, toast } from 'react-toastify';

function Home({
    pageId,
    handleChangeLoading,
    handleChangePageId
}) {
    const [array, setArray] = useState([]);

    useEffect(() => {
        callApi();
    }, [pageId])

    const callApi = async () => {
        handleChangeLoading(true);
        await axios.get(`http://localhost:5000/v1/api/food`)
            .then(res => {
                const persons = res.data;
                setArray(persons);

                //toast
                // toast.success("Get Data Successfully!!!", {
                //     position: toast.POSITION.TOP_RIGHT,
                //     autoClose: 2000
                // });

                console.log(persons);
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
        <div>
            <h2>Home</h2>
            <ListCard array={array} handleChangePageId={handleChangePageId} />
        </div>
    );
}

export default Home;