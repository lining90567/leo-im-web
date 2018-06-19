<template>
  <div class="container" v-loading="loadingVisible">
    <div class="header">
      <div class="title-container">
        <span>
          <div class="title">
            <el-dropdown trigger="click" @command="handleCommand">
              <span class="el-dropdown-link channel-title">
                <strong>{{ userChannel.channelName }}</strong>
                <svg id="dropdown-icon" t="1528208466548" viewBox="0 0 1024 1024" version="1.1"><path d="M517.688889 796.444444c-45.511111 0-85.333333-17.066667-119.466667-51.2L73.955556 381.155556c-22.755556-22.755556-17.066667-56.888889 5.688888-79.644445 22.755556-22.755556 56.888889-17.066667 79.644445 5.688889l329.955555 364.088889c5.688889 5.688889 17.066667 11.377778 28.444445 11.377778s22.755556-5.688889 34.133333-17.066667l312.888889-364.088889c22.755556-22.755556 56.888889-28.444444 79.644445-5.688889 22.755556 22.755556 28.444444 56.888889 5.688888 79.644445L637.155556 739.555556c-28.444444 39.822222-68.266667 56.888889-119.466667 56.888888 5.688889 0 0 0 0 0z" p-id="1094" fill="#111111"></path></svg>
                <svg id="dropdown-icon-selected" t="1528208466548" viewBox="0 0 1024 1024" version="1.1"><path d="M517.688889 796.444444c-45.511111 0-85.333333-17.066667-119.466667-51.2L73.955556 381.155556c-22.755556-22.755556-17.066667-56.888889 5.688888-79.644445 22.755556-22.755556 56.888889-17.066667 79.644445 5.688889l329.955555 364.088889c5.688889 5.688889 17.066667 11.377778 28.444445 11.377778s22.755556-5.688889 34.133333-17.066667l312.888889-364.088889c22.755556-22.755556 56.888889-28.444444 79.644445-5.688889 22.755556 22.755556 28.444444 56.888889 5.688888 79.644445L637.155556 739.555556c-28.444444 39.822222-68.266667 56.888889-119.466667 56.888888 5.688889 0 0 0 0 0z" p-id="1094" fill="#418FD6"></path></svg>
              </span>
              <el-dropdown-menu slot="dropdown">
                <template v-if="userChannel.channelType === 'G'">
                  <template v-if="isAdmin">
                    <el-dropdown-item command="addMember">添加成员</el-dropdown-item>
                    <el-dropdown-item command="manageMember">成员管理</el-dropdown-item>
                    <el-dropdown-item command="editTitle" divided>编辑频道标题</el-dropdown-item>
                    <el-dropdown-item command="editName">重命名频道</el-dropdown-item>
                    <el-dropdown-item command="remove" v-if="myId === userChannel.creatorId">删除频道</el-dropdown-item>
                  </template>
                  <template v-else>
                    <el-dropdown-item command="editTitle">编辑频道标题</el-dropdown-item>
                  </template>
                  <el-dropdown-item command="leave" divided v-if="myId !== userChannel.creatorId">离开频道</el-dropdown-item>
                </template>
                <template v-else>
                  <el-dropdown-item command="editTitle">编辑频道标题</el-dropdown-item>
                </template>
              </el-dropdown-menu>   
            </el-dropdown>        
            <div v-if="userChannel.channelType === 'P'">
              <status-online-icon v-if="userChannel.toUserOnlineStatus === 'online'" :text="userChannel.channelName === userChannel.channelDisplayName ? '在线' : '在线 • ' + userChannel.channelDisplayName"></status-online-icon>
              <status-away-icon v-else-if="userChannel.toUserOnlineStatus === 'away'" text="离开"></status-away-icon>
              <status-offline-icon v-else="userChannel.toUserOnlineStatus === 'offline'" text="离线"></status-offline-icon>
            </div>
            <div v-else>
              <div class="display-name">{{ userChannel.channelDisplayName }}</div>
            </div>
          </div>
        </span>
        <edit-channel-title ref="editChannelTitleDlg" @onEditTitleFinished="onEditTitleFinished"></edit-channel-title>
        <edit-channel-name ref="editChannelNameDlg" @onEditNameFinished="onEditNameFinished"></edit-channel-name>
        <add-member ref="addChannelMemberDlg" :channel-id="userChannel.channelId" :channel-name="userChannel.channelName"></add-member>
        <member-list ref="memberListDlg" :channel-id="userChannel.channelId" :channel-name="userChannel.channelName"></member-list>
        <member-management ref="memberManagementDlg" :channel-id="userChannel.channelId" :channel-name="userChannel.channelName" @onOpenAddMemberDlg="doOpenAddMemberDlg"></member-management>
        <div v-if="userChannel.channelType === 'G'" class="members-container" @click="showMemberList">
          <div class="members">
            <div>{{ userChannel.memberCount }}</div>
            <svg width="14px" height="14px" viewBox="0 0 16 16"><g id="Symbols" stroke="none" stroke-width="1" fill="inherit" fill-rule="evenodd"><g id="Channel-Header/Web-HD" transform="translate(-725.000000, -32.000000)" fill-rule="nonzero" fill="inherit"><g id="Channel-Header"><g id="user-count" transform="translate(676.000000, 22.000000)"><path d="M64.9481342,24 C64.6981342,20.955 63.2551342,19.076 60.6731342,18.354 C61.4831342,17.466 61.9881342,16.296 61.9881342,15 C61.9881342,12.238 59.7501342,10 56.9881342,10 C54.2261342,10 51.9881342,12.238 51.9881342,15 C51.9881342,16.297 52.4941342,17.467 53.3031342,18.354 C50.7221342,19.076 49.2771342,20.955 49.0271342,24 C49.0161342,24.146 49.0061342,24.577 49.0001342,25.001 C48.9911342,25.553 49.4361342,26 49.9881342,26 L63.9881342,26 C64.5411342,26 64.9851342,25.553 64.9761342,25.001 C64.9701342,24.577 64.9601342,24.146 64.9481342,24 Z M56.9881342,12 C58.6421342,12 59.9881342,13.346 59.9881342,15 C59.9881342,16.654 58.6421342,18 56.9881342,18 C55.3341342,18 53.9881342,16.654 53.9881342,15 C53.9881342,13.346 55.3341342,12 56.9881342,12 Z M51.0321342,24 C51.2981342,21.174 52.7911342,20 55.9881342,20 L57.9881342,20 C61.1851342,20 62.6781342,21.174 62.9441342,24 L51.0321342,24 Z" id="User_4_x2C__Profile_5-Copy-9"></path></g></g></g></g></svg>
          </div>
        </div>
      </div>
    </div>
    <div class="body-container" v-if="$store.getters.imClient">
      <div class="body">
        <message-list ref="messageList" :channel-id="$route.params.channelId" :user-channel="userChannel"></message-list>
      </div>
    </div>
    <div class="footer">
      <send-message :channel-id="$route.params.channelId" :channel-type="$route.params.channelType" @onMessageSent="showSentMessage"></send-message>
    </div>
  </div>
</template>

<script>
import { outputError } from '@/utils/exception'
import { getUserChannel, isAdmin, leaveChannel, removeChannel } from '@/api/channel'
import StatusOnlineIcon from '@/components/svg/statusOnlineIcon'
import StatusOfflineIcon from '@/components/svg/statusOfflineIcon'
import StatusAwayIcon from '@/components/svg/statusAwayIcon'
import MessageList from '../message/messageList'
import SendMessage from '../message/sendMessage'

export default {
  data() {
    return {
      loadingVisible: false,
      userChannel: {},
      sentMessage: null,
      isAdmin: false,
      myId: JSON.parse(sessionStorage.getItem('currentUser')).id
    }
  },
  methods: {
    showSentMessage(message) {
      this.$refs.messageList.showSentMessage(message)
    },
    initPage() {
      if(this.$route.params.channelId === undefined) {
        return
      }

      this.loadingVisible = true
      const channelId = this.$route.params.channelId
      this.$store.dispatch('setCurrentChannelId', channelId)
      this.initIMClient()
      getUserChannel(this.myId, channelId)
      .then(response => {   
        this.userChannel = response.data
        if (this.userChannel.channelType === 'G') {
          isAdmin(channelId)
          .then(response => {
            this.isAdmin = response.data
            this.loadingVisible = false
          })
          .catch(error => {
            this.loadingVisible = false
            outputError(this, error)
          })          
        } else {
          this.loadingVisible = false
        }
      })
      .catch(error => {
        this.loadingVisible = false
        outputError(this, error)
      })
    },
    onMembersCountChanged(message) {
      if(this.$route.params.channelId === message.channelId) {
        this.userChannel.memberCount += message.count
      }
    },
    initIMClient() {
      let st = setTimeout(() =>  {
        let imClient = this.$store.getters.imClient
        if(imClient != null) {
          imClient.bindMembersCountChanged(this.onMembersCountChanged)
          clearTimeout(st)
        }
      }, 500)
    },
    handleCommand(command) {
      switch(command) {
        case 'addMember':
          this.$refs.addChannelMemberDlg.$emit('openDialog', this.userChannel)    
          break;        
        case 'editTitle':
          this.$refs.editChannelTitleDlg.$emit('openDialog', this.userChannel)          
          break;
        case 'editName':
          this.$refs.editChannelNameDlg.$emit('openDialog', this.userChannel)          
          break;
        case 'manageMember':
          this.$refs.memberManagementDlg.$emit('openDialog', this.userChannel)          
          break
        case 'leave':
          this.doLeaveChannel(this.userChannel)
          break
        case 'remove':
          this.doRemoveChannel(this.userChannel.channelId)
          break
      }
    },
    doOpenAddMemberDlg() {
      this.$refs.addChannelMemberDlg.$emit('openDialog', this.userChannel)
    },
    doLeaveChannel(userChannel) {
      this.$confirm('确定离开该频道吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
         type: 'warning'
      }).then(_ => {
        this.loadingVisible = true
        let currentUser = JSON.parse(sessionStorage.getItem('currentUser'))
        leaveChannel(userChannel.channelId, currentUser.id, currentUser.nickname)
        .then(_ => {
          if(this.$route.params.leaveChannelCallback !== undefined) {
            this.$route.params.leaveChannelCallback(userChannel.channelId)
          }          
          this.loadingVisible = false
        })
        .catch(error => {
          this.loadingVisible = false
          outputError(this, error)        
        })
      }).catch(_ => {
      })
    },
    doRemoveChannel(channelId) {
      this.$confirm('确定删除该频道吗？删除后将无法浏览该频道的任何消息！', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
         type: 'warning'
      }).then(_ => {
        this.loadingVisible = true
        let currentUser = JSON.parse(sessionStorage.getItem('currentUser'))
        removeChannel(channelId, currentUser.id)
        .then(response => {
          if(response.data > 0 && this.$route.params.removeChannelCallback !== undefined) {
            this.$route.params.removeChannelCallback(channelId)
          }          
          this.loadingVisible = false
        })
        .catch(error => {
          this.loadingVisible = false
          outputError(this, error)        
        })
      }).catch(_ => {
      })      
    },
    onEditTitleFinished(newTitle) {
      this.userChannel.channelDisplayName = newTitle
    },
    onEditNameFinished(newName) {
      this.userChannel.channelName = newName
    },
    showMemberList() {
      this.$refs.memberListDlg.$emit('openDialog')
    }
  },
  created() {
    this.initPage()
  },
  watch: {
    '$route': 'initPage'
  },
  components: { StatusOnlineIcon, StatusOfflineIcon, StatusAwayIcon, MessageList, SendMessage,
    EditChannelTitle: resolve => require(['@/components/userChannel/editChannelTitle'], resolve),
    EditChannelName: resolve => require(['@/components/channel/editChannelName'], resolve),
    AddMember: resolve => require(['@/components/channel/addMember'], resolve),
    MemberList: resolve => require(['@/components/channel/memberList'], resolve),
    MemberManagement: resolve => require(['@/components/channel/manageMember'], resolve),
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: column;
  flex-direction: column;
  background: #fff;
  height: 100%;
  width: 100%;
  position: relative;

  .header {
    -webkit-flex: 0 0 69px;
    flex: 0 0 69px;
    border-bottom: 1px solid;
    font-size: 14px;
    position: relative;
    width: 100%;
    z-index: 9;
    border-bottom: solid 1px #DBD9D6;

    .title-container {
      min-width: 0px;
      flex: 1 1 0%;
      margin-top: 14px;
      padding-left: 8px;
      vertical-align: middle;
      span {
        background: transparent;
        border: none;
        padding: 0;
        text-align: left;
        cursor: pointer;
      }
      .title {
        font-size: 17px;
        flex: 1;
        min-width: 0;
        padding: 0 0 0 10px;
        float: left;
        strong {
          font-size: 17px;
        }
        svg {
          margin: 0 0 0 3px;
          width: 13px;
          height: 13px;
        }
        #dropdown-icon-selected {
          display: none;
        }
        .channel-title:hover {
          color: #418FD6;
          #dropdown-icon {
            display: none;
          }
          #dropdown-icon-selected {
            display: inline;
          }
        }
      }
      .display-name {
        margin-top: 3px;
        font-size: 14px;
      }
      .members-container {
        float: right;
        padding: 0 50px 0 0;
        .members {
          border-radius: 20px;
          margin-top: 5px;
          padding: 6px 23px;
          border: 1px solid #dcdfe6;
          vertical-align: middle;
          div {
            float: left;
            margin-right: 6px;
            font-weight: bold;
            color: #B7B3AD;
          }
          svg {
            width: 16px;
            height: 16px;
            margin-top: 1px;
            fill: #B7B3AD;
          }
        }
        .members:hover {
          cursor: pointer;
          border: 1px solid #319EDD;
          div {
            color: #319EDD;
          }
          svg {
            fill: rgb(35, 137, 215);
          }
        }        
      }
    }     
  }

  .body-container {
    -webkit-flex: 1 1 auto;
    flex: 1 1 auto;
    height: 100%;
    width: 100%;
    overflow: hidden;
    position: relative;
    .body {
      -webkit-overflow-scrolling: touch;
      height: 100%;
      width: 100%;
      overflow-y: hidden;
      overflow-x: hidden;
      position: absolute;   
    }
  }

  .footer {
    -webkit-flex: 0 0 auto;
    flex: 0 0 auto;
    height: 156px;
    width: 100%;
    z-index: 5;
  }
}
</style>

