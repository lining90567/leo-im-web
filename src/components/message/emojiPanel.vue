<template>
  <div isEmoji>
    <div class="emoji-pop slide-top" isEmoji :id="id" tabindex="-1">
      <ul class="tabpage" isEmoji>
        <li class="tabpage-item" v-bind:class="{'active': activeIndex == 1}" @click="activeIndex = 1">
          <a isEmoji href="javascript:;">表情</a>
        </li>
        <li class="tabpage-item" v-bind:class="{'active': activeIndex == 2}" @click="activeIndex = 2">
          <a isEmoji href="javascript:;">自然&食物</a>
        </li>
      </ul>
      <div class="emoji-container" v-bind:class="{'active': activeIndex == 1}" v-bind:style="emojiContentStyle" isEmoji>
        <div class="icon-container" @click="selectEmoticon" isEmoji>
          <a title="龇牙" type="emoji_icon">😀</a>
          <a title="憨笑" type="emoji_icon">😁</a>
          <a title="破涕为笑" type="emoji_icon">😂</a>
          <a title="笑的打滚" type="emoji_icon">🤣</a>
          <a title="大笑" type="emoji_icon">😃</a>
          <a title="笑眯眯" type="emoji_icon">😄</a>
          <a title="笑的流汗" type="emoji_icon">😅</a>
          <a title="咧嘴笑" type="emoji_icon">😆</a>
          <a title="眨眼" type="emoji_icon">😉</a>
          <a title="愉快" type="emoji_icon">😊</a>
          <a title="美味" type="emoji_icon">😋</a>
          <a title="酷" type="emoji_icon">😎</a>
          <a title="色" type="emoji_icon">😍</a>
          <a title="接吻" type="emoji_icon">😘</a>
          <a title="亲亲" type="emoji_icon">😗</a>
          <a title="热情" type="emoji_icon">☺️</a>
          <a title="微笑" type="emoji_icon">🙂</a>
          <a title="拥抱" type="emoji_icon">🤗</a>
          <a title="兴奋" type="emoji_icon">🤩</a>
          <a title="想想" type="emoji_icon">🤔</a>
          <a title="皱眉" type="emoji_icon">🤨</a>
          <a title="面无表情" type="emoji_icon">😐</a>
          <a title="转眼珠" type="emoji_icon">🙄</a>
          <a title="傻笑" type="emoji_icon">😏</a>
          <a title="无助" type="emoji_icon">😣</a>
          <a title="汗" type="emoji_icon">😥</a>
          <a title="惊讶" type="emoji_icon">😮</a>
          <a title="封上嘴" type="emoji_icon">🤐</a>
          <a title="睡觉" type="emoji_icon">😪</a>
          <a title="精疲力尽" type="emoji_icon">😫</a>
          <a title="打呼噜" type="emoji_icon">😴</a>
          <a title="高兴" type="emoji_icon">😌</a>
          <a title="调皮" type="emoji_icon">😜</a>
          <a title="流口水" type="emoji_icon">🤤</a>
          <a title="不满" type="emoji_icon">😒</a>
          <a title="冷汗" type="emoji_icon">😓</a>
          <a title="沉思" type="emoji_icon">😔</a>
          <a title="困惑" type="emoji_icon">😕</a>
          <a title="眼里只有钱" type="emoji_icon">🤑</a>
          <a title="惊讶" type="emoji_icon">😲</a>
          <a title="皱眉" type="emoji_icon">☹️</a>
          <a title="呸" type="emoji_icon">😖</a>
          <a title="失望" type="emoji_icon">😞</a>
          <a title="担心" type="emoji_icon">😟</a>
          <a title="沮丧" type="emoji_icon">😤</a>
          <a title="流泪" type="emoji_icon">😢</a>
          <a title="大哭" type="emoji_icon">😭</a>
          <a title="打哈欠" type="emoji_icon">😦</a>
          <a title="生气" type="emoji_icon">😠</a>
          <a title="发怒" type="emoji_icon">😡</a>
          <a title="脸红" type="emoji_icon">😳</a>
          <a title="头晕" type="emoji_icon">😵</a>
          <a title="打喷嚏" type="emoji_icon">😷</a>
          <a title="生病" type="emoji_icon">🤧</a>
          <a title="晕圈" type="emoji_icon">😇</a>
          <a title="牛仔" type="emoji_icon">🤠</a>
          <a title="小丑" type="emoji_icon">🤡</a>
          <a title="说谎" type="emoji_icon">🤥</a>
          <a title="安静" type="emoji_icon">🤫</a>
          <a title="捂嘴笑" type="emoji_icon">🤭</a>
          <a title="单片眼镜" type="emoji_icon">🧐</a>
          <a title="愚蠢" type="emoji_icon">🤓</a>
          <a title="强壮" type="emoji_icon">💪</a>
          <a title="左" type="emoji_icon">👈</a>
          <a title="右" type="emoji_icon">👉</a>
          <a title="上" type="emoji_icon">☝️</a>
          <a title="下" type="emoji_icon">👇</a>
          <a title="胜利" type="emoji_icon">✌️</a>
          <a title="爱你" type="emoji_icon">🤟</a>
          <a title="OK" type="emoji_icon">👌</a>
          <a title="强" type="emoji_icon">👍</a>
          <a title="弱" type="emoji_icon">👎</a>
          <a title="拳头" type="emoji_icon">✊</a>
          <a title="握手" type="emoji_icon">🤝</a>
          <a title="魔鬼" type="emoji_icon">😈</a>
          <a title="天狗" type="emoji_icon">👺</a>
          <a title="骷髅" type="emoji_icon">💀</a>
          <a title="鬼" type="emoji_icon">👻</a>
          <a title="外星人" type="emoji_icon">👽</a>
          <a title="机器人" type="emoji_icon">🤖</a>
          <a title="便便" type="emoji_icon">💩</a>
          <a title="快乐猫" type="emoji_icon">😺</a>
          <a title="大笑猫" type="emoji_icon">😹</a>
          <a title="色猫" type="emoji_icon">😻</a>
          <a title="傻笑猫" type="emoji_icon">😼</a>
          <a title="接吻猫" type="emoji_icon">😽</a>
          <a title="惊恐的猫" type="emoji_icon">🙀</a>
          <a title="哭泣的猫" type="emoji_icon">😿</a>
          <a title="暴躁的猫" type="emoji_icon">😾</a>
          <a title="婴儿" type="emoji_icon">👶</a>
          <a title="男孩" type="emoji_icon">👦</a>
          <a title="女孩" type="emoji_icon">👧</a>
          <a title="男人" type="emoji_icon">👨</a>
          <a title="女人" type="emoji_icon">👩</a>
          <a title="老男人" type="emoji_icon">👴</a>
          <a title="老女人" type="emoji_icon">👵</a>
          <a title="爱心" type="emoji_icon">❤️</a>
          <a title="心碎" type="emoji_icon">💔</a>
          <a title="睡觉" type="emoji_icon">💤</a>
          <a title="吃饭" type="emoji_icon">🍚</a>
          <a title="玫瑰" type="emoji_icon">🌹</a>
          <a title="足球" type="emoji_icon">⚽</a>
          <a title="太阳" type="emoji_icon">☀️</a>
          <a title="月亮" type="emoji_icon">🌙</a>
          <a title="闪电" type="emoji_icon">⚡</a>
        </div>
      </div>
      <div class="emoji-container" v-bind:class="{'active': activeIndex == 2}" v-bind:style="emojiContentStyle">
        <div class="icon-container" @click="selectEmoticon" isEmoji>
          <a title="猴子" type="emoji_icon">🐵</a>
          <a title="大猩猩" type="emoji_icon">🦍</a>
          <a title="狗狗" type="emoji_icon">🐶</a>
          <a title="狼" type="emoji_icon">🐺</a>
          <a title="狐狸" type="emoji_icon">🦊</a>
          <a title="猫" type="emoji_icon">🐱</a>
          <a title="狮子" type="emoji_icon">🦁</a>
          <a title="老虎" type="emoji_icon">🐯</a>
          <a title="豹子" type="emoji_icon">🐆</a>
          <a title="马" type="emoji_icon">🐴</a>
          <a title="斑马" type="emoji_icon">🦓</a>
          <a title="奶牛" type="emoji_icon">🐮</a>
          <a title="猪" type="emoji_icon">🐷</a>
          <a title="野猪" type="emoji_icon">🐗</a>
          <a title="绵羊" type="emoji_icon">🐏</a>
          <a title="山羊" type="emoji_icon">🐐</a>
          <a title="骆驼" type="emoji_icon">🐪</a>
          <a title="长颈鹿" type="emoji_icon">🦒</a>
          <a title="大象" type="emoji_icon">🐘</a>
          <a title="犀牛" type="emoji_icon">🦏</a>
          <a title="老鼠" type="emoji_icon">🐭</a>
          <a title="兔子" type="emoji_icon">🐰</a>
          <a title="松鼠" type="emoji_icon">🐿️</a>
          <a title="刺猬" type="emoji_icon">🦔</a>
          <a title="蝙蝠" type="emoji_icon">🦇</a>
          <a title="熊" type="emoji_icon">🐻</a>
          <a title="熊猫" type="emoji_icon">🐼</a>
          <a title="考拉" type="emoji_icon">🐨</a>
          <a title="火鸡" type="emoji_icon">🦃</a>
          <a title="鸡" type="emoji_icon">🐔</a>
          <a title="鸟" type="emoji_icon">🐦</a>
          <a title="企鹅" type="emoji_icon">🐧</a>
          <a title="鸽子" type="emoji_icon">🕊️</a>
          <a title="老鹰" type="emoji_icon">🦅</a>
          <a title="鸭子" type="emoji_icon">🦆</a>
          <a title="猫头鹰" type="emoji_icon">🦉</a>
          <a title="青蛙" type="emoji_icon">🐸</a>
          <a title="鳄鱼" type="emoji_icon">🐊</a>
          <a title="乌龟" type="emoji_icon">🐢</a>
          <a title="蜥蜴" type="emoji_icon">🦎</a>
          <a title="蛇" type="emoji_icon">🐍</a>
          <a title="龙" type="emoji_icon">🐲</a>
          <a title="恐龙" type="emoji_icon">🦖</a>
          <a title="鲸鱼" type="emoji_icon">🐳</a>
          <a title="海豚" type="emoji_icon">🐬</a>
          <a title="鱼" type="emoji_icon">🐟</a>
          <a title="热带鱼" type="emoji_icon">🐠</a>
          <a title="鲨鱼" type="emoji_icon">🦈</a>
          <a title="章鱼" type="emoji_icon">🐙</a>
          <a title="海螺" type="emoji_icon">🐚</a>
          <a title="螃蟹" type="emoji_icon">🦀</a>
          <a title="虾" type="emoji_icon">🦐</a>
          <a title="蜗牛" type="emoji_icon">🐌</a>
          <a title="蝴蝶" type="emoji_icon">🦋</a>
          <a title="虫子" type="emoji_icon">🐛</a>
          <a title="蚂蚁" type="emoji_icon">🐜</a>
          <a title="黄蜂" type="emoji_icon">🐝</a>
          <a title="瓢虫" type="emoji_icon">🐞</a>
          <a title="蚂蚱" type="emoji_icon">🦗</a>
          <a title="蜘蛛" type="emoji_icon">🕷️</a>
          <a title="花束" type="emoji_icon">💐</a>
          <a title="樱花" type="emoji_icon">🌸</a>
          <a title="玫瑰花" type="emoji_icon">🌹</a>
          <a title="芙蓉花" type="emoji_icon">🌺</a>
          <a title="向日葵" type="emoji_icon">🌻</a>
          <a title="郁金香" type="emoji_icon">🌷</a>
          <a title="幼苗" type="emoji_icon">🌱</a>
          <a title="树" type="emoji_icon">🌳</a>
          <a title="仙人掌" type="emoji_icon">🌵</a>
          <a title="庄稼" type="emoji_icon">🌾</a>
          <a title="蘑菇" type="emoji_icon">🍄</a>
          <a title="红叶" type="emoji_icon">🍁</a>
          <a title="地球" type="emoji_icon">🌏</a>
          <a title="月亮" type="emoji_icon">🌙</a>
          <a title="太阳" type="emoji_icon">☀️</a>
          <a title="星星" type="emoji_icon">⭐</a>
          <a title="白云" type="emoji_icon">☁️</a>
          <a title="雨云" type="emoji_icon">🌧️️</a>
          <a title="雷电" type="emoji_icon">🌩️</a>
          <a title="降雪" type="emoji_icon">🌨️</a>
          <a title="雾" type="emoji_icon">🌫️</a>
          <a title="彩虹" type="emoji_icon">🌈</a>
          <a title="雨伞" type="emoji_icon">☂️</a>
          <a title="闪电" type="emoji_icon">⚡</a>
          <a title="雪花" type="emoji_icon">❄️</a>
          <a title="雪人" type="emoji_icon">⛄</a>
          <a title="火" type="emoji_icon">🔥</a>
          <a title="水" type="emoji_icon">💧</a>
          <a title="圣诞树" type="emoji_icon">🎄</a>
          <a title="西瓜" type="emoji_icon">🍉</a>
          <a title="香蕉" type="emoji_icon">🍌</a>
          <a title="草莓" type="emoji_icon">🍓</a>
          <a title="葡萄" type="emoji_icon">🍇</a>
          <a title="苹果" type="emoji_icon">🍎</a>
          <a title="樱桃" type="emoji_icon">🍒</a>
          <a title="蛋糕" type="emoji_icon">🍞</a>
          <a title="烤肉" type="emoji_icon">🍖</a>
          <a title="汉堡" type="emoji_icon">🍔</a>
          <a title="披萨" type="emoji_icon">🍕</a>
          <a title="热狗" type="emoji_icon">🌭</a>
          <a title="冰淇淋" type="emoji_icon">🍦</a>
          <a title="饼干" type="emoji_icon">🍪</a>
          <a title="棒棒糖" type="emoji_icon">🍭</a>
          <a title="啤酒" type="emoji_icon">🍺</a>
          <a title="坚果" type="emoji_icon">🌰</a>
        </div>
      </div>
      <div class="pop-arrow" isEmoji></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      emojiContentStyle: {
        height: '250px'
      },
      activeIndex: 1
    }
  },
  name: 'emoji-pannel',
  methods: {
    selectEmoticon(e) {
      if(e.target.getAttribute('type') != null && e.target.getAttribute('type') === 'emoji_icon') {
        this.$emit('select-emoticon', e.target.innerHTML)
      }
    }
  },
  props: {
    id: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
body {
  font-family: Helvetica Neue,Helvetica,Hiragino Sans GB,Microsoft YaHei,\\5FAE\8F6F\96C5\9ED1,Arial,sans-serif;  
}
.emoji-pop {
  position: absolute;
  background-color: #fff;
  z-index: 99;
  outline: none;
  height: 260px;
  width: 470px;
  overflow: none;
  background-color: #eee;
  top: -260px;
  left: 10px;
  .tabpage {
    margin: 0;
    padding: 8px 20px 0;
    overflow: hidden;
    background-color: #e4e4e4;
  }
  .tabpage-item {
    float: left;
    border-top-left-radius: 4px;
    -moz-border-radius-topleft: 4px;
    -webkit-border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    -moz-border-radius-topright: 4px;
    -webkit-border-top-right-radius: 4px;
    a {
      display: block;
      text-decoration: none;
      color: #333;
      padding: 5px 20px;
      font-size: 14px;
      outline: 0;   
    }   
  }
  .emoji-container {
    height: 250px;
    overflow-y: none;
    display: none;
    padding: 8px 2px 8px 17px;
  }
  .emoji-container.active {
    display: block;
  }
  .tabpage-item.active {
    background-color: #fff;
  }
  ul {
    padding-left: 0;
    list-style-type: none;
  }
  li {
    display: list-item;
    text-align: -webkit-match-parent;
  }
  .icon-container {
    margin-right: -1px;
    height: 230px;
    padding: 0;
    overflow-y: auto;
    a {
      float: left;
      width: 28px;
      height: 28px;
      font-size: 19px;
      text-align: center;
      border-bottom: 1px solid #E6E5E2;
      border-right: 1px solid #E6E5E2;
      cursor: pointer;
    }       
  }                           
}
.slide-top {
  -webkit-transition: all 0 cubic-bezier(.25,.46,.45,.94);
  transition: all 0 cubic-bezier(.25,.46,.45,.94);
}
.pop-arrow {
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
  border-width: 8px;
  border-color: #eee transparent transparent transparent;
  border-style: solid dashed dashed dashed;
  left: 14px;
  top: 260px;
}
</style>

