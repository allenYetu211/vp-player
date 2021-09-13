/*
 * @Author: Allen OYang
 * @Date: 2021-06-22 09:03:42
 * @Descripttion: 
 * @LastEditTime: 2021-09-13 17:29:17
 * @FilePath: /plugin-core/examples/index.js
 */


const pl = document.querySelector('#video');

const config = {
  // thumbnail: {
  //   pic_num: 17,
  //   width: 160,
  //   height: 90,
  //   col: 24,
  //   row: 10,
  //   url: "https://testdevcdn.xylink.com/test-video/test-img.png"
  // },
  el: pl,
  type: 'mp4',
  url: 'https://testdevcdn.xylink.com/test-video/xg360.mp4',
  autoplay: false,
  playbackRate: {
    rate: [0.5, 1, 2, 3],
    placeholder: 'X',
    defaultPlaybackRate: 1,
  },
  multiResolution: {
    list: [{
      text: '标清',
      src: 'http://v-vodshare.v.ouchn.cn/vodfiles/sharefiles/live/9680cdbe796b751b0179a2b32e7948ec/202106/16181321/770094e4-fa9c-4bc1-9df5-01ae39d3310f.mp4',
    }, {
      text: '高清',
      src: 'http://v-vodshare.v.ouchn.cn/vodfiles/sharefiles/live/9680cdbe796b751b0179a2b32e7948ec/202106/16181321/770094e4-fa9c-4bc1-9df5-01ae39d3310f.mp4?v=2',
    }, {
      text: '超高清',
      src: 'http://v-vodshare.v.ouchn.cn/vodfiles/sharefiles/live/9680cdbe796b751b0179a2b32e7948ec/202106/16181321/770094e4-fa9c-4bc1-9df5-01ae39d3310f.mp4?v=3',
    }],
    defaultInit: 0
  },


}

const player = new Player(config);

// player.emit('antiScreenRecording_start', {
//   fontSize: 36,
//   text: '测试',
//   color: '#fff',
//   duration: 3000,
//   interval: 2000,
// })


// 弹幕
// player.on('ready', () => {
// let count = 0;
// const interval = setInterval(() => {
//   count += 1;
//   if (count > 100) {
//     clearInterval(interval);
//     return
//   }
//   player.emit('barrageCanvas_push', {
//     value: `${count}：`,
//     speed: 2
//   })
// }, 100);

// setTimeout(() => {
//   player.emit('barrageCanvas_clean')
// }, 2000)

// setTimeout(() => {
//   player.emit('barrageCanvas_open')
// }, 4000)

// player.emit('barrageCanvas_start')
// })


// const player = new PlayerHLS({
//   el: pl,
//   type: 'mp4',
//   url: 'http://cd-live-stream.news.cctvplus.com/live/smil:CHANNEL1.smil/chunklist_w744036192_b1000000.m3u8',
//   autoplay: false
// });

