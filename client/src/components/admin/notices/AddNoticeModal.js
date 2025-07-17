import React, { Fragment, useContext, useState } from "react";
import { createNotice, getAllNotices } from "./fetchApi";
import { NoticeContext } from "./index";

const AddNoticeModal = (props) => {
    const { data, dispatch } = useContext(NoticeContext);

    const alert = (msg, type) => (
        <div className={`bg-${type}-200 py-2 px-4 w-full`}>{msg}</div>
    );

    const [fData, setFdata] = useState({
        title: "",
        content: "",
        time: "",
        success: false,
        error: false,
    });

    const fetchData = async () => {
        let responseData = await getAllNotices();
        if (responseData.notices) {
            dispatch({
                type: "fetchNoticesAndChangeState",
                payload: responseData.notices,
            });
        }
    };

    if (fData.error || fData.success) {
        setTimeout(() => {
            setFdata((prev) => ({ ...prev, success: false, error: false }));
        }, 2000);
    }

    const submitForm = async (e) => {
        dispatch({ type: "loading", payload: true });
        e.preventDefault();

        try {
            let responseData = await createNotice({
                title: fData.title,
                description: fData.content, // Fixed incorrect variable
                time: fData.time,
            });

            if (responseData.success) {
                fetchData();
                setFdata({
                    title: "",
                    content: "",
                    time: "",
                    success: responseData.success,
                    error: false,
                });

                setTimeout(() => {
                    setFdata({
                        title: "",
                        content: "",
                        time: "",
                        success: false,
                        error: false,
                    });
                }, 2000);
            } else {
                setFdata((prev) => ({ ...prev, success: false, error: responseData.error || "Failed to add notice" }));
            }
        } catch (error) {
            console.error("Error creating notice:", error);
            setFdata((prev) => ({ ...prev, success: false, error: "Error adding notice" }));
        } finally {
            dispatch({ type: "loading", payload: false });
        }
    };

    return (
        <Fragment>
            <div
                onClick={() => dispatch({ type: "AddNoticeModal", payload: false })}
                className={`${data.AddNoticeModal ? "" : "hidden"} fixed top-0 left-0 z-30 w-full h-full bg-black opacity-50`}
            />
            <div className={`${data.AddNoticeModal ? "" : "hidden"} fixed inset-0 m-4 flex items-center z-30 justify-center`}>
                <div className="relative bg-white w-12/12 md:w-3/6 shadow-lg flex flex-col items-center space-y-4 overflow-y-auto px-4 py-4 md:px-8">
                    <div className="flex items-center justify-between w-full pt-4">
                        <span className="text-left font-semibold text-2xl tracking-wider">Add Notice</span>
                        <span
                            style={{ background: "#303031" }}
                            onClick={() => dispatch({ type: "AddNoticeModal", payload: false })}
                            className="cursor-pointer text-gray-100 py-2 px-2 rounded-full"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </span>
                    </div>

                    {fData.error && alert(fData.error, "red")}
                    {fData.success && alert(fData.success, "green")}

                    <form className="w-full" onSubmit={submitForm}>
                        <div className="flex flex-col space-y-1 w-full py-4">
                            <label htmlFor="title">Notice Title</label>
                            <input
                                onChange={(e) => setFdata((prev) => ({ ...prev, title: e.target.value }))}
                                value={fData.title}
                                className="px-4 py-2 border focus:outline-none"
                                type="text"
                                required
                            />
                        </div>

                        <div className="flex flex-col space-y-1 w-full">
                            <label htmlFor="content">Notice Description</label>
                            <textarea
                                onChange={(e) => setFdata((prev) => ({ ...prev, content: e.target.value }))}
                                value={fData.content}
                                className="px-4 py-2 border focus:outline-none"
                                cols={5}
                                rows={5}
                                required
                            />
                        </div>

                        <div className="flex flex-col space-y-1 w-full">
                            <label htmlFor="time">Notice Time</label>
                            <input
                                onChange={(e) => setFdata((prev) => ({ ...prev, time: e.target.value }))}
                                value={fData.time}
                                className="px-4 py-2 border focus:outline-none"
                                type="datetime-local"
                                required
                            />
                        </div>

                        <div className="flex flex-col space-y-1 w-full pb-4 md:pb-6 mt-4">
                            <button
                                style={{ background: "#303031" }}
                                type="submit"
                                className="bg-gray-800 text-gray-100 rounded-full text-lg font-medium py-2"
                            >
                                Create Notice
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default AddNoticeModal;
