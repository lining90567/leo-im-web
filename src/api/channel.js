import request from '@/utils/request'

export const listUserChannels = (userId, limit) =>
    request({
        url: '/userChannels/' + userId + '?limit=' + limit,
        method: 'GET'
    })

export const getUserChannel = (userId, channelId) =>
    request({
        url: '/userChannels',
        method: 'GET',
        params: {
            userId: userId,
            channelId: channelId
        }
    })

export const getChannelList = () =>
    request({
        url: '/channels/',
        method: 'GET'
    })

export const createChannel = (channel) =>
    request({
        url: '/channels/',
        method: 'post',
        data: channel
    })

export const getChannelById = (id) =>
    request({
        url: '/channels/' + id,
        method: 'GET'
    })

export const isAdmin = (channelId) =>
    request({
        url: '/channels/' + channelId + '/isAdmin',
        method: 'GET'
    })

export const updateUserChannelDisplayName = (channelId, displayName) =>
    request({
        url: '/userChannels/' + channelId,
        method: 'PATCH',
        headers: {
            'Content-type': 'text/xml'
        },
        data: displayName
    })

export const updateChannelName = (channelId, name) =>
    request({
        url: '/channels/' + channelId,
        method: 'PATCH',
        data: {
            name: name
        }
    })

export const updateChannelPurpose = (channelId, purpose) =>
    request({
        url: '/channels/' + channelId,
        method: 'PATCH',
        data: {
            purpose: purpose
        }
    })

export const addMember = (channelId, userIds) => 
    request({
        url: '/channels/' + channelId + '/members',
        method: 'POST',
        data: userIds
    })

export const listMember = (channelId, username, limit, offset) =>
    request({
        url: '/channels/' + channelId + '/members',
        method: 'GET',
        params: {
            username: username,
            limit: limit,
            offset: offset
        }
    })

export const removeMember = (channelId, memberId) =>
    request({
        url: '/channels/' + channelId + '/members',
        method: 'DELETE',
        headers: {
            'Content-type': 'text/xml'
        },                
        data: memberId      
    })

export const changeAdmin = (channelId, memberId, isAdmin) =>
    request({
        url: '/channels/' + channelId + '/admin',
        method: 'PUT',
        data: {
            memberId: memberId,
            isAdmin: isAdmin
        }
    })

export const leaveChannel = (channelId, memberId, memberNickname) =>
    request({
        url: '/channels/' + channelId + '/members/' + memberId,
        method: 'DELETE',
        data: {
            memberNickname: memberNickname
        }
    })

export const removeChannel = (channelId) =>
    request({
        url: '/channels/' + channelId,
        method: 'DELETE',
    })

export const hideChannel = (userId, channelId) =>
    request({
        url: '/userChannels/' + channelId + '/hiding',
        method: 'POST'
    })

export const searchUserChannel = (userId, name) =>
    request({
        url: '/userChannels/' + userId + '/search',
        method: 'GET',
        params: {
            name: name
        }
    })