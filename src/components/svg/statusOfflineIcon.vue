<template>
  <div class="container">
    <div class="svg-container">
      <svg version="1.1" id="Layer_1" inkscape:version="0.48.4 r9939" sodipodi:docname="TRASH_1_4.svg" x="0px" y="0px" viewBox="-299 391 12 12" style="enable-background:new -299 391 12 12;" xml:space="preserve"><sodipodi:namedview inkscape:cx="26.358185" inkscape:zoom="1.18" bordercolor="#666666" pagecolor="#ffffff" borderopacity="1" objecttolerance="10" inkscape:cy="139.7898" gridtolerance="10" guidetolerance="10" showgrid="false" showguides="true" id="namedview6" inkscape:pageopacity="0" inkscape:pageshadow="2" inkscape:guide-bbox="true" inkscape:window-width="1366" inkscape:current-layer="Layer_1" inkscape:window-height="705" inkscape:window-y="-8" inkscape:window-maximized="1" inkscape:window-x="-8"> <sodipodi:guide position="50.036793,85.991376" orientation="1,0" id="guide2986"></sodipodi:guide> <sodipodi:guide position="58.426196,66.216355" orientation="0,1" id="guide3047"></sodipodi:guide></sodipodi:namedview><g><g><ellipse class="offline-icon" cx="-294.5" cy="394" rx="2.5" ry="2.5"></ellipse><path class="offline-icon" d="M-294.3,399.7c0-0.4,0.1-0.8,0.2-1.2c-0.1,0-0.2,0-0.4,0c-2.5,0-2.5-2-2.5-2s-1,0.1-1.2,0.5c-0.4,0.6-0.6,1.7-0.7,2.5 c0,0.1-0.1,0.5,0,0.6c0.2,1.3,2.2,2.3,4.4,2.4h0.1h0.1c0.3,0,0.7,0,1-0.1C-293.9,401.6-294.3,400.7-294.3,399.7z"></path> </g> </g> <g> <path class="offline-icon" d="M-288.9,399.4l1.8-1.8c0.1-0.1,0.1-0.3,0-0.3l-0.7-0.7c-0.1-0.1-0.3-0.1-0.3,0l-1.8,1.8l-1.8-1.8c-0.1-0.1-0.3-0.1-0.3,0 l-0.7,0.7c-0.1,0.1-0.1,0.3,0,0.3l1.8,1.8l-1.8,1.8c-0.1,0.1-0.1,0.3,0,0.3l0.7,0.7c0.1,0.1,0.3,0.1,0.3,0l1.8-1.8l1.8,1.8 c0.1,0.1,0.3,0.1,0.3,0l0.7-0.7c0.1-0.1,0.1-0.3,0-0.3L-288.9,399.4z"></path></g></svg>
    </div>
    <div class="offline-text" v-if="text != null && text != ''">{{ text }}</div>
  </div>
</template>

<script>
export default {
  name: 'status-offline-icon',
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
    .offline-icon {
      opacity: 1;
      fill: #B7B3AD;
    }
  }
  .offline-text {
    margin: -15px 0 0 18px;
    color: #74736D;
    font-size: 14px;
    line-height: 16px;
  }  
}
</style>

