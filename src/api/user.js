import request from '@/utils/request'

export const listUser = (name, limit, offset) =>
    request({
        url: '/users',
        method: 'GET',
        params: {
            name: name,
            limit: limit,
            offset: offset
        }
    })

export const updateOnlineStatus = (userId, onlineStatus) => 
    request({
        url: '/users/' + userId,
        method: 'PATCH',
        data: {
            'onlineStatus': onlineStatus
        }
    })

export const getMyInfo = () =>
    request({
        url: '/users/me',
        method: 'GET'
    })

export const updateMyInfo = (userId, nickname, avatarUrl) =>
    request({
        url: '/users/' + userId,
        method: 'PATCH',
        data: {
            nickname: nickname,
            avatarUrl: avatarUrl
        }
    })

export const registerUser = (user) =>
    request({
        url: '/users',
        method: 'POST',
        data: user
    })

export const listNonMembers = (channelId, username, limit, offset) =>
    request({
        url: '/users/nonChannelMembers',
        method: 'GET',
        params: {
            channelId: channelId,
            username: username,
            limit: limit,
            offset: offset
        }        
    })

export const changePassword = (userId, username, oldPassword, newPassword) =>
    request({
        url: '/users/' + userId + '/password',
        method: 'PUT',
        data: {
            username: username,
            oldPassword: oldPassword,
            newPassword: newPassword
        }
    })
