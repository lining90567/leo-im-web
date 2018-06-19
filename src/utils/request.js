import axios from 'axios'

// 创建axios实例
const service = axios.create({
    // api的base_url
    baseURL: process.env.BASE_API,
    // 请求超时时间
    timeout: 5000,
    // 允许携带cookie
    withCredentials: true
})

// request拦截器
service.interceptors.request.use(config => {
    // Do something before request is sent
    if (sessionStorage.getItem('token')) {
        // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
        config.headers['X-Token'] = sessionStorage.getItem('token')
    }
    return config
}, error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
    response => {
        if (response.data.errCode == 2) {
            router.push({
                path: "/login",
                // 从哪个页面跳转
                querry: { redirect: router.currentRoute.fullPath }
            })
        }
        return response;
    },
    error => {
        return Promise.reject(error)
    })

export default service