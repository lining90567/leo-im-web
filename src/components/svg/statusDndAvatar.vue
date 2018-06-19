<template>
  <div class="icon-container">
    <svg width="100%" height="100%" viewBox="0 0 20 20" version="1.1" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"><path class="dnd-icon" d="M10,0c5.519,0 10,4.481 10,10c0,5.519 -4.481,10 -10,10c-5.519,0 -10,-4.481 -10,-10c0,-5.519 4.481,-10 10,-10Zm5.25,8.5l-10.5,0c-0.414,0 -0.75,0.336 -0.75,0.75l0,1.5c0,0.414 0.336,0.75 0.75,0.75l10.5,0c0.414,0 0.75,-0.336 0.75,-0.75l0,-1.5c0,-0.414 -0.336,-0.75 -0.75,-0.75Z"></path></svg>
  </div>
</template>

<script>
export default {
  name: 'status-Dnd-avatar',
}
</script>

<style lang="scss" scoped>
.icon-container {
  border-radius: 100px;
  width: 12px;
  height: 12px;
  margin: 0;
  padding: 0;
  background-color: #ffffff;
  .dnd-icon {
    opacity: 1;
    background-color: #fff;
    fill: #f74343;          
  }
}  
</style>