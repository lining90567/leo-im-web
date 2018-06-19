<template>
  <el-dialog :visible.sync="dialogProps.visible" width="560px" v-loading="showLoading" @open="handleDialogOpen()">
    <div slot="title" class="dialog-header"><h3>{{ dialogProps.title }}</h3></div>
    <el-form class="form" :model="channelModel" :rules="formRules" 
      ref="channelForm" label-width="80px" label-position="right" size="small">
      <el-form-item label="群组名称" prop="name">
        <el-col :span="16"><el-input ref="channelName" size="small" :maxlength="64" v-model="channelModel.name" autofocus="autofocus" @focus="clearValidate"></el-input></el-col>
      </el-form-item>
      <el-form-item label="群组用途" prop="purpose">
        <el-col :span="16">
          <el-input type="textarea" :rows="3" v-model="channelModel.purpose">
          </el-input>          
        </el-col>
      </el-form-item>
      <el-form-item label="成员">
        <el-col :span="16">
          <div class="user-list-container left-list">
            <div class="title">选择组成员</div>
            <div class="search-container">
              <input type="text" placeholder="搜索" v-model="searchParams.username" @keyup="onSearchInputKeyUp">
              <i slot="suffix" class="el-input__icon el-icon-search" @click="doSearchUser"></i>
            </div>
            <ul>
              <li v-for="(item, index) in this.userList" @click="selectUser(item, index)">{{ item.nickname }}<span>+</span></li>
              <li class="load-more" v-show="searchParams.offset + searchParams.limit < userTotal" @click="loadMoreUser();">加载更多...</li>                                        
            </ul>
          </div>
          <div class="user-list-container right-list">
            <div class="title">已选组成员</div>
            <ul>
              <li v-for="(item, index) in this.channelModel.members" @click="unselectUser(item, index)">{{ item.nickname }}<span>x</span></li>
            </ul>
          </div>
        </el-col>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="doCloseDialog()">取 消</el-button>
      <el-button type="primary" size="small" @click="doSaveChannel()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { outputError } from '@/utils/exception'
import { createChannel } from '@/api/channel'
import { listUser } from '@/api/user'

export default {
  name: "create-group-channel",
  data() {
    return {
      myId: JSON.parse(sessionStorage.getItem('currentUser')).id,
      showLoading: false,
      dialogProps: {
        visible: false,
        action: '',
        title: ''
      },
      channelModel : {
        type: 'G',
        name: '',
        purpose: '',
        members: [],
        creatorNickname: JSON.parse(sessionStorage.getItem('currentUser')).nickname
      },
      searchParams: {
        username: '',
        limit: 20,
        offset: 0
      },      
      userList: [],
      userTotal: 0,
      formRules: {
        name: [
          { required: true, message: '请输入群组名称', trigger: 'blur' },
          { min: 3, max: 64, message: '长度在 3 到 64 个字符', trigger: 'blur' }
        ],
      }      
    }
  },
  methods: {
    doCloseDialog() {
      Object.assign(this.$data, this.$options.data())
      this.dialogProps.visible = false
    },
    clearValidate() {
      this.$refs['channelForm'].clearValidate()
    },
    handleDialogOpen() {
      this.$nextTick(() => {
        this.$refs['channelForm'].clearValidate()
        this.$refs['channelName'].focus()
      })
    },
    getUserList() {
      this.showLoading = true
      listUser(this.searchParams.username, this.searchParams.limit, this.searchParams.offset)
      .then(response => {
        let users = []
        for(let user of response.data.rows) {
          if(user.id !== this.myId) {
            users.push({
              id: user.id,
              nickname: user.nickname
            })
          }
        }
        this.userList = [...this.userList, ...users]
        this.userTotal = response.data.total
        this.showLoading = false
      })
      .catch(error => {
        this.showLoading = false
        outputError(this, error)
      })      
    },
    selectUser(user, index) {
      this.channelModel.members.push(
        {
          id: user.id,
          nickname: user.nickname,
          index: index
        }
      )
      this.userList.splice(index, 1)
    },
    unselectUser(user, index) {
      if(user.id !== this.myId) {
        this.userList.splice(user.index, 0, {
          id: user.id,
          nickname: user.nickname
        })
        this.channelModel.members.splice(index, 1)
      }
    },
    loadMoreUser() {
      this.searchParams.offset += this.searchParams.limit
      this.getUserList()
    },
    doSaveChannel() {
      this.$refs['channelForm'].validate(valid => {
        if (valid) {      
          this.showLoading = true
          createChannel(this.channelModel)
          .then(response => {
            this.$emit('onChannelCreated', response.data)
            this.showLoading = false
            Object.assign(this.$data, this.$options.data())
            this.dialogProps.visible = false
          })
          .catch(error => {
            this.showLoading = false
            this.dialogProps.visible = false
            outputError(this, error)
          })
        }
      })
    },
    doSearchUser() {
      this.userList = []
      this.getUserList()
    },
    onSearchInputKeyUp(event) {
      if(event.keyCode === 13) {
        this.userList = []
        this.getUserList()
      }
    }     
  },
  watch: {
    'searchParams.username': function(newVal, oldVal) {
      if(newVal.trim() === '') {
        this.doSearchUser()
      }
    }
  },  
  mounted: function() {
    this.$nextTick(() => {  
      this.$on('openDialog', function(action) {
        this.userList = []
        this.channelModel.members = []
        this.getUserList()
        this.channelModel.members.push({
          id: this.myId,
          nickname: JSON.parse(sessionStorage.getItem('currentUser')).nickname,
          index: 0
        })
        this.dialogProps.visible = true
        this.dialogProps.title = action === 'add' ? '添加群聊' : '修改群聊'
      })
    })
  }
}
</script>

<style lang="scss" scoped>
.form {
  padding: 2px 0 0 16px;
  border-bottom: solid 1px #F0EEEA;
}
.user-list-container {
  border: solid 1px #D4D1CC;
  width: 48%;
  .title {
    height: 32px;
    text-align: center;
    font-weight: bold;
    background-color: #F0F0F0;
    border-bottom: solid 1px #F0F0F0;
  }
  .search-container {
    text-align: center;
    padding: 0;
    margin: 0;
    border-bottom: solid 1px #F0F0F0;
    input {
      margin: 0 0 0 4px;
      height: 22px;
      line-height: 22px;
      width: 110px;
      outline: 0;
      border: none;
      background-color: transparent;
      -webkit-appearance: textfield;
      -webkit-rtl-ordering: logical;
      cursor: text;
    }
    i {
      cursor: pointer;
      height: 22px;
      line-height: 22px;
    }    
    input::-webkit-input-placeholder {
      color: #DDDBD7;
    }
    input::-moz-placeholder {   /* Mozilla Firefox 19+ */
      color: #DDDBD7;
    }
    input:-moz-placeholder {    /* Mozilla Firefox 4 to 18 */
      color: #DDDBD7;
    }
    input:-ms-input-placeholder {  /* Internet Explorer 10-11 */ 
      color: #DDDBD7;
    }      
  }
  ul {
    padding: 0;
    margin: 0;
    overflow-y: auto;
    list-style-type: none;
    .load-more {
      text-align: center;
      font-size: 11px;
    }
    li {
      display: list-item;
      padding: 0 5px;
      margin: 0;
      span {
        font-weight: bold;
        float: right;
        display: none;
      }
    }
    li:hover {
      background-color: #F1EFEE;
      cursor: pointer;
    }
    li:hover span {
      display: block;
    }    
  }
}
.left-list {
  float: left;
  ul {
    height: 200px;
  }
}
.right-list {
  float: right;
  ul {
    height: 232px;
  }  
}
</style>