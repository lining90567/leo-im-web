<template>
  <div class="container">
    <div class="svg-container">
      <svg version="1.1" id="Layer_1" inkscape:version="0.48.4 r9939" sodipodi:docname="TRASH_1_4.svg" x="0px" y="0px" viewBox="-299 391 12 12" style="enable-background:new -299 391 12 12;" xml:space="preserve"><sodipodi:namedview inkscape:cx="26.358185" inkscape:zoom="1.18" bordercolor="#666666" pagecolor="#ffffff" borderopacity="1" objecttolerance="10" inkscape:cy="139.7898" gridtolerance="10" guidetolerance="10" showgrid="false" showguides="true" id="namedview6" inkscape:pageopacity="0" inkscape:pageshadow="2" inkscape:guide-bbox="true" inkscape:window-width="1366" inkscape:current-layer="Layer_1" inkscape:window-height="705" inkscape:window-y="-8" inkscape:window-maximized="1" inkscape:window-x="-8"><sodipodi:guide position="50.036793,85.991376" orientation="1,0" id="guide2986"></sodipodi:guide><sodipodi:guide position="58.426196,66.216355" orientation="0,1" id="guide3047"></sodipodi:guide></sodipodi:namedview><g><ellipse class="dnd-icon" cx="-294.6" cy="394" rx="2.5" ry="2.5"></ellipse><path class="dnd-icon" d="M-293.8,399.4c0-0.4,0.1-0.7,0.2-1c-0.3,0.1-0.6,0.2-1,0.2c-2.5,0-2.5-2-2.5-2s-1,0.1-1.2,0.5c-0.4,0.6-0.6,1.7-0.7,2.5 c0,0.1-0.1,0.5,0,0.6c0.2,1.3,2.2,2.3,4.4,2.4c0,0,0.1,0,0.1,0c0,0,0.1,0,0.1,0c0.7,0,1.4-0.1,2-0.3 C-293.3,401.5-293.8,400.5-293.8,399.4z"></path></g><path class="dnd-icon" d="M-287,400c0,0.1-0.1,0.1-0.1,0.1l-4.9,0c-0.1,0-0.1-0.1-0.1-0.1v-1.6c0-0.1,0.1-0.1,0.1-0.1l4.9,0c0.1,0,0.1,0.1,0.1,0.1 V400z"></path></svg>
    </div>
    <div class="dnd-text" v-if="text != null && text != ''">{{ text }}</div>
  </div>
</template>

<script>
export default {
  name: 'status-dnd-icon',
  props: ['text']
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
    .dnd-icon {
      opacity: 1;
      fill: #f74343;
    }
  }
  .dnd-text {
    margin: 1px;
    color: #74736D;
    font-size: 14px;
    line-height: 16px;
  }  
}
</style>