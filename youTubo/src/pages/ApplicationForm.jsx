import React, { useState } from 'react'
import { getDatabase, ref, set } from "firebase/database";
import { useNavigate } from 'react-router-dom';

const ApplicationForm = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        firstname: "",
        middlename: "",
        lastname: "",
        email: "",
        number: "",
        gender: "",
        dob: "",
        address: "",
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((pre) => ({
            ...pre,
            [name]: value,
        }));
    }



    function writeUserData(e) {
        e.preventDefault()
        console.log("writeUserData")
        const userId = formData.number;
        const db = getDatabase();
        console.log("db", db)
        console.log("userId", userId)
        try {
            set(ref(db, 'users/' + userId), {
                username: formData.firstname,
                firstname: formData.firstname,
                middlename: formData.middlename,
                lastname: formData.lastname,
                number: formData.number,
                gender: formData.gender,
                dob: formData.dob,
                address: formData.address,
                email: formData.email,
            }).then(() => {
                alert("Data submitted successfully!")
                navigate('/viewapplicationform')
            }).catch((error) => {
                console.error("Error writing data to Firebase:", error);
            })

        } catch (error) {

            console.error("Error writing data to Firebase:", error);
        }
    }
    console.log("formData", formData);

    return (
        <div className='flex flex-col justify-center items-center w-screen  bg-yellow-200'>
            <div className='text-3xl p-4 text-blue-600'> Application Form</div>
            <div>
                <form onSubmit={writeUserData} className='flex flex-col bg-white px-3 lg:px-10 py-5 rounded-lg'>

                    <label className='text-sm' htmlFor='firstname' >First Name</label>
                    <input type="text" id='firstname' name='firstname' placeholder='Name' className='border-2 border-black rounded-md p-2 mb-2' onChange={handleInputChange} />

                    <label className='text-sm' htmlFor='middlename' >Middle Name</label>
                    <input type="text" placeholder='Middlename' id='middlename' name='middlename' className='border-2 border-black rounded-md p-2 mb-2' onChange={handleInputChange} />

                    <label className='text-sm' htmlFor='lastname'>Last Name</label>
                    <input type="text" placeholder='Last Name' id='lastname' name='lastname' className='border-2 border-black rounded-md p-2 mb-2' onChange={handleInputChange} />

                    <label className='text-sm' htmlFor='email'>Email</label>
                    <input type="email" placeholder='Email' id='email' name='email' className='border-2 border-black rounded-md p-2 mb-2' onChange={handleInputChange} />

                    <label className='text-sm' htmlFor='number'>Phone Number</label>
                    <input type="text" placeholder='Phone Number' id='number' name='number' className='border-2 border-black rounded-md p-2 mb-2' onChange={handleInputChange} />


                    <label className='text-sm'>Gender</label>
                    <div>
                        <label>
                            <input type="radio" id='male' name='gender' value='male' checked={formData.gender === 'male'} onChange={handleInputChange} />
                            <span className='' >Male</span>
                        </label>
                        <label>
                            <input type="radio" id='female' name='gender' value='female' checked={formData.gender === 'female'} onChange={handleInputChange} />
                            <span className='' >Female</span>
                        </label>
                        <label>
                            <input type="radio" id='other' name='gender' value='other' checked={formData.gender === 'other'} onChange={handleInputChange} />
                            <span className='' >Other</span>
                        </label>
                    </div>

                    <label className='text-sm' htmlFor='dob'>Date of Birth</label>
                    <input type="date" id='dob' name='dob' className='border-2 border-black rounded-md p-2 mb-2' onChange={handleInputChange} />


                    <label className='text-sm' htmlFor='address'>Address</label>
                    <textarea id="address" name="address" placeholder="Address" className="border-2 border-black rounded-md p-2 mb-2 w-80 h-24 align-top" onChange={handleInputChange} />

                    <button type='submit' className='bg-blue-500 text-white rounded-md p-2'>Submit</button>


                </form>
            </div>
        </div>
    )
}

export default ApplicationForm