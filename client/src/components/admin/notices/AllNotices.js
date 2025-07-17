import moment from "moment";
import React, { Fragment, useContext, useEffect } from "react";
import { deleteNotice, getAllNotices } from "./fetchApi";
import { NoticeContext } from "./index";

const apiURL = process.env.REACT_APP_API_URL;

const AllNotices = (props) => {
    const { data, dispatch } = useContext(NoticeContext);
    const { notices, loading } = data;

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchData = async () => {
        dispatch({ type: "loading", payload: true });
        let responseData = await getAllNotices();
        setTimeout(() => {
            if (responseData && responseData.notices) {
                dispatch({
                    type: "fetchNoticesAndChangeState",
                    payload: responseData.notices,
                });
                dispatch({ type: "loading", payload: false });
            }
        }, 1000);
    };

    const deleteNoticeReq = async (nId) => {
        let deleteN = await deleteNotice(nId);
        if (deleteN.error) {
            console.log(deleteN.error);
        } else if (deleteN.success) {
            console.log(deleteN.success);
            fetchData();
        }
    };

    /* This method call the editmodal & dispatch notice context */
    const editNotice = (nId, title, description, time) => {
        if (title) {
            dispatch({
                type: "editNoticeModalOpen",
                nId: nId,
                title: title,
                description: description,
                time: time,
            });
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center p-8">
                <svg
                    className="w-12 h-12 animate-spin text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    ></path>
                </svg>
            </div>
        );
    }

    return (
        <Fragment>
            <div className="col-span-1 overflow-auto bg-white shadow-lg p-4">
                <table className="table-auto border w-full my-2">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border">Title</th>
                            <th className="px-4 py-2 border">Description</th>
                            <th className="px-4 py-2 border">Time</th>
                            <th className="px-4 py-2 border">Created at</th>
                            <th className="px-4 py-2 border">Updated at</th>
                            <th className="px-4 py-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notices && notices.length > 0 ? (
                            notices.map((item, key) => {
                                return (
                                    <NoticeTable
                                        notice={item}
                                        editNotice={(nId, title, description, time) =>
                                            editNotice(nId, title, description, time)
                                        }
                                        deleteNotice={(nId) => deleteNoticeReq(nId)}
                                        key={key}
                                    />
                                );
                            })
                        ) : (
                            <tr>
                                <td
                                    colSpan="6"
                                    className="text-xl text-center font-semibold py-8"
                                >
                                    No notice found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className="text-sm text-gray-600 mt-2">
                    Total {notices && notices.length} notices found
                </div>
            </div>
        </Fragment>
    );
};

/* Single Notice Component */
const NoticeTable = ({ notice, deleteNotice, editNotice }) => {
    return (
        <Fragment>
            <tr>
                <td className="p-2 text-left">
                    {notice.title.length > 20
                        ? notice.title.slice(0, 20) + "..."
                        : notice.title}
                </td>
                <td className="p-2 text-left">
                    {notice.description.length > 30
                        ? notice.description.slice(0, 30) + "..."
                        : notice.description}
                </td>
                <td className="p-2 text-center">
                    {moment(notice.time).format("YYYY-MM-DD HH:mm:ss")}  {/* Notice time */}
                </td>
                <td className="p-2 text-center">
                    {moment(notice.createdAt).format("YYYY-MM-DD HH:mm:ss")}  {/* Full date and time */}
                </td>
                <td className="p-2 text-center">
                    {moment(notice.updatedAt).format("YYYY-MM-DD HH:mm:ss")}  {/* Full date and time */}
                </td>
                <td className="p-2 flex items-center justify-center">
                    <span
                        onClick={(e) =>
                            editNotice(
                                notice._id,
                                notice.title,
                                notice.description,
                                notice.time
                            )
                        }
                        className="cursor-pointer hover:bg-gray-200 rounded-lg p-2 mx-1"
                    >
                        <svg
                            className="w-6 h-6 fill-current text-green-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                            <path
                                fillRule="evenodd"
                                d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </span>
                    <span
                        onClick={(e) => deleteNotice(notice._id)}
                        className="cursor-pointer hover:bg-gray-200 rounded-lg p-2 mx-1"
                    >
                        <svg
                            className="w-6 h-6 fill-current text-red-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </span>
                </td>
            </tr>
        </Fragment>
    );
};

export default AllNotices;
