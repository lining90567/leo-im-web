<template>
  <el-dialog class="img-viewer-dlg" :visible.sync="dialogVisible" width="800px" center>
    <div class="image-container">
      <img :src="imageUrl" :width="imageWidth > 760 ? 760 : imageWidth" :height="imageHeight > 460 ? 460 : imageHeight">
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'image-viewer',
  props: ['imageUrl', 'imageWidth', 'imageHeight'],
  data() {
    return {
      dialogVisible: false
    }
  },
  mounted: function() {
    this.$nextTick(() => {  
      this.$on('openDialog', function(data) {
        this.dialogVisible = true
      })
    })
  }
}
</script>


<style lang="scss" scoped>
.img-viewer-dlg {
  margin: 0;
  padding: 0;
}
.image-container {
  width: 800px;
  height: 500px;
  line-height: 500px;
  text-align: center;
  margin-top: -32px;
  margin-left: -25px;
  margin-bottom: -30px;
  background-color: #111;
  img {
    vertical-align: middle;
  }
}
</style>
