/*
 * @Author: Allen OYang
 * @Date: 2022-02-16 10:25:40
 * @LastEditTime: 2022-02-16 11:56:03
 */

import XYPlayer from 'xyplayer';
import FlvJs from 'flv.js';


class playerFLV extends XYPlayer {

  flv;
  url: string = '';
  private timestampUnit: boolean | string = 't';

  constructor(options) {

    super(options);
    this.timestampUnit = this.config.timestampUnit;
    this.root.insertBefore(this.video, this.root.firstChild);

  }

  start(url?: string) {
    
    this.url = url || this.config.url;
    this.flv = FlvJs.createPlayer({ type: 'flv', url: this.url }, { isLive: true });
    this.flv.attachMediaElement(this.video);
    console.log('load')
    this.flv.load();
    this.config.autoplay && this.play();
    // this.addPlayerListener();
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
    this.flv.destroy();
  }


}

export default playerFLV;