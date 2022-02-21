/*
 * @Author: Allen OYang
 * @Date: 2022-02-16 10:25:40
 * @LastEditTime: 2022-02-21 19:15:29
 */

import XYPlayer from 'xyplayer';
import FlvJs from 'flv.js';


class playerFLV extends XYPlayer {

  public flv;
  public url: string = '';
  public type: string = 'flv';

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
    this.addPlayerListener();
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

  private addPlayerListener() {

    this.flv.on(FlvJs.ErrorTypes.NETWORK_ERROR, (e: any) => {
      this.emit('NETWORK_ERROR', e)
    })

    this.flv.on(FlvJs.Events.STATISTICS_INFO, (e:any) => {
      this.emit('STATISTICS_INFO', e)
    })
    
    this.flv.on(FlvJs.Events.ERROR, (e:any) => {
      this.emit('ERROR', e)
    })

    this.flv.on(FlvJs.ErrorTypes.MEDIA_ERROR, (e:any) => {
      this.emit('MEDIA_ERROR', e)
    })

    this.flv.on(FlvJs.ErrorTypes.OTHER_ERROR, (e:any) => {
      this.emit('OTHER_ERROR', e)
    })

    this.flv.on(FlvJs.Events.LOADING_COMPLETE, (e:any) => {
      // LOADING_COMPLETE	The input MediaDataSource has been completely buffered to end
      this.emit('LOADING_COMPLETE')
    })

  }


}

export default playerFLV;