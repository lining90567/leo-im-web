<template>
  <el-dialog :modal-append-to-body="false" :visible.sync="dialogVisible" width="500px" v-loading="loadingVisible" @open="handleDialogOpen()">
    <div slot="title" class="dialog-header"><h3>编辑频道标题</h3></div>
    <el-form class="el-dialog-form" ref="form" :model="model" :rules="formRules" 
      label-width="80px" label-position="right" size="small">
      <el-form-item label="频道标题" prop="channelTitle">
        <el-col :span="16"><el-input ref="channelTitle" :maxlength="32" v-model="model.channelTitle"></el-input></el-col>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" size="small" @click="doSaveChannelTitle()">确 定</el-button>
    </span>
  </el-dialog>    
</template>

<script>
import { updateUserChannelDisplayName  } from '@/api/channel'
import { outputError } from '@/utils/exception'

export default {
  name: 'edit-channel-title',
  data() {
    return {
      loadingVisible: false,
      dialogVisible: false,
      model: {
        channelId: '',
        channelTitle: ''
      },
      formRules: {
        channelTitle: [
          { required: true, message: '请输入频道标题', trigger: 'blur' },
          { min: 3, max: 32, message: '长度在 3 到 32 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleDialogOpen() {
      this.$nextTick(() => {
        this.$refs['form'].clearValidate()
        this.$refs['channelTitle'].focus()
      })        
    },
    doSaveChannelTitle() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.loadingVisible = true          
          updateUserChannelDisplayName(this.model.channelId, this.model.channelTitle)
          .then(response => {
            this.$emit('onEditTitleFinished', this.model.channelTitle)
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
  mounted: function() {
    this.$nextTick(() => {  
      this.$on('openDialog', function(userChannel) {
        this.model.channelId = userChannel.channelId
        this.model.channelTitle = userChannel.channelDisplayName
        this.dialogVisible = true
      })
    })
  }  
}
</script>

