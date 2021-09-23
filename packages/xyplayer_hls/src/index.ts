/*
 * @Author: Allen OYang
 * @Date: 2021-07-22 09:07:56
 * @Descripttion: 
 * @LastEditTime: 2021-09-23 17:38:11
 * @FilePath: /plugin-core/packages/xyplayer_hls/src/index.ts
 */


import XYPlayer from 'xyplayer';
import Hls from 'hls.js';



class playerHLS extends XYPlayer {

  hls: Hls;
  url: string = '';

  private timestampUnit: boolean | string = 't';

  constructor(options) {
    super(options);
    this.timestampUnit = this.config.timestampUnit;
  }

  start(url?: string) {
    this.url = url || this.config.url;
    this.root.insertBefore(this.video, this.root.firstChild);

    if (Hls.isSupported()) {

      const hlsConfig = Object.assign({
        xhrSetup: async (xhr: any, url: string) => {
          //  .ts 文件不增加时间戳，防止文件OSS 命中降低。
          let requestUrl = url;
          /**
           *  TODO:  windos系统电脑问题 IE11 黑屏内存使用率过高情况下偶现黑屏（高概率）
           *  可能原因:   
           *   1. 电脑CPU 使用率过高， 关闭高使用率的应用后，黑屏情况大幅减少约（1/20）
           *   2. 偶现部分TS 文件请求被挂载，可能愿意还是CPU 问题导致IE请求发送被挂载。
           *  可以修改调试： (/\.m3u8/.test(url) ||  deviceType.ie) 
           *  
           */

          if (this.timestampUnit && (/\.m3u8/.test(url) || XYPlayer.device.ie)) {
            requestUrl = /\?/.test(url) ? `${url}&${this.timestampUnit}=${new Date().getTime()}` : `${url}?${this.timestampUnit}=${new Date().getTime()}`
          }
          xhr.open('GET', requestUrl, true);
        }
      }, XYPlayer.device.ie ? {} : {
        maxBufferLength: 120,
        maxMaxBufferLength: 600,
        maxBufferSize: 60 * 1000 * 1000,
      })


      this.hls = new Hls(hlsConfig);

      this.hls.loadSource(this.url);
      this.hls.attachMedia(this.video);
      // this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
      //   this.autoplay && this.play();
      //   if (this.vod) {
      //     this.videoEl.addEventListener('loadedmetadata', () => {
      //       this._emitter.emit('duration', this.videoEl.duration * 1000)
      //     });
      //   }
      // });
      // this.addPlayerListener();
    } else if (this.video.canPlayType('application/vnd.apple.mpegurl')) {
      this.video.src = this.url;
      this.video.load();
      // this.video.addEventListener('loadedmetadata', () => {
      //   this.autoplay && this.play();
      //   this._emitter.emit('duration', this.videoEl.duration * 1000)
      //   // 获取时长
      // });
    } else {
      throw new Error('Hls player error');
    }
  }


  set videoURL(url) {
    try {
      this.destroy();
    } catch (e) {
      console.log('videoURL Error: ', e);
    }

    this.start(url);

  }

  destroy() {
    this.hls.destroy();
  }


}

export default playerHLS;

// const app = () => {
//   ('app<<<<<>2>>>><')
// }
// export  default app;