import Swal from "sweetalert2";
import { deleteUserAPI, getInforUserAPI, getUserListAPI } from "../../../services/ManageUserService";
import { GET_USER_LIST, SET_INFOR_EDIT } from "./UserManagementTypes";

export const setUserListAction = (searchTerm) => {
    return async (dispatch) => {
        try {
            const { content: userList } = await getUserListAPI(searchTerm);

            dispatch({
                type: GET_USER_LIST,
                payload: userList
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export const deleteUserAction = (username) => {
    return async () => {
        try {
            await deleteUserAPI(username);

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Delete user successfully !',
                showConfirmButton: false,
                timer: 1500
            })
        } catch (error) {
            console.log(error);

            Swal.fire({
                icon: 'error',
                title: 'Delete user failed.',
                text: error.response?.data?.content,
                confirmButtonColor: "#ff0000"
            })
        }
    }
}

export const getInforToEditAction = (username) => {
    return async (dispatch) => {
        try {
            const { content: infor } = await getInforUserAPI(username);

            dispatch({
                type: SET_INFOR_EDIT,
                payload: infor
            })
        } catch (error) {
            console.log(error);
        }
    }
}