import React, { Fragment, useContext, useEffect, useState } from "react";
import { editNotice, getAllNotices } from "./fetchApi"; // Assuming you have these API functions
import { NoticeContext } from "./index"; // Import NoticeContext

const EditNoticeModal = (props) => {
    const { data, dispatch } = useContext(NoticeContext); // Access the NoticeContext

    const [title, setTitle] = useState(""); // Title of the notice
    const [description, setDescription] = useState(""); // Description of the notice
    const [time, setTime] = useState(""); // Time of the notice
    const [nId, setNId] = useState(""); // Notice ID

    // When the modal opens, set the form fields
    useEffect(() => {
        setTitle(data.editNoticeModal.title); // Set the title from the context
        setDescription(data.editNoticeModal.description); // Set the description from the context
        setTime(data.editNoticeModal.time); // Set the time from the context
        setNId(data.editNoticeModal.nId); // Set the notice ID from the context

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.editNoticeModal.modal]);

    // Function to fetch all notices and update state
    const fetchData = async () => {
        let responseData = await getAllNotices();
        if (responseData.Notices) {
            dispatch({
                type: "fetchNoticesAndChangeState",
                payload: responseData.Notices,
            });
        }
    };

    // Function to submit the form for editing a notice
    const submitForm = async () => {
        dispatch({ type: "loading", payload: true });

        // If time is empty, set it to the current time
        if (!time) {
            const currentTime = new Date().toISOString();
            setTime(currentTime); // Setting time to current date if not provided
        }

        let edit = await editNotice(nId, title, description, time); // Include title, description, and time
        if (edit.error) {
            console.log(edit.error);
            dispatch({ type: "loading", payload: false });
        } else if (edit.success) {
            console.log(edit.success);
            dispatch({ type: "editNoticeModalClose" });
            // Directly refetch the notices after edit
            fetchData(); // Re-fetch the notices to update the state
            dispatch({ type: "loading", payload: false });
        }
    };

    return (
        <Fragment>
            {/* Black Overlay */}
            <div
                onClick={() => dispatch({ type: "editNoticeModalClose" })}
                className={`${data.editNoticeModal.modal ? "" : "hidden"
                    } fixed top-0 left-0 z-30 w-full h-full bg-black opacity-50`}
            />
            {/* End Black Overlay */}

            {/* Modal Start */}
            <div
                className={`${data.editNoticeModal.modal ? "" : "hidden"
                    } fixed inset-0 m-4 flex items-center z-30 justify-center`}
            >
                <div className="relative bg-white w-11/12 md:w-3/6 shadow-lg flex flex-col items-center space-y-4 overflow-y-auto px-4 py-4 md:px-8">
                    <div className="flex items-center justify-between w-full pt-4">
                        <span className="text-left font-semibold text-2xl tracking-wider">
                            Edit Notice
                        </span>
                        {/* Close Modal */}
                        <span
                            style={{ background: "#303031" }}
                            onClick={() => dispatch({ type: "editNoticeModalClose" })}
                            className="cursor-pointer text-gray-100 py-2 px-2 rounded-full"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </span>
                    </div>

                    {/* Title Field */}
                    <div className="flex flex-col space-y-1 w-full">
                        <label htmlFor="title">Notice Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="px-4 py-2 border focus:outline-none"
                            name="title"
                            id="title"
                        />
                    </div>

                    {/* Description Field */}
                    <div className="flex flex-col space-y-1 w-full">
                        <label htmlFor="description">Notice Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="px-4 py-2 border focus:outline-none"
                            name="description"
                            id="description"
                            cols={5}
                            rows={5}
                        />
                    </div>

                    {/* Time Field */}
                    <div className="flex flex-col space-y-1 w-full">
                        <label htmlFor="time">Notice Time</label>
                        <input
                            type="datetime-local"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="px-4 py-2 border focus:outline-none"
                            name="time"
                            id="time"
                        />
                    </div>

                    {/* Save Button */}
                    <div className="flex flex-col space-y-1 w-full pb-4 md:pb-6">
                        <button
                            style={{ background: "#303031" }}
                            onClick={submitForm}
                            className="rounded-full bg-gray-800 text-gray-100 text-lg font-medium py-2"
                        >
                            Save Notice
                        </button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default EditNoticeModal;
