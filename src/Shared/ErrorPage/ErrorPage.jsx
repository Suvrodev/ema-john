import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className='w-10/12 bg-red-600 mx-auto mt-10 rounded-lg text-white p-10 flex flex-col justify-center items-center'>
            <h1 className='text-4xl'>Error Page</h1>
           <div className='text-center mt-10'>
                <button className='w-full bg-green-600 p-2 rounded-lg font-bold'> <Link to={`/`}>Go to Home Page</Link> </button>
           </div>
        </div>
    );
};

export default ErrorPage;