/*
 * @Author: Allen OYang
 * @Date: 2021-09-23 09:52:09
 * @Descripttion:
 * @LastEditTime: 2021-09-24 11:45:14
 * @FilePath: /plugin-core/packages/xyplayer_react/src/config/player-config.ts
 */


export const config = {
  thumbnail: {
    pic_num: 17,
    width: 160,
    height: 90,
    col: 24,
    row: 10,
    url: "https://testdevcdn.xylink.com/test-video/test-img.png"
  },
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
  }
}


export const hls_config = {
  type: 'hls',
  autoplay: false,
  isMobile: false,
  option: {
    multiStreams: [
      {
        src: "http://cd-live-stream.news.cctvplus.com/live/smil:CHANNEL1.smil/chunklist_w744036192_b1000000.m3u8",
        text: "CCTV ",
      },
      {
        src: "http://cd-live-stream.news.cctvplus.com/live/smil:CHANNEL2.smil/chunklist_w1018196661_b1000000.m3u8",
        text: "测试二",
      }
    ],
    playIndex: 1,
  }
}