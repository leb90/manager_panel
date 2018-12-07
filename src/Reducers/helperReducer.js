import {
    RESPONSIVE,
    NO_RESPONSIVE,
    SHOW_ALERT,
    SHOW_MODAL,
    CLOSE_ALERT,
    CLOSE_MODAL
} from "../Constants";

const initialState = {
    responsive: false,
    showAlert: false,
    showModal: false
};

const helperReducer = (state = initialState, action) => {
    switch (action.type) {
        case RESPONSIVE:
            return {
                ...state,
                responsive: true
            };
        case NO_RESPONSIVE:
            return {
                ...state,
                responsive: false
            };
        case SHOW_ALERT:
            return {
                ...state,
                showAlert: true
            };
        case CLOSE_ALERT:
            return {
                ...state,
                showAlert: false
            };

        case SHOW_MODAL:
            return {
                ...state,
                showModal: true
            };
        case CLOSE_MODAL:
            return {
                ...state,
                showModal: false
            };

        default:
            return state;
    }
};

export default helperReducer;
