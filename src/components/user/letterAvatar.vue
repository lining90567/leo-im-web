<template>
  <div class="letter-avatar">{{ letter }}</div>
</template>

<script>
export default {
  name: 'letter-avatar',
  props: ['letter']
}
</script>

<style lang="scss" scoped>
.letter-avatar {
  width: 80px; 
  height: 80px;
  background-color: #DF016E;
  border-radius: 80px;
  text-align: center;
  line-height: 80px;
  color: #fff;
  font-weight: bold;
  float: left;
}
</style>

