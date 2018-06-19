<template>
  <el-dialog :visible.sync="dialogVisible" :modal-append-to-body="false" width="400px" v-loading="loadingVisible">
    <div slot="title" class="dialog-header"><h3>{{channelName}}&nbsp;-&nbsp;成员</h3></div>
    <div class="list-container">
      <ul>
        <li v-for="(item, index) in this.memberList" :class="{ 'is-admin': item.admin }" :title="item.admin ? '群管理员': ''">{{ item.nickname }}</li>
        <li class="load-more" v-show="searchParams.offset + searchParams.limit < memberTotal" @click="loadMoreMember();">加载更多...</li>                                        
      </ul>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="dialogVisible=false">关闭</el-button>
    </span>    
  </el-dialog>
</template>

<script>
import { outputError } from '@/utils/exception'
import { listMember } from '@/api/channel'

export default {
  name: 'member-list',
  props: ['channelId', 'channelName'],
  data() {
    return {
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
    loadMoreUser() {
      this.searchParams.offset += this.searchParams.limit
      this.getMemberList()
    },   
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
      padding: 2px 5px;
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
    .is-admin {
      color: #0A53A4;
      font-weight: bold;
    }     
  }
}
</style>


