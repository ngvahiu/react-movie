import axios from "axios"
import { DOMAIN, CYBERSOFT_TOKEN, TOKEN, USER_LOGIN } from '../util/settings/Config'

const axiosService = axios.create({
    baseURL: DOMAIN,
    headers: {
        TokenCybersoft: CYBERSOFT_TOKEN,
    }
});

axiosService.interceptors.request.use((config) => {
    //config chứa thông tin của request từ client gửi lên server (url, params, headers, ...)

    //thêm key Authorization vào headers của request nếu user đã đăng nhập
    const user = JSON.parse(localStorage.getItem(USER_LOGIN));
    if (user) {
        config.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem(TOKEN))}`;
    }

    return config;
});

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        //Xử lý những error chung, VD: Lỗi 401 -> khi accessToken kh còn hợp lệ
        if (error.response.status === 401) {
            localStorage.removeItem(USER_LOGIN);
            localStorage.removeItem(TOKEN);

            window.location.href = "/user/signin";
        }
    }
);

export default axiosService;