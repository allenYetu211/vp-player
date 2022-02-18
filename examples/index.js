/*
 * @Author: Allen OYang
 * @Date: 2021-06-22 09:03:42
 * @Descripttion: 
 * @LastEditTime: 2022-02-17 19:50:52
 * @FilePath: /plugin-core/examples/index.js
 */


const pl = document.querySelector('#video');


const isMobile = true;

const config = {
  thumbnail: {
    pic_num: 17,
    width: 160,
    height: 90,
    col: 24,
    row: 10,
    url: "https://testdevcdn.xylink.com/test-video/test-img.png"
  },
  el: pl,
  type: 'mp4',
  url: 'https://testdevcdn.xylink.com/test-video/xg360.mp4',
  autoplay: false,
  playbackRate: {
    rate: [0.5, 1, 2, 3],
    placeholder: 'X',
    defaultPlaybackRate: 1,
  },
  // multiResolution: {
  //   list: [{
  //     text: '标清',
  //     src: 'http://v-vodshare.v.ouchn.cn/vodfiles/sharefiles/live/9680cdbe796b751b0179a2b32e7948ec/202106/16181321/770094e4-fa9c-4bc1-9df5-01ae39d3310f.mp4',
  //   }, {
  //     text: '高清',
  //     src: 'http://v-vodshare.v.ouchn.cn/vodfiles/sharefiles/live/9680cdbe796b751b0179a2b32e7948ec/202106/16181321/770094e4-fa9c-4bc1-9df5-01ae39d3310f.mp4?v=2',
  //   }, {
  //     text: '超高清',
  //     src: 'http://v-vodshare.v.ouchn.cn/vodfiles/sharefiles/live/9680cdbe796b751b0179a2b32e7948ec/202106/16181321/770094e4-fa9c-4bc1-9df5-01ae39d3310f.mp4?v=3',
  //   }],
  //   defaultInit: 0
  // },
  isMobile: false,
  barrage: {
    fontSize: isMobile ? 16 : 20, // 字体大小
    defaultBarrageState: true,
    tracksLine: isMobile ? 2 : 3, // 弹幕轨道数
    trackSpacing: isMobile ? 25 : 30, // 轨道间距
    textSpacing: isMobile ? 10 : 20, // 弹幕间距
    cacheData: 20,
    autoEmpty: true,
  }

}

const player = new XYPlayer(config);

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


// const player = new XYPlayerHLS({
//   el: pl,
//   type: 'flv',
//   url: 'http://cd-live-stream.news.cctvplus.com/live/smil:CHANNEL1.smil/chunklist_w744036192_b1000000.m3u8',
//   autoplay: false
// });



// const player = new XYPlayerFLV({
//   el: pl,
//   type: 'flv',
//   url: 'http://prdpulllive.xylink.com/prdnemo/9680cfbe7e82b7ef017f0133d47a55cc.flv?auth_key=a2fc87e84bc6fd64d8240efe4dd6882d-1645086606-a1f657087e10420091454a5cf456cc61-',
//   autoplay: false,
//   isLive: true
// });



