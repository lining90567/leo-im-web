<template>
  <el-dialog :visible.sync="dialogVisible" :modal-append-to-body="false" width="460px" v-loading="loadingVisible">
    <div slot="title" class="dialog-header"><h3>添加新成员到&nbsp;&nbsp;{{ channelName }}</h3></div>
    <div class="list-container">
      <div class="user-list-container left-list">
        <div class="title">选择组成员</div>
        <div class="search-container">
          <input type="text" placeholder="搜索" v-model="searchParams.username" @keyup="onSearchInputKeyUp">
          <i slot="suffix" class="el-input__icon el-icon-search" @click="doSearch"></i>          
        </div>
        <ul>
          <li v-for="(item, index) in this.userList" @click="selectUser(item, index)">{{ item.nickname }}<span>+</span></li>
          <li class="load-more" v-show="searchParams.offset + searchParams.limit < userTotal" @click="loadMoreUser();">加载更多...</li>                                        
        </ul>
      </div>
      <div class="user-list-container right-list">
        <div class="title">已选组成员</div>
        <ul>
          <li v-for="(item, index) in this.selectedUserList" @click="unselectUser(item, index)">{{ item.nickname }}<span>x</span></li>
        </ul>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="doCloseDialog()">取 消</el-button>
      <el-button type="primary" size="small" :disabled="!saveButtonEnable" @click="doAddMember()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { outputError } from '@/utils/exception'
import { listNonMembers } from '@/api/user'
import { addMember } from '@/api/channel'

export default {
  name: "add-member",
  props: ['channelId', 'channelName'],
  data() {
    return {
      loadingVisible: false,
      dialogVisible: false,      
      searchParams: {
        username: '',
        limit: 20,
        offset: 0
      },      
      userList: [],
      selectedUserList: [],
      userTotal: 0     
    }
  },
  methods: {
    doCloseDialog() {
      this.dialogVisible = false
    },
    getUserList() {
      this.loadingVisible = true
      listNonMembers(this.channelId, this.searchParams.username, this.searchParams.limit, this.searchParams.offset)
      .then(response => {
        this.userList = [...this.userList, ...response.data.rows]
        this.userTotal = response.data.total
        this.loadingVisible = false
      })
      .catch(error => {
        this.loadingVisible = false
        outputError(this, error)
      })      
    },
    selectUser(user, index) {
      this.selectedUserList.push(
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
        this.selectedUserList.splice(index, 1)
      }
    },
    loadMoreUser() {
      this.searchParams.offset += this.searchParams.limit
      this.getUserList()
    },
    doAddMember() {
      this.loadingVisible = true
      let users = []
      for(let user of this.selectedUserList) {
        users.push({
          id: user.id,
          nickname: user.nickname
        })
      }
      addMember(this.channelId, {
        admin: JSON.parse(sessionStorage.getItem('currentUser')).nickname,
        users: users
      })
      .then(response => {
        this.loadingVisible = false
        this.dialogVisible = false
      })
      .catch(error => {
        this.loadingVisible = false
        this.dialogVisible = false
        outputError(this, error)
      })
    },
    doSearch() {
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
        this.doSearch()
      }
    }
  },
  computed: {
    saveButtonEnable() {
      return this.selectedUserList.length > 0
    }
  },  
  mounted: function() {
    this.$nextTick(() => {  
      this.$on('openDialog', function(action) {
        this.userList = this.selectedUserList = []
        this.dialogVisible = true
        this.getUserList()
      })
    })
  }
}
</script>

<style lang="scss" scoped>
.list-container {
  padding-left: 16px;
  padding-right: 16px;
  height: 360px;
  .user-list-container {
    border: solid 1px #D4D1CC;
    width: 48%;
    height: 360px;
    .title {
      height: 30px;
      line-height: 30px;
      text-align: center;
      font-weight: bold;
      background-color: #F0F0F0;
      border-bottom: solid 1px #F0F0F0;
    }
    ul {
      padding: 0;
      margin: 0;
      overflow-y: auto;
      margin: 0;
      list-style-type: none;
      .load-more {
        text-align: center;
        font-size: 11px;
      }
      li {
        display: list-item;
        padding-top: 2px;
        padding-bottom: 4px;
        padding-left: 5px;
        padding-right: 5px;
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
    .search-container {
      text-align: center;
      padding: 2px 1px;
      border-bottom: solid 1px #F0F0F0;
      input {
        margin: 0 0 0 4px;
        height: 23px;
        line-height: 23px;
        width: 166px;
        outline: 0;
        border: none;
        background-color: transparent;
        -webkit-appearance: textfield;
        -webkit-rtl-ordering: logical;
        cursor: text;
      }
      i {
        cursor: pointer;
        height: 23px;
        line-height: 23px;
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
      height: 290px;
    }
  }
  .right-list {
    float: right;
    ul {
      height: 327px;
    }    
  }
}
</style>