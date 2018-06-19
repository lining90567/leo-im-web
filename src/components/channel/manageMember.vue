<template>
  <el-dialog :visible.sync="dialogVisible" :modal-append-to-body="false" width="400px" v-loading="loadingVisible">
    <div slot="title" class="dialog-header"><h3>{{channelName}}&nbsp;-&nbsp;成员管理</h3></div>
    <div class="search-container">
      <div class="search"><input type="text" placeholder="搜索" v-model="searchParams.username" @keyup="onSearchInputKeyUp"><i class="el-icon-search" @click="doSearchMember"></i></div>
    </div>
    <div class="list-container">
      <ul>
        <li v-for="(item, index) in this.memberList" :class="{ 'is-admin': item.admin }" :title="item.admin ? '群管理员': ''">
          <div class="nickname-container">{{ item.nickname }}</div>
          <div class="button-container">
            <el-button v-if="!item.admin" type="danger" size="mini" @click="doRemoveMember(item.id, item.nickname)">移除成员</el-button>
            <el-button v-if="myId !== item.id" type="primary" size="mini" @click="doChangeAdmin(item.id, !item.admin)">管理员</el-button>
          </div>
          <div class="clear-float"></div>
        </li>
        <li class="load-more" v-show="searchParams.offset + searchParams.limit < memberTotal" @click="doLoadMoreMember();">加载更多...</li>                                        
      </ul>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" size="small" @click="openAddMemberDlg">添加成员</el-button>
      <el-button size="small" @click="dialogVisible=false">关闭</el-button>
    </span>    
  </el-dialog>
</template>

<script>
import { outputError } from '@/utils/exception'
import { listMember, removeMember, changeAdmin } from '@/api/channel'

export default {
  name: 'member-management',
  props: ['channelId', 'channelName'],
  data() {
    return {
      myId: JSON.parse(sessionStorage.getItem('currentUser')).id,
      dialogVisible: false,
      loadingVisible: false,
      memberList: [],
      searchParams: {
        username: '',
        limit: 20,
        offset: 0
      },
      memberTotal: 0
    }
  },
  methods: {
    getMemberList() {
      this.loadingVisible = true
      listMember(this.channelId, this.searchParams.username, 
        this.searchParams.limit, this.searchParams.offset)
      .then(response => {
        this.memberList = response.data.rows
        this.memberTotal = response.data.total
        this.loadingVisible = false
      })
      .catch(error => {
        this.loadingVisible = false
        outputError(this, error)
      })
    },
    doLoadMoreMember() {
      this.searchParams.offset += this.searchParams.limit
      this.getMemberList()
    },
    doRemoveMember(memberId, memberNickname) {
      this.loadingVisible = true
      removeMember(this.channelId, {
        memberId: memberId,
        memberNickname: memberNickname,
        admin: JSON.parse(sessionStorage.getItem('currentUser')).nickname
      })
      .then(response => {
        this.loadingVisible = false
        this.getMemberList()
      })
      .catch(error => {
        this.loadingVisible = false
        outputError(this, error)          
      })
    },
    doChangeAdmin(memberId, isAdmin) {
      this.loadingVisible = true
      changeAdmin(this.channelId, memberId, isAdmin)
      .then(response => {
        this.loadingVisible = false
        this.getMemberList()
      })
      .catch(error => {
        this.loadingVisible = false
        outputError(this, error)          
      })
    },
    openAddMemberDlg() {
      this.dialogVisible = false
      this.$emit('onOpenAddMemberDlg')
    },
    doSearchMember() {
      if(!this.searchParams.username.trim()) {
        return
      }
      this.getMemberList()       
    },
    onSearchInputKeyUp(event) {
      if(!this.searchParams.username.trim()) {
        this.getMemberList()
        return
      }
      if(event.keyCode === 13) {
        this.doSearchMember()
      }
    }    
  },
  mounted: function() {
    this.$nextTick(() => {  
      this.$on('openDialog', function(action) {
        this.dialogVisible = true
        this.getMemberList()
      })
    })
  }  
}
</script>

<style lang="scss" scoped>
.search-container {
  padding: 0 16px;
  .search {
    padding: 0 0 0 5px;
    height: 28px;
    line-height: 28px;
    vertical-align: middle;
    border: solid 1px #D8D2C7;
    width: 362px;
    border-radius: 3px;
    input {
      margin: 0 0 0 4px;
      width: 333px;
      outline: 0;
      border: none;
      background-color: transparent;
      -webkit-appearance: textfield;
      -webkit-rtl-ordering: logical;
      cursor: text;
    }
    i {
      cursor: pointer;
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
}
.list-container {
  padding: 6px 16px;
  ul {
    height: 360px;
    border: solid 1px #D4D1CC;
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
      padding: 5px 10px;
      margin: 0;
      .nickname-container {
        float: left;
      }
      .button-container {
        float: right;
      }
    }
    li:hover {
      background-color: #F1EFEE;
      cursor: pointer;
    }
    li:hover span {
      display: block;
    }
    .is-admin {
      color: #0A53A4;
      font-weight: bold;
    }     
  }
  .clear-float {
    clear: both;
  }
}
</style>


