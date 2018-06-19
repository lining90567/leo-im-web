<template>
  <el-dialog :modal-append-to-body="false" :visible.sync="dialogVisible" width="500px" v-loading="loadingVisible" @open="handleDialogOpen()">
    <div slot="title" class="dialog-header"><h3>编辑频道名称</h3></div>
    <el-form class="el-dialog-form" ref="form" :model="model" :rules="formRules" 
      label-width="80px" label-position="right" size="small">
      <el-form-item label="频道名称" prop="channelName">
        <el-col :span="16"><el-input ref="channelName" :maxlength="32" v-model="model.channelName"></el-input></el-col>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" size="small" :disabled="!saveButtonEnable" @click="doSaveChannelName()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { updateChannelName } from '@/api/channel'
import { outputError } from '@/utils/exception'

export default {
  name: 'edit-channel-name',
  data() {
    return {
      loadingVisible: false,
      dialogVisible: false,
      oldChannelName: '',
      model: {
        channelId: '',
        channelName: ''
      },
      formRules: {
        channelName: [
          { required: true, message: '请输入频道名称', trigger: 'blur' },
          { min: 3, max: 32, message: '长度在 3 到 32 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleDialogOpen() {
      this.$nextTick(() => {
        this.$refs['form'].clearValidate()
        this.$refs['channelName'].focus()
      })        
    },
    doSaveChannelName() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.loadingVisible = true;
          updateChannelName(this.model.channelId, this.model.channelName)
          .then(response => {
            this.$emit('onEditNameFinished', this.model.channelName)
            this.loadingVisible = false
            this.dialogVisible = false
          })
          .catch(error => {
            this.loadingVisible = false
            outputError(this, error)        
          })
        } else {
          return false
        }
      })
    }
  },
  computed: {
    saveButtonEnable() {
      return this.oldChannelName !== this.model.channelName && this.model.channelName !== ''
    }
  },
  mounted: function() {
    this.$nextTick(() => {  
      this.$on('openDialog', function(userChannel) {
        this.model.channelId = userChannel.channelId
        this.oldChannelName = this.model.channelName = userChannel.channelName
        this.dialogVisible = true
      })
    })
  }  
}
</script>

