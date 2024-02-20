import { IoMdClose } from "react-icons/io";

const UniversalModal = ({ isModal, setIsModal, title, children }) => {
  const handleClose = () => {
    setIsModal(false);
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      {isModal && (
        <div
          onClick={handleClose}
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "100",
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.3)",
          }}
        >
          <div
            onClick={handleModalClick}
            className="w-[600px] bg-white border rounded-md relative p-5"
          >
            <span
              className="h-7 w-7 bg-red-100/20 rounded-full absolute top-0 right-0 flex items-center justify-center cursor-pointer backdrop-blur backdrop-filter hover:bg-red-100 hover:text-red-500"
              onClick={handleClose}
            >
              <IoMdClose className="text-2xl" />
            </span>
            {title && (
              <h4 className="text-xl font-semibold capitalize mb-3">{title}</h4>
            )}
            <div>{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default UniversalModal;
