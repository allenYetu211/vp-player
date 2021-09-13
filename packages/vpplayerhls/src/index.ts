/*
 * @Author: Allen OYang
 * @Date: 2021-07-22 09:07:56
 * @Descripttion: 
 * @LastEditTime: 2021-07-29 14:35:52
 * @FilePath: /plugin-core/packages/vpplayerhls/src/index.ts
 */


import Player from 'vpplayer';

import Hls from 'hls.js';


class playerHLS extends Player {
  constructor(options) {
    super(options);
  }

  start() {
    console.log('Hls.isSupported()', Hls.isSupported());

    const url: string = this.config.url;
    this.root.insertBefore(this.video, this.root.firstChild);

    if (Hls.isSupported()) {
      var hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(this.video);
    } else if (this.video.canPlayType('application/vnd.apple.mpegurl')) {
      this.video.src = url;
    }

    // const url: string = this.config.url;
    // if (!url || url === '') {
    //   this.emit('urlNull')
    // }
    // this.video.src = url
    // this.root.insertBefore(this.video, this.root.firstChild)
    // if (this.config.autoplay) {
    //   this.videoStateOrder.canPlayFunc()
    // }
  }

}

export default playerHLS;

// const app = () => {
//   ('app<<<<<>2>>>><')
// }
// export  default app;