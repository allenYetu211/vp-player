/*
 * @Author: Allen OYang
 * @Date: 2022-01-04 17:53:58
 * @Descripttion: 
 * @LastEditTime: 2022-01-04 18:47:24
 * @FilePath: /plugin-core/packages/xyplayer_react/example/player-config.ts
 */



export const configFVL = {
  "hideMultiCode": false,
  "type": "flv",
  "hideRefresh": false,
  "option": {
    "multiStreams": [{
      "src": "http://presecurelive.ainemo.com/prenemo/9680e36d7e23e33b017e2480cca10064_2.flv?auth_key=48437da5e05a81318ca2a399109444df-1641384005-17c47228b8a744cc8ccb21a7288b8029-",
      "text": "标清",
      "index": 0
    }, {
      "src": "http://presecurelive.ainemo.com/prenemo/9680e36d7e23e33b017e2480cca10064.flv?auth_key=1b40586bb0d78bf00caf0a2d5d64d87e-1641384005-44f7b560126e4318974475c6a28bd537-",
      "text": "高清",
      "index": 1
    }],
    "playIndex": 1
  },
  "videoBarrage": {
    "fontSize": 20,
    "defaultBarrageState": false,
    "tracksLine": 3,
    "trackSpacing": 30,
    "textSpacing": 20,
    "cacheData": 20
  }
}

const isMobile = false;
export const configHLS = {
  "hideMultiCode": true,
  "type": "hls",
  "hideRefresh": false,
  "option": {
    "multiStreams": [{
      "src": "http://presecurelive.ainemo.com/prenemo/9680e36d7e23e33b017e2480cca10064_2.m3u8?auth_key=9fbd52aec7c9c333a2d2a7a2c3e8cf82-1641384005-5061d63fa766451db80d537658abd11f-",
      "text": "标清",
      "index": 0
    }, {
      "src": "http://presecurelive.ainemo.com/prenemo/9680e36d7e23e33b017e2480cca10064.m3u8?auth_key=a3143a4e8f943640fccb1092a6585a3e-1641384005-c009da2dfce34a2abbccb1d5d2bb9fb5-",
      "text": "高清",
      "index": 1
    }],
    "playIndex": 1
  },
  "videoBarrage": {
    fontSize: isMobile ? 16 : 20, // 字体大小
    defaultBarrageState: true,
    tracksLine: isMobile ? 2 : 3, // 弹幕轨道数
    trackSpacing: isMobile ? 25 : 30, // 轨道间距
    textSpacing: isMobile ? 10 : 20, // 弹幕间距
    cacheData: 20,
  }
}