import { BsArrowUpRightCircleFill } from "react-icons/bs";


export const MainButton = ({ children, onClick }) => {
    return (
        <button className="text-center font-medium text-white text-[18px]  py-[10px] px-5 rounded-md m-auto bg-[var(--primarycolor)] border transition duration-700 hover:bg-white hover:text-[var(--primarycolor)] w-full md:w-auto" onClick={onClick}>{children}</button>
    )
}

export const MainButtonTranparent = ({ children, onClick }) => {
    return (
        <button className="text-center font-medium text-[18px] py-[10px] px-5 rounded-md m-auto border transition duration-700 bg-[#F3F8F5] text-black hover:bg-[var(--primarycolor)] hover:text-white w-full md:w-auto" onClick={onClick}>{children}</button>
    )
}

export const CommonButtonTranparent = ({ children, onClick }) => {
    return (
        <button className="text-white text-[18px] py-[10px] px-5 rounded-md  bg-[#ffffff38] transition duration-700  w-full md:w-auto flex items-center gap-2" onClick={onClick}>{children} <BsArrowUpRightCircleFill /></button>
    )
}


export const CommonButton = ({ children, onClick }) => {
    return (
        <button className="text-black text-center text-[1.4rem] py-[10px] px-5 rounded-md  bg-white transition duration-700  w-full md:w-auto flex items-center gap-2" onClick={onClick}>{children} <BsArrowUpRightCircleFill className="text-[1.3rem]" /></button>
    )
}

