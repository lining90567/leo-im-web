export class IMClient {
  constructor(url, heartChecknterval) {
    this.url = url
    this.heartChecknterval = heartChecknterval
    this.currentChannelId = ''
  }

  connect(callback) {
    this.connectCallback = callback
    this.conn = new WebSocket(this.url)

    this.conn.onopen = () => {
      this.connected = true
      this.onOpen()
    }

    this.conn.onclose = () => {
      this.connected = false
      this.onClose()
    }

    this.conn.onerror = (event) => {
      this.onError(event)
    }

    this.conn.onmessage = (event) => {
      this.onMessage(event.data)
    }
  }

  heartCheckUtil = {
    start: () => {
      this.heartCheckObj = setTimeout(() => {
        if (this.conn && this.conn.readyState === 1) {
          this.conn.send('')
        }
      }, this.heartChecknterval)
    },

    reset: () => {
      clearTimeout(this.heartCheckObj)
      this.heartCheckUtil.start()
    },

    stop: () => {
      if (this.heartCheckObj) {
        clearTimeout(this.heartCheckObj)
      }
    }
  }

  reconnectUtil = {
    start: () => {
      this.reconnectObj = setTimeout(() => {
        // 已经关闭了与服务器的连接
        if (this.conn.readyState == 3) {
          this.reconnectStarting = true
          this.connect()
        }
      }, 5000)
    },

    stop: () => {
      this.reconnectStarting = false
      if (this.reconnectObj) {
        clearTimeout(this.reconnectObj)
        this.reconnectObj = null
      }
    }
  }

  onOpen() {
    if(this.connectCallback != null) {
      this.connectCallback(this)
    }
    const reconnectStarting = this.reconnectStarting
    this.reconnectUtil.stop()
    if (reconnectStarting && this.handleReconnectSuccessed) {
      this.handleReconnectSuccessed()
    }
    if(this.handleUserOnline) {
      this.handleUserOnline()
    }
    this.heartCheckUtil.start()
  }

  onClose() {
    this.heartCheckUtil.stop()
    this.reconnectUtil.start()
    if(this.handleConnectionClosed) {
      this.handleConnectionClosed()
    }
    if(this.handleUserOffline) {
      this.handleUserOffline()
    }
  }

  onError(error) {
    console.error(error)
  }

  onMessage(message) {
    if (message !== '') {
      this.handleMessage(JSON.parse(message))
    }
    this.heartCheckUtil.reset()
  }

  send(message) {
    if (this.connected) {
      this.conn.send(message)
      this.heartCheckUtil.reset()
    }
  }

  handleMessage(message) {
    switch (message.action) {
      case "ONLINE_STATUS_CHANGED":
        if (this.handleOnlineStatusChanged) {
          this.handleOnlineStatusChanged(message)
        }
        if(this.handleUserOnlineStatusChanged) {
          this.handleUserOnlineStatusChanged(message)
        }
        break
      case "NICKNAME_CHANGED":
        if (this.handleNicknameChanged) {
          this.handleNicknameChanged(message)
        }
        break
      case "AVATAR_CHANGED":
        if (this.handleAvatarChanged) {
          this.handleAvatarChanged(message)
        }
        break
      case "NEW_MESSAGE":
        if (this.handleNewMessage) {
          this.handleNewMessage(message)
        }
        if (this.handleUnreadMessage) {
          this.handleUnreadMessage(message)
        }
        break
      case "READ_MESSAGE":
        if(this.handleReadMessage) {
          this.handleReadMessage(message)
        }
        break
      case "JOIN_CHANNEL":
        if(this.handleJoinChannel) {
          this.handleJoinChannel(message)
        }
        break
      case "MESSAGE_REMOVED":
        if(this.handleMessageRemoved) {
          this.handleMessageRemoved(message)
        }
        break
      case "CHANNEL_NAME_CHANGED":
        if(this.handleChannelNameChanged) {
          this.handleChannelNameChanged(message)
        }
        break
      case "MEMBERS_COUNT_CHANGED":
        if(this.handleMembersCountChanged) {
          this.handleMembersCountChanged(message)
        }
        break
      case "REMOVE_FROM_CHANNEL":
        if(this.handleRemoveFromChannel) {
          this.handleRemoveFromChannel(message)
        }
        break
      case "LEAVE_CHANNEL":
        if(this.handleLeaveChannel) {
          this.handleLeaveChannel(message)
        }
        break
      case "CHANNEL_REMOVED":
        if(this.handleChannelRemoved) {
          this.handleChannelRemoved(message)
        }
        break
    }
  }

  bindOnlineStatusChanged(callback) {
    this.handleOnlineStatusChanged = callback
  }
  unbindOnlineStatusChanged() {
    this.handleOnlineStatusChanged = null
  }

  bindNicknameChanged(callback) {
    this.handleNicknameChanged = callback
  }
  unbindNicknameChanged() {
    this.handleNicknameChanged = null
  }

  bindAvatarChanged(callback) {
    this.handleAvatarChanged = callback
  }
  unbindAvatarChanged() {
    this.handleAvatarChanged = null
  }

  bindNewMessage(callback) {
    this.handleNewMessage = callback
  }
  unbindNewMesssage() {
    this.handleNewMessage = null
  }

  bindConnectionClosed(callback) {
    this.handleConnectionClosed = callback
  }
  unbindConnectionClosed() {
    this.handleConnectionClosed = null
  }

  bindReconnectSuccessed(callback) {
    this.handleReconnectSuccessed = callback
  }
  unbindReconnectSuccessed() {
    this.handleReconnectSuccessed = null
  }

  bindUnreadMessage(callback) {
    this.handleUnreadMessage = callback
  }
  unbindUnreadMessage() {
    this.handleUnreadMessage = null
  }

  bindReadMessage(callback) {
    this.handleReadMessage = callback
  }
  unbindReadMessage() {
    this.handleReadMessage = null
  }

  bindJoinChannel(callback) {
    this.handleJoinChannel = callback
  }
  unbindJoinChannel() {
    this.handleJoinChannel = null
  }

  bindUserOnlineStatusChanged(callback) {
    this.handleUserOnlineStatusChanged = callback
  }
  unbindUserOnlineStatusChanged() {
    this.handleUserOnlineStatusChanged = null
  }

  bindMessageRemoved(callback) {
    this.handleMessageRemoved = callback
  }
  unbindMessageRemoved() {
    this.handleMessageRemoved = null
  }

  bindChannelNameChanged(callback) {
    this.handleChannelNameChanged = callback
  }
  unbindChannelNameChanged() {
    this.handleChannelNameChanged = null
  }

  bindMembersCountChanged(callback) {
    this.handleMembersCountChanged = callback
  }
  unbindMembersCountChanged() {
    this.handleMembersCountChanged = null
  }

  bindRemoveFromChannel(callback) {
    this.handleRemoveFromChannel = callback
  }
  unbindRemoveFromChannel() {
    this.handleRemoveFromChannel = null
  }

  bindLeaveChannel(callback) {
    this.handleLeaveChannel = callback
  }
  unbindLeaveChannel() {
    this.handleLeaveChannel = null
  }

  bindChannelRemoved(callback) {
    this.handleChannelRemoved = callback
  }
  unbindChannelRemoved() {
    this.handleChannelRemoved = null
  }

  bindUserOnline(callback) {
    this.handleUserOnline = callback
  }
  unbindUserOnline() {
    this.handleUserOnline = null
  }

  bindUserOffline(callback) {
    this.handleUserOffline = callback
  }
  unbindUserOffline() {
    this.handleUserOffline = null
  }

}