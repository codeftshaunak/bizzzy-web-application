import React from 'react'

export const MainButtonRounded = ({ children, onClick }) => {
    return (
        <button className="text-center text-white font-semibold py-[7px] px-5 rounded-full m-auto bg-[var(--primarycolor)] border transition duration-700 hover:bg-white hover:text-[var(--primarycolor)]" onClick={onClick}>{children}</button>
    )
}

export const MainButtonTranparentRounded = ({ children, onClick }) => {
    return (
        <button className="text-center font-semibold py-[7px] px-5 rounded-full m-auto border transition duration-700 bg-white text-[var(--primarycolor)] hover:bg-[var(--primarycolor)] hover:text-white" onClick={onClick}>{children}</button>
    )
}

