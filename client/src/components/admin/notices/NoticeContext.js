import React, { createContext, useReducer } from "react";

// Initial State for the notices
export const noticeState = {
    notices: [],
    AddNoticeModal: false,
    editNoticeModal: {
        modal: false,
        nId: null,
        title: "",
        description: "",
        time: "",
    },
    loading: false,
};

// Reducer for handling actions related to notices
export const noticeReducer = (state, action) => {
    switch (action.type) {
        // Fetch all notices and update the state
        case "fetchNoticesAndChangeState":
            return {
                ...state,
                notices: action.payload,
            };
        // Open/close add notice modal
        case "AddNoticeModal":
            return {
                ...state,
                AddNoticeModal: action.payload,
            };
        // Open edit notice modal with details
        case "editNoticeModalOpen":
            return {
                ...state,
                editNoticeModal: {
                    modal: true,
                    nId: action.nId,
                    title: action.title,
                    description: action.description,
                    time: action.time,
                },
            };
        // Close edit notice modal
        case "editNoticeModalClose":
            return {
                ...state,
                editNoticeModal: {
                    modal: false,
                    nId: null,
                    title: "",
                    description: "",
                    time: "",
                },
            };
        // Set loading state
        case "loading":
            return {
                ...state,
                loading: action.payload,
            };
        default:
            return state;
    }
};

// Create context for notices
export const NoticeContext = createContext();

// Provider to wrap the components that need access to notices
export const NoticeProvider = ({ children }) => {
    const [data, dispatch] = useReducer(noticeReducer, noticeState);

    return (
        <NoticeContext.Provider value={{ data, dispatch }}>
            {children}
        </NoticeContext.Provider>
    );
};
