<template>
  <el-dialog :title="dialogProps.title" :visible.sync="dialogProps.visible" width="560px" 
    @open="handleDialogOpen()" v-loading="showLoading">
    <div slot="header" class="dialog-header"></div>
    <el-form :model="channelModel" :rules="formRules" 
      ref="channelForm" label-width="80px" label-position="right" size="small">
      <el-form-item label="群组名称" prop="name">
        <el-col :span="16"><el-input ref="channelName" size="small" :maxlength="64" v-model="channelModel.name" autofocus="autofocus" @focus="clearValidate"></el-input></el-col>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="doCloseDialog()">取 消</el-button>
      <el-button type="primary" size="small" @click="submitForm('changePasswordForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { listUser } from '@/api/user'

export default {
  name: "single-select-user",
  data() {
    return {
      userList: [],
      dialogProps: {
          title: '',
          visible: false
      },
      showLoading: false
    }
  },
  methods: {
    doCloseDialog() {
        this.dialogProps.visible = false
    }
  },
  mounted: function() {
    this.$nextTick(() => {  
      this.$on('openSetPermissionDialog', function(role) {
        this.componentInit(role);
      })
    })
  }  
}
</script>

