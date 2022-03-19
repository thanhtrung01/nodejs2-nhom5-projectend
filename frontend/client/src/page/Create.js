import { useLayoutEffect, useState } from 'react';
import axios from 'axios';
import FormCreate from '../components/form/FormCreate'

function Create({
    pageId,
    handleChangePageId,
    handleChangeLoading
}) {

    useLayoutEffect(() =>{
        handleChangePageId(1);
    },[pageId]);
    
    return <>
        <h2>Create</h2>
        <FormCreate handleChangeLoading={handleChangeLoading}></FormCreate>
    </>;
}

export default Create;