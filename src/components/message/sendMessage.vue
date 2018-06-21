<template>
  <div class="container" v-loading="loadingVisible">
    <div class="toolbar">
      <emoji-panel id="emoji_panel" v-show="emojiPanelVisible" v-on:select-emoticon="selectEmoticon"></emoji-panel>
      <a class="face" title="表情" @click="displayEmojiPanel" v-clickOutside="handleCloseEmojiPanel"></a>
      <el-upload
        class="upload"
        ref="fileUpload"
        :action="uploadFileUrl"
        :data="postFileData"
        :auto-upload="false"
        :headers="uploadRequestHeaders"
        :show-file-list="false"
        :on-change="handleFileOnChange"
        :before-upload="beforeFileUpload"
        :on-success="fileUploadSuccess">
        <a class="folder" title="图片和文件"></a>
      </el-upload>      
    </div>
    <div class="content-container">
      <textarea class="custom-textarea custom-textarea--emoji-picker" id="post_textbox" ref="message_content"
        autocomplete="off" spellcheck="true" placeholder="输入要发送的消息..." v-model="message" @keydown="onMessageContentEnterKeyDown"
        @keyup="ctrlButtonDown=false">
      </textarea>
    </div>
    <div class="send-button-container">
      <span>Ctrl+Enter换行</span>
      <el-button type="primary" size="small" @click="doSendMessage()" :disabled="sendButtonDisabled">发送</el-button>
    </div>
  </div>
</template>

<script>
import { saveMessage } from '@/api/message'
import { outputError } from '@/utils/exception'

const clickOutside = {
  // 初始化指令
  bind(el, binding, vnode) {
    function documentHandler(e) {
      // 这里判断点击的元素是否是本身，是本身，则返回。
      if (el.contains(e.target)) {
        return false
      }
      // 展开的表情pannel，也返回不执行关闭操作。
      if(e.target.getAttribute('isEmoji') != null) {
        return false
      }
      // Emoji图标，也返回不执行关闭操作。
      if(e.target.getAttribute('type') != null && e.target.getAttribute('type') === 'emoji_icon') {
        return false
      }      
      // 判断指令中是否绑定了函数
      if (binding.expression) {
        // 如果绑定了函数 则调用那个函数，此处binding.value就是handleCloseEmojiPanel方法
        binding.value(e)
      }
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.__vueClickOutside__ = documentHandler
    document.addEventListener('click', documentHandler)
  },
  update() {},
  unbind(el, binding) {
    // 解除事件监听
    document.removeEventListener('click', el.__vueClickOutside__)
    delete el.__vueClickOutside__
  },
}
export default {
  data() {
    return {
      message: '',
      emojiPanelVisible: false,
      loadingVisible: false,
      sendButtonDisabled: true,
      ctrlButtonDown: false,
      postFileData: {
        channelId: this.channelId,
        imageWidth: 0,
        imageHeight: 0,
        size: 0
      },     
      uploadFileUrl: process.env.BASE_API + '/messages/files',
      uploadRequestHeaders: {
        'X-Token': sessionStorage.getItem('token')
      }
    }
  },
  name: 'send-message',
  props: ['channelId', 'channelType'],
  directives: { clickOutside },
  methods: {
    doSendMessage() {
      if(this.message.trim() === '') {
        return
      }
      this.loadingVisible = true
      const newMessage = {
        channelId: this.channelId,
        channelType: this.channelType,
        content: this.message.replace(new RegExp("\n", "gm"), "<br />")
      }
      saveMessage(newMessage)
      .then(response => {
        this.message = ''
        this.$emit('onMessageSent', response.data)
        this.loadingVisible = false
      })
      .catch(error => {
        this.loadingVisible = false
        outputError(this, error)
      })
    },
    displayEmojiPanel() {
      this.emojiPanelVisible = !this.emojiPanelVisible
    },
    handleCloseEmojiPanel() {
      this.emojiPanelVisible = false
    },
    selectEmoticon(emoticon) {
      let textarea = this.$refs.message_content
      let pos = textarea.selectionStart
      let leftStr = this.message.substring(0, pos);
      let rightStr = this.message.substring(pos, this.message.length)
      this.message = leftStr + emoticon + rightStr
    },
    onMessageContentEnterKeyDown(e) {
      if(e.keyCode === 17) {
        this.ctrlButtonDown = true
        return
      }
      if(e.keyCode === 13) {
        if(this.ctrlButtonDown) {
          this.message += '\r\n'
        } else {
          this.doSendMessage()
        }
        e.preventDefault()
      }
    },
    beforeFileUpload(file) {  
      if(file.name.replace(/[\u0391-\uFFE5]/g, "aa").length > 64) {
        this.$message.error('文件名长度不能超过64!')
        return false
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('文件大小不能超过 2MB!')
      }
      this.postFileData.channelId = this.channelId
      this.postFileData.size = file.size
      if(isLt2M) {
        this.loadingVisible = true
      }
      return isLt2M
    },
    fileUploadSuccess(response, file, fileList) {
      this.loadingVisible = false
      this.$emit('onMessageSent', response)
    },
    handleFileOnChange(file) {
      const fileName = file.name.toLowerCase()
      if (fileName.endsWith('png') || fileName.endsWith('jpeg') || fileName.endsWith('jpg') || fileName.endsWith('gif')) {
        let img = new Image()
        img.src = file.url
        let self = this
        img.onload = function() {
          self.postFileData.imageWidth = img.width
          self.postFileData.imageHeight = img.height
          self.$refs.fileUpload.submit()
        }
      } else {
        this.$refs.fileUpload.submit()
      }
    } 
  },
  updated() {
    this.$nextTick(() => {
      this.sendButtonDisabled = (this.message.trim() === '')
    })
  },
  components: { 
    EmojiPanel: resolve => require(['@/components/message/emojiPanel'], resolve)
  }
}
</script>

<style lang="scss" scoped>
.container {
  -webkit-flex: 0 0 auto;
  flex: 0 0 auto;
  width: 100%;
  z-index: 7;
  .toolbar {
    height: 25px;
    padding: 5px 20px;
    display: inline-block;
    border-top: solid 1px #DFDAD3;
    .face {
      width: 25px;
      height: 25px;
      background: url(../../assets/images/emoji.png) no-repeat;
      vertical-align: middle;
      float: left;
      cursor: pointer;
    }
    .upload {
      float: left;
    }
    .file-invisible {
      position: absolute;
      clip: rect(1px,1px,1px,1px);
    }
    .folder {
      margin-left: 8px;
      width: 25px;
      height: 25px;
      background: url(../../assets/images/folder.png) no-repeat;
      display: inline-block;
      vertical-align: middle;  
      cursor: pointer;
    }
  }
  .content-container {
    overflow: hidden;
    display: inline-block;
    *zoom:1;
    *display: inline;
    padding: 0 35px 0 20px;
  }
  .send-button-container {
    height: 40px;
    line-height: 40px;
    text-align: right;
    padding: 0 18px 0 0;
    span {
      color: #888;
      font-size: 12px;
      margin-left: 10px;
      margin-right: 7px;
    }
  }
}
.custom-textarea {
  bottom: 0;
  width: 100%;
  max-height: 162px;
  overflow: hidden;
  padding: 8px 0 13px 15px;
  resize: none;
  font-size: 14px;
}
</style>


