import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { EDIT_INFORMATION, GET_INFORMATION, SIGN_IN, SIGN_UP } from './userSliceTypes'
import { editInforAccountAPI, getInforAccountAPI, singInAPI, singUpAPI } from '../../../../services/ManageUserService';
import { INFORMATION, TOKEN, USER_LOGIN } from '../../../../util/settings/Config';
import Swal from 'sweetalert2';

//async actions
export const SignInAction = createAsyncThunk(SIGN_IN, async (values) => {
    try {
        const { content: userInfor } = await singInAPI(values);

        return userInfor;
    } catch (error) {
        throw error.response?.data?.content;
    }
})

export const SignUpAction = createAsyncThunk(SIGN_UP, async (values) => {
    try {
        const { content: userInfor } = await singUpAPI(values);

        return userInfor;
    } catch (error) {
        throw error.response?.data?.content;
    }
})

export const getInformationAction = createAsyncThunk(GET_INFORMATION, async () => {
    try {
        const { content: information } = await getInforAccountAPI();

        return information;
    } catch (error) {
        throw error.response?.data?.content;
    }
})


export const editInformationAction = createAsyncThunk(EDIT_INFORMATION, async (values) => {
    try {
        const { content: information } = await editInforAccountAPI(values);

        return information;
    } catch (error) {
        throw error.response?.data?.content;
    }
})

function setupUser() {
    if (localStorage.getItem(USER_LOGIN)) {
        return JSON.parse(localStorage.getItem(USER_LOGIN));
    } else {
        return null;
    }
}
const initialState = {
    user: setupUser(),
    information: null,
    isLoading: null,
    error: null,
    userSignUp: null,
    profileTab: 1
};

const userSlice = createSlice({
    name: "USER",
    initialState,
    reducers: {
        logOut: (state) => {
            localStorage.removeItem(USER_LOGIN);
            localStorage.removeItem(INFORMATION);
            localStorage.removeItem(TOKEN);

            return { ...state, user: null, information: null };
        },
        resetSignUp: (state) => {
            return { ...state, isLoading: false, userSignUp: null, error: null };
        },
        changeTab: (state, action) => {
            return { ...state, profileTab: action.payload };
        }
    },
    extraReducers: (builder) => {
        builder.addCase(SignInAction.pending, state => {
            return { ...state, isLoading: true, error: null };
        });
        builder.addCase(SignInAction.fulfilled, (state, action) => {
            localStorage.setItem(USER_LOGIN, JSON.stringify(action.payload));
            localStorage.setItem(TOKEN, JSON.stringify(action.payload.accessToken));

            return { ...state, isLoading: false, user: action.payload, error: null };
        });
        builder.addCase(SignInAction.rejected, (state, action) => {
            return { ...state, isLoading: false, error: action.error.message };
        });

        builder.addCase(SignUpAction.pending, state => {
            return { ...state, isLoading: true, error: null };
        });
        builder.addCase(SignUpAction.fulfilled, (state, action) => {
            return { ...state, isLoading: false, userSignUp: action.payload, error: null };
        });
        builder.addCase(SignUpAction.rejected, (state, action) => {
            return { ...state, isLoading: false, userSignUp: null, error: action.error.message };
        });

        builder.addCase(getInformationAction.pending, state => {
            return { ...state, isLoading: true, error: null };
        });
        builder.addCase(getInformationAction.fulfilled, (state, action) => {
            localStorage.setItem(INFORMATION, JSON.stringify({
                taiKhoan: action.payload.taiKhoan,
                matKhau: action.payload.matKhau,
                email: action.payload.email,
                soDT: action.payload.soDT,
                maNhom: action.payload.maNhom,
                maLoaiNguoiDung: action.payload.maLoaiNguoiDung,
                hoTen: action.payload.hoTen
            }));

            return { ...state, isLoading: false, information: action.payload, error: null };
        });
        builder.addCase(getInformationAction.rejected, (state, action) => {
            return { ...state, isLoading: false, information: null, error: action.error.message };
        });

        builder.addCase(editInformationAction.pending, state => {
            return { ...state, isLoading: true, error: null };
        });
        builder.addCase(editInformationAction.fulfilled, async (state, action) => {
            await Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Edit profile successfully !',
                showConfirmButton: false,
                timer: 1500
            })

            localStorage.setItem(INFORMATION, JSON.stringify(action.payload));
            return { ...state, isLoading: false, information: action.payload, error: null };
        });
        builder.addCase(editInformationAction.rejected, (state, action) => {
            return { ...state, isLoading: false, error: action.error.message };
        });
    }
})

export const { logOut, resetSignUp, changeTab } = userSlice.actions;

export default userSlice.reducer;