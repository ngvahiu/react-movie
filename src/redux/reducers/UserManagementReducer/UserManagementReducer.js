import { OPEN_USER_MODAL, CLOSE_USER_MODAL, GET_USER_LIST, SET_INFOR_EDIT, RESET_INFOR_EDIT } from "./UserManagementTypes";

const initialState = {
    userList: [],
    openModal: false,
    purpose: '',
    inforToEdit: {}
}

export const UserManagementReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_LIST: {
            return { ...state, userList: action.payload };
        }
        case OPEN_USER_MODAL: {
            return { ...state, openModal: true, purpose: action.purpose };
        }
        case CLOSE_USER_MODAL: {
            return { ...state, openModal: false, purpose: '' };
        }
        case SET_INFOR_EDIT: {
            return { ...state, inforToEdit: action.payload };
        }
        case RESET_INFOR_EDIT: {
            return { ...state, inforToEdit: null};
        }
        default:
            return state;
    }
}