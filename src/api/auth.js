import request from '@/utils/request'
import qs from 'qs'

export const getVerificationCode = () =>
    request({
        url: 'auth/verificationCode',
        method: 'GET'
    })

export const login = (username, password) =>
    request({
        url: '/auth/login',
        method: 'post',
        data: qs.stringify({
            username,
            password
        })
    })