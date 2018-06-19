<template>
  <div class="container">
    <div class="svg-container">
      <svg viewBox="0 0 1024 1024" version="1.1" width="100%" height="100%"><path v-bind:class="{ 'group-icon-selected': selected, 'group-icon': !selected }" d="M416 512a224 224 0 1 1 0-448 224 224 0 0 1 0 448zM0 960c0-247.424 186.24-448 416-448s416 200.576 416 448H0z m886.784-128a448.768 448.768 0 0 0-298.752-334.72A255.808 255.808 0 0 0 704 282.88a255.36 255.36 0 0 0-85.504-190.912c7.04-0.64 14.272-1.024 21.504-1.024 121.216 0 219.456 99.328 219.456 221.824a222.336 222.336 0 0 1-90.56 179.584C917.568 543.936 1024 680.96 1024 832h-137.216z"></path></svg>
    </div>
    <div class="group-text" v-if="text != null && text != ''">{{ text }}</div>
  </div>
</template>

<script>
export default {
  name: 'group-icon',
  props: ['text', 'selected']
}
</script>

<style lang="scss" scoped>
.container {
  padding: 6px 0;
  .svg-container {
    height: 16px;
    width: 16px;
    line-height: 16px;    
    float: left;
    .group-icon {
      opacity: 1;
      fill: #629AD5;
    }
    .group-icon-selected {
        fill: #FFF;
        color: #111;
    }
  }
  .group-text {
    margin: 1px;
    color: #74736D;
    font-size: 14px;
    line-height: 16px;
  } 
}
</style>