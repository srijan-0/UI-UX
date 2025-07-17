import React, { Fragment, createContext, useReducer } from "react";
import AdminLayout from "../layout"; // Assuming the layout is common for both Categories and Notices
import AllNotices from "./AllNotices"; // Your component for displaying all notices
import { noticeReducer, noticeState } from "./NoticeContext"; // Import the NoticeContext and reducer
import NoticeMenu from "./NoticeMenu"; // Your notice menu component

/* This context manages all the notices component's data */
export const NoticeContext = createContext();

const NoticeComponent = () => {
    return (
        <div className="grid grid-cols-1 space-y-4 p-4">
            <NoticeMenu />  {/* Menu for adding or editing notices */}
            <AllNotices />  {/* Displays all the notices */}
        </div>
    );
};

export const Notices = (props) => {
    const [data, dispatch] = useReducer(noticeReducer, noticeState); // Using the noticeReducer and initial state
    return (
        <Fragment>
            <NoticeContext.Provider value={{ data, dispatch }}>
                <AdminLayout children={<NoticeComponent />} />
            </NoticeContext.Provider>
        </Fragment>
    );
};

export default Notices;
