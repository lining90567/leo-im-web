<template>
  <el-dialog :visible.sync="dialogVisible" width="500px" v-loading="loadingVisible" @open="handleDialogOpen()">
    <div slot="title" class="dialog-header"><h3>修改密码</h3></div>
    <el-form :model="changePwdModel" :rules="formRules" class="el-dialog-form"
      ref="changePwdForm" label-width="80px" label-position="right" size="small">
      <el-form-item label="原密码" prop="oldPassword">
        <el-col :span="16"><el-input ref="oldPassword" type="password" :maxlength="16" v-model="changePwdModel.oldPassword" auto-complete="off"></el-input></el-col>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-col :span="16"><el-input type="password" :maxlength="16" v-model="changePwdModel.newPassword" auto-complete="off"></el-input></el-col>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPassword">
        <el-col :span="16"><el-input type="password" :maxlength="16" v-model="changePwdModel.checkPassword" auto-complete="off"></el-input></el-col>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" size="small" @click="doChangePassword">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { changePassword } from '@/api/user'
import { outputError } from '@/utils/exception'

export default {
  name: "change-password",
  data() {
    var validateOldPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入原密码'))
      } else {
        callback()
      }
    }      
    var validateNewPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else {
        if (this.changePwdModel.checkPassword !== '') {
          this.$refs.changePwdForm.validateField('checkPassword')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.changePwdModel.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }   
    return {
      loadingVisible: false,
      dialogVisible: false,
      changePwdModel: {
        oldPassword: '',
        newPassword: '',
        checkPassword: ''
      },
      formRules: {
        oldPassword: [
          { required: true, message: '请输入原密码', trigger: 'blur' },
          { validator: validateOldPass, trigger: 'blur' }
        ],             
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { validator: validateNewPass, trigger: 'blur' }
        ],
        checkPassword: [
          { validator: validatePass2, trigger: 'blur' }
        ]     
      }      
    }
  },
  methods: {
    handleDialogOpen() {
      this.$nextTick(() => {
        this.$refs['oldPassword'].focus()
      })
    },
    doChangePassword() {
      this.$refs['changePwdForm'].validate((valid) => {
        if (valid) {
          this.loadingVisible = true
          let currentUser = JSON.parse(sessionStorage.getItem('currentUser'))
          changePassword(currentUser.id, currentUser.name,
            this.changePwdModel.oldPassword, this.changePwdModel.newPassword)
          .then(response => {
            this.loadingVisible = false
            if(response.data > 0) {
              this.dialogVisible = false
              return   
            }
            outputError(this, { message: '修改密码失败，请确认原密码是否正确！' })
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
      this.$on('openDialog', function(action) {
        this.dialogVisible = true
      })
    })
  }
}
</script>

<style lang="scss" scoped>
.vc-input {
  float: left;
  width: 190px;
}
.vc {
  width: 70px;
  height: 30px;
  line-height: 30px;
  float: right;
  border: solid 1px #CECECE;
  background-color: #F0F0F0;
  text-align: center;
  color: #007ACC;
}
.vc:hover {
  cursor: pointer;
}
</style>

