import React, { useState } from 'react';

const Modal = ({ setOpenModal, acceptInvite, offer }) => {
    const [messages, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const HandleTextValue = (e) => {
        setMessage(e.target.value);
        setErrorMessage(''); // Clear error message when user starts typing
    };

    return (
        <div>
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

                <div className="modal-container bg-white w-8/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                    <div className="modal-content py-4 text-left px-6">
                        <div className="flex justify-between items-center pb-3 border-b">
                            <p className="text-xl font-bold capitalize">
                                Enter your message to client
                            </p>
                            <button
                                className="modal-close cursor-pointer z-50"
                                onClick={() => setOpenModal(false)}
                            >
                                &times;
                            </button>
                        </div>

                        <div className="my-5">
                            <textarea
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                placeholder="Enter your message..."
                                rows="4"
                                value={messages}
                                onChange={HandleTextValue}
                            />
                            <p className="text-red-500 text-sm">
                                {errorMessage}
                            </p>
                        </div>

                        <div className="flex justify-end pt-2 border-t">
                            <button
                                onClick={() => setOpenModal(false)}
                                className="px-4 py-2 mx-4 bg-white border border-black rounded-lg text-black hover:bg-[#F0FDF4]"
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 bg-fg-brand py-2 rounded-lg text-white hover:bg-fg-brand"
                                onClick={() => acceptInvite(messages)}
                            >
                                {
                                    offer ? "Accept Offer" : "Accept Interview"
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
