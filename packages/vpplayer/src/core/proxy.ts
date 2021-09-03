/*
 * @Author: Allen OYang
 * @Date: 2021-07-02 17:27:05
 * @Descripttion: 
 * @LastEditTime: 2021-07-30 17:57:05
 * @FilePath: /plugin-core/packages/vpplayer/src/core/proxy.ts
 */


import EventEmitter from 'eventemitter3';
import { createDOM } from '../util'


export default class Proxy {
  private _emitter: EventEmitter = new EventEmitter();
  public video // 播放器video

  constructor() {
    this.video = createDOM({
      el: 'video',
      cname: 'video-player',
      // 获取上层元素宽高， 处理。
      attrs: {
        width: '100%',
        height: '100%',
      }
    })

    this.addVideoEventListener()
  }

  addVideoEventListener() {
    const event = ['play', 'playing', 'pause', 'ended', 'error', 'seeking', 'seeked',
      'timeupdate', 'waiting', 'canplay', 'canplaythrough', 'durationchange', 'volumechange', 'loadeddata', 'loadstart'
    ];

    event.forEach((item) => {
      this.video.addEventListener(item, () => {
        this.emit(item)
      })
    })
  }



  get paused() {
    return this.video.paused
  }
  get playbackRate() {
    return this.video.playbackRate
  }
  set playbackRate(rate) {
    this.video.playbackRate = rate
  }
  get played() {
    return this.video.played
  }
  get preload() {
    return this.video.preload
  }

  get duration() {
    return this.video.duration
  }

  get buffered() {
    return this.video.buffered
  }

  get currentTime() {
    return this.video ? this.video.currentTime || 0 : 0;

    // if(this.video) {
    //   return this.video.currentTime || 0
    // } else {
    //   return 0
    // }
  }

  set currentTime(vol) {
    this.video.currentTime = vol

    // if(this.video) {
    //   return this.video.currentTime || 0
    // } else {
    //   return 0
    // }
  }

  get volume() {
    return this.video.volume
  }
  set volume(vol) {
    this.video.volume = vol
  }



  // 发布订阅
  public on(event: string, listener: EventEmitter.ListenerFn) {
    this._emitter.addListener(event, listener);
  }

  public once(event: string, listener: EventEmitter.ListenerFn) {
    this._emitter.once(event, listener);
  }

  public off(event: string, listener: EventEmitter.ListenerFn) {
    this._emitter.removeListener(event, listener);
  }

  public emit(event: string, ...args: any[]) {
    this._emitter.emit(event, args);
  }

  public removeAllListeners() {
    this._emitter.removeAllListeners();
  }
}



