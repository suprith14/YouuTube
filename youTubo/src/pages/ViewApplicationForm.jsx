import React, { useEffect, useState } from 'react'
import { getDatabase, ref, child, get, remove } from "firebase/database";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ViewApplicationForm = () => {
    const [data, setData] = useState([])
    const navigate = useNavigate()

    const user = useSelector((state) => state.user?.userInfo.email)
    console.log("user", user)



    const dbRef = ref(getDatabase());
    const getData = async () => {
        get(child(dbRef, `users/`)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                setData(snapshot.val())
            } else {
                console.log("No data available");
                // navigate('/')
            }
        })
    }




    useEffect(() => {
        getData()

    }, [])
    console.log("data", data)



    const deleteUserData = (key) => {
        const itemRef = ref(getDatabase(), `users/${key}`);
        remove(itemRef)
            .then(() => {
                getData()
            })
            .catch((err) => console.error("Remove error:", err));
    };


    if (user !== 'suprithcd14@gmail.com') {
        return (
            <div className='flex flex-col justify-center items-center w-screen  bg-yellow-200'>Not a Admin user</div>
        )
    }



    if (!data) {
        return null
    }
    return (
        <div className=''>
            <div className='text-3xl p-4 text-blue-600'> View Application Form</div>
            <div className='text-3xl p-4 text-blue-600'> Total form :{Object.keys(data).length}</div>

            {data && Object.keys(data).map((key) => {
                return (
                    <div key={key} className='flex flex-row flex-wrap justify-start items-center border-2 border-gray-300  shadow-lg rounded-lg m-4 p-4'>
                        <div className='text-xl p-4 text-blue-600'>name: {data[key].username}</div>
                        <div className='text-xl p-4 text-blue-600'>email : {data[key].email}</div>
                        <div className='text-xl p-4 text-blue-600'>phone :{data[key].number}</div>
                        <button onClick={() => deleteUserData(data[key].number)} className='text-xl p-4 text-blue-600 bg-red-300'>Delete</button>
                    </div>
                )
            })
            }
        </div>
    )
}


export default ViewApplicationForm
