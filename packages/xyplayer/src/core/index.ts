/*
 * @Author: Allen OYang
 * @Date: 2021-07-02 16:25:06
 * @Descripttion: 
 * @LastEditTime: 2022-02-16 17:36:00
 * @FilePath: /plugin-core/packages/xyplayer/src/core/index.ts
 */

import Proxy from './proxy';
import * as util from '@/util';
import { createDOM, addClass, removeClass } from '@/util';
import style from '@/skin/styles/index.scss';
import { configInterface } from '@/interface';
import deviceInfo from '@/util/deviceInfo';

class Player extends Proxy {
  public root // 根节点
  public config: Partial<configInterface> = null // 用户配置
  public isProgressMoving: boolean = false // 用户是否在拖动进度条

  public controls: any = null // 控制器
  public canPlayFunc // 播放函数
  public videoConfig = {  // 播放器基础配置
    ignores: [],
    whitelist: [],
    lang: (document.documentElement.getAttribute('lang') || navigator.language || 'zh-cn').toLocaleLowerCase(),
    inactive: 3000,
    volume: 0.6,
    controls: true,
    controlsList: ['nodownload']

  }

  // 插件集合
  static plugins: any = {}

  constructor(config?: Partial<configInterface>) {
    super()
    this.config = config
    const videoContainer = createDOM({
      el: 'vp-container',
      cname: style.container,
    })
    console.log('appendChild >>>> ');
    this.config.el.appendChild(videoContainer);
    this.root = videoContainer;
    this.controls = createDOM({
      el: 'controls',
      cname: style.controls,
      tpl: `
        <vp-controls-left class="${style.controlsLeft}"></vp-controls-left>
        <vp-controls-right  class="${style.controlsRight}"></vp-controls-right>
      `,
      attrs: {
        unselectable: 'on',
        onselectstart: 'return false'
      }
    })

    this.createContainerDOM()
    this.root.appendChild(this.controls)
    // this.setControlsStyles()
    this.start()
  }

  // setControlsStyles() {
  //   addClass(this.controls, '')
  // }

  // 创建UI内容
  createContainerDOM() {

    // this.root.appendChild(this.video)
    this.pluginsCall()
    this.emit('ready')
  }



  pluginsCall() {
    if (Player.plugins) {
      // let ignores = this.config.ignores
      Object.keys(Player.plugins).forEach(name => {
        let descriptor = Player.plugins[name]
        descriptor.call(this, this)
      })
    }
  }

  videoStateOrder = {
    canPlayFunc: () => {
      const playPromise = this.play()
      if (playPromise !== undefined && playPromise) {
        playPromise.then(() => {
          console.log('>>> playPromise autoplay started')
          this.emit('autoplay started')
        }).catch(() => {
          console.log('>>> playPromise was prevented')
          this.emit('autoplay was prevented')
          // Player.util.addClass(this.root, 'vp-is-autoplay')
        })
      }
    }
  }


  start() {
    const url: string = this.config.url;
    if (!url || url === '') {
      this.emit('urlNull')
    }
    this.video.src = url;
    this.root.insertBefore(this.video, this.root.firstChild)
    if (this.config.autoplay) {
      this.videoStateOrder.canPlayFunc()
    }
  }

  play() {
    this.onPlay()
    console.log('play');
    return this.video.play()
  }

  pause() {
    this.onPause()
    this.video.pause()
  }

  onPlay() {
    // addClass(this.root, 'vp-isloading')
    addClass(this.root, style.playing)
    removeClass(this.root, style.pause)
  }

  onPause() {
    addClass(this.root, style.pause)
    // removeClass(this.root, style.playing)
  }



  static install(name: string, descriptor) {
    if (!Player.plugins[name]) {
      Player.plugins[name] = descriptor
    }
  }

  static util = util;

  static device = deviceInfo;
}

// Player.util = {
//   createDOM, addClass, removeClass, findDom, hasClass, toggleClass, padStart, format
// }

export default Player

