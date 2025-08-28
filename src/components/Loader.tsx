import React from 'react';

const Loader = () => {
    return (
        <div className={`w-full flex justify-center h-[calc(100vh-230px)] items-center flex-col`}>
            <div>
                <div className="loader" />
            </div>
        </div>
    );
};

export default Loader;
