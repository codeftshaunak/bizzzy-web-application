import { useState, useEffect } from "react";
import Modal from "react-modal";

export const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: " 0",
    borderRadius: "12px",
  },
};

function AlertDeleteDialog({ id, modalIsOpen = true, setModalIsOpen }) {
  const [payload, setPayload] = useState()
  const closeModal = () => {
    setModalIsOpen((prev) => !prev)
  }

  useEffect(() => {
    let newPayload;
    if (id.type === 'education') {
      newPayload = { education: { educationId: id.id } };
    } else if (id.type === 'experience') {
      newPayload = { experience: { experienceId: id.id } };
    }

    // Only update the state if the payload is different
    if (JSON.stringify(newPayload) !== JSON.stringify(payload)) {
      setPayload(newPayload);
    }
  }, [id]);

  const HandleDelete = async () => {
    try {
      const response = await deleteApi({

      })
<<<<<<< HEAD
=======
      // return response.data.body;
>>>>>>> parent of db37502 (seperating the git create steps)
    } catch (error) {
      return error;
    }
  }
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        //   onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="w-[500px] flex flex-col gap-[20px] ">
          <div className="flex items-center justify-between p-[24px] w-full border-b-[1px] border-b-[#F3F4F6] ">
            <p className="text-[16px] capitalize text-[#374151] ">{id.type}</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              cursor={"pointer"}
              onClick={closeModal}
            >
              <path
                d="M18 6L6 18"
                stroke="#6B7280"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 6L18 18"
                stroke="#6B7280"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <form className="flex flex-col gap-[16px]">
            <div className="flex flex-col px-[24px]  pb ">
              <div className="w-[100%] py-[2px] px-[12px]">
                do you want to delete this
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 p-[24px] w-full border-t-[1px] border-t-[#F3F4F6] ">
              <button className="text-[14px] bg-[#16A34A] text-[#fff] font-[500]  py-[4px] px-[20px] rounded-md " onClick={closeModal}>
                Cancel
              </button>
              <button className="text-[14px] bg-[#16A34A] text-[#fff] font-[500]  py-[4px] px-[20px] rounded-md " onClick={HandleDelete}>
                Sure
              </button>
            </div>
          </form>
        </div>
      </Modal>

    </>
  );
}

export default AlertDeleteDialog;
