/*
 * @Author: Allen OYang
 * @Date: 2021-06-22 09:03:42
 * @Descripttion: 
 * @LastEditTime: 2021-07-30 17:30:14
 * @FilePath: /plugin-core/examples/index.js
 */


const pl = document.querySelector('#video');

const player = new Player({
  el: pl,
  type: 'mp4',
  url: 'https://testdevcdn.xylink.com/test-video/xg360.mp4',
  autoplay: false
});



// const player = new PlayerHLS({
//   el: pl,
//   type: 'mp4',
//   url: 'http://cd-live-stream.news.cctvplus.com/live/smil:CHANNEL1.smil/chunklist_w744036192_b1000000.m3u8',
//   autoplay: false
// });

