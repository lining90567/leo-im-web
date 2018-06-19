import request from '@/utils/request'

export const listMessage = (channelId, maxCreateAt, limit) =>
    request({
        url: '/messages',
        method: 'GET',
        params: {
            channelId: channelId,
            maxCreateAt: maxCreateAt,
            limit: limit
        }
    })

export const saveMessage = (message) =>
    request({
        url: '/messages',
        method: 'POST',
        data: message
    })

export const readMessage = (channelId, total) =>
    request({
        url: '/messages/read',
        method: 'POST',
        data: {
            channelId: channelId,
            total: total
        }
    })

export const removeMessage = (messageId, channelId, toUserId) =>
    request({
        url: '/messages',
        method: 'DELETE',
        data: {
            messageId: messageId,
            channelId: channelId,
            toUserId: toUserId
        }
    })