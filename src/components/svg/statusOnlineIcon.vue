<template>
  <div class="container">
    <div class="svg-container">
      <svg version="1.1" id="Layer_1" width="16px" height="16px" inkscape:version="0.48.4 r9939" sodipodi:docname="TRASH_1_4.svg" x="0px" y="0px" viewBox="-243 245 12 12" style="enable-background:new -243 245 12 12;" xml:space="preserve"><sodipodi:namedview inkscape:cx="26.358185" inkscape:zoom="1.18" bordercolor="#666666" pagecolor="#ffffff" borderopacity="1" objecttolerance="10" inkscape:cy="139.7898" gridtolerance="10" guidetolerance="10" showgrid="false" showguides="true" id="namedview6" inkscape:pageopacity="0" inkscape:pageshadow="2" inkscape:guide-bbox="true" inkscape:window-width="1366" inkscape:current-layer="Layer_1" inkscape:window-height="705" inkscape:window-y="-8" inkscape:window-maximized="1" inkscape:window-x="-8"><sodipodi:guide position="50.036793,85.991376" orientation="1,0" id="guide2986"></sodipodi:guide><sodipodi:guide position="58.426196,66.216355" orientation="0,1" id="guide3047"></sodipodi:guide></sodipodi:namedview><g><path class="online-icon" d="M-236,250.5C-236,250.5-236,250.5-236,250.5C-236,250.5-236,250.5-236,250.5C-236,250.5-236,250.5-236,250.5z"></path> <ellipse class="online-icon" cx="-238.5" cy="248" rx="2.5" ry="2.5"></ellipse></g><path class="online-icon" d="M-238.9,253.8c0-0.4,0.1-0.9,0.2-1.3c-2.2-0.2-2.2-2-2.2-2s-1,0.1-1.2,0.5c-0.4,0.6-0.6,1.7-0.7,2.5c0,0.1-0.1,0.5,0,0.6 c0.2,1.3,2.2,2.3,4.4,2.4c0,0,0.1,0,0.1,0c0,0,0.1,0,0.1,0c0,0,0.1,0,0.1,0C-238.7,255.7-238.9,254.8-238.9,253.8z"></path><g><g><path class="online-icon" d="M-232.3,250.1l1.3,1.3c0,0,0,0.1,0,0.1l-4.1,4.1c0,0,0,0-0.1,0c0,0,0,0,0,0l-2.7-2.7c0,0,0-0.1,0-0.1l1.2-1.2 c0,0,0.1,0,0.1,0l1.4,1.4l2.9-2.9C-232.4,250.1-232.3,250.1-232.3,250.1z"></path></g></g></svg>
    </div>
    <div class="online-text" v-if="text != null && text != ''">{{ text }}</div>
  </div>
</template>

<script>
export default {
  name: 'status-online-icon',
  props: ['text']
}
</script>

<style lang="scss" scoped>
.container {
  padding-top: 6px;
  float: left;
  .svg-container {
    height: 16px;
    width: 16px;
    line-height: 16px;
    float: left;
    .online-icon {
      opacity: 1;
      fill: #04D053;
    }
  }
  .online-text {
    margin: -15px 0 0 18px;
    color: #74736D;
    font-size: 14px;
    line-height: 16px;
  }    
}
</style>

