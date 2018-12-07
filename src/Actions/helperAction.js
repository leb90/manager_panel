import {
    RESPONSIVE,
    NO_RESPONSIVE,
    SHOW_ALERT,
    SHOW_MODAL,
    CLOSE_ALERT,
    CLOSE_MODAL
} from "../Constants/index";

export const responsive = () => {
    return {
        type: RESPONSIVE
    };
};
export const noResponsive = () => {
    return {
        type: NO_RESPONSIVE
    };
};

export const showAlert = () => {
    return {
        type: SHOW_ALERT
    };
};

export const showModal = () => {
    return {
        type: SHOW_MODAL
    };
};
export const closeAlert = () => {
    return {
        type: CLOSE_ALERT
    };
};
export const closeModal = () => {
    return {
        type: CLOSE_MODAL
    };
};
