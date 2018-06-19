<template>
  <el-dialog :visible.sync="dialogVisible" width="470px" v-loading="showLoading" @open="handleDialogOpen()">
    <div slot="title" class="dialog-header"><h3>创建私聊</h3></div>
    <el-form size="small">
      <el-form-item>
        <el-col :span="16">
          <div class="search-input-container"><el-input ref="username" placeholder="搜索用户" v-model="searchParams.username"></el-input></div>
          <div class="search-button-container"><el-button type="primary" icon="el-icon-search" @click="doSearchUser()"></el-button></div>
        </el-col>
      </el-form-item>
    </el-form>
    <div class="user-list-container">
      <div class="user-container" v-for="(item, index) in this.pagingUserList.rows" :key="item.id" :class="{'selected-user' : selectedIndex === index}" @click="selectUser(item, index)">
        <div class="avatar">{{ item.firstLetterOfName.toUpperCase() }}</div>
        <div class="name-container">
          <div class="username">{{ item.name }}</div>
          <div class="nickname">{{ item.nickname }}</div>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="doCloseDialog()">取 消</el-button>
      <el-button type="primary" size="small" @click="doSaveChannel()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { outputError } from '@/utils/exception'
import { listUser } from '@/api/user'
import { createChannel } from '@/api/channel'

export default {
  name: "create-private-channel",
  data() {
    return {
      showLoading: false,
      dialogVisible: false,
      searchParams: {
        username: '',
        limit: 20,
        offset: 0
      },
      pagingUserList: {
        total: 0,
        rows: []
      },
      selectedIndex: -1,
      selectedUser: null
    }
  },
  methods: {
    doCloseDialog() {
      Object.assign(this.$data, this.$options.data())
      this.dialogVisible = false
    },
    handleDialogOpen() {
      this.$nextTick(() => {
        this.$refs['username'].focus()
      })
    },
    doSearchUser() {
      this.showLoading = true
      listUser(this.searchParams.username, this.searchParams.limit, this.searchParams.offset)
      .then(response => {
        this.pagingUserList = response.data
        this.showLoading = false
      })
      .catch(error => {
        this.showLoading = false
        outputError(this, error)
      })
    },
    selectUser(user, index) {
      this.selectedIndex = index
      this.selectedUser = user
    },
    doSaveChannel() {
      if(this.selectedUser == null) {
        this.$message({
          showClose: true,
          message: '请选择私聊对象',
          type: 'error',
          duration: 2000
        })
        return
      }
      this.showLoading = true
      let currentUser = JSON.parse(sessionStorage.getItem("currentUser"))
      let channel = {
        type: 'P',
        fromUsername: currentUser.name,
        fromUserNickname: currentUser.nickname,
        toUserId: this.selectedUser.id,
        toUsername: this.selectedUser.name,
        toUserNickname: this.selectedUser.nickname
      }
      createChannel(channel)
      .then(response => {
        this.$emit('onChannelCreated', response.data)
        this.showLoading = false
        Object.assign(this.$data, this.$options.data())
        this.dialogVisible = false
      })
      .catch(error => {
        this.showLoading = false
        outputError(this, error)
      })
    } 
  },
  mounted: function() {
    this.$nextTick(() => {  
      this.$on('openDialog', function(action) {
        this.doSearchUser()
        this.dialogVisible = true
      })
    })      
  }
}
</script>

<style lang="scss" scoped>
.search-input-container {
  float: left;
  margin: 0 10px 0 16px;
  .el-input {
    width: 230px;
  }  
}
.search-button-container {
  margin-left: 235px;
}

.user-list-container {
  border: solid 1px #EFEEEC;
  height: 330px;
  overflow-y: auto;
  .user-container {
    border-bottom: solid 1px #EFEEEC;
    padding: 5px;
    cursor: pointer;
    clear: both;
    .avatar {
      width: 40px; 
      height: 40px;
      margin: 4px 5px 0 5px;
      line-height: 40px;
      background-color: #DF016E;
      border-radius: 100px;
      text-align: center;
      color: #fff;
      font-weight: bold;
      float: left;
    }
    .username {
      color: #111111;
    }
    .nickname {
      color: #827F7A;
    }
  }
  .user-container:hover {
    background-color: #F1EFEE;
  }
  .selected-user {
    background: #F0F8FF;
  }
  .selected-user:hover {
    background-color: #F0F8FF;
  }
}
</style>