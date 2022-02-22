/*
 * @Author: Allen OYang
 * @Date: 2021-09-13 15:31:30
 * @Descripttion:
 * @LastEditTime: 2022-02-22 16:16:56
 * @FilePath: /plugin-core/packages/xyplayer_antiscreenrecording/src/core/index.ts
 */

import CanvasProxy from './canvas';
import { Type } from 'src';

class AntiScreenRecoording extends CanvasProxy {
  public config: Type = {
    fontSize: 12,
    text: '',
    color: '#fff',
    duration: 60000,
    interval: 10000,
  };
  public Interval: any;
  public Timeout: any;

  constructor(element: HTMLCanvasElement, config: Type) {
    super(element);

    this.config = Object.assign({}, this.config, config);

    this.ctx.font = `${this.config.fontSize || 25}px "PingFang SC", "Microsoft JhengHei", "Microsoft YaHei", "sans-serif"`;
  }

  /**
   * 开始处理内容
   */

  public start() {
    this.Interval = setInterval(() => {
      this.draw();
      this.Timeout = setTimeout(() => {
        this.clear();
      }, this.config.duration)
    }, this.config.interval)
  };


  /**
   * 绘制信息
   */
  public draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.save();
    this.ctx.shadowColor = this.config.color;
    this.ctx.fillStyle = this.config.color;
    this.ctx.textAlign = "left";

    const text = this.ctx.measureText(this.config.text);
    const left = this.getLimitRandom(100, this.width - text.width);
    const top = this.getLimitRandom(100, this.height - 100);

    this.ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    // 将阴影向右移动15px，向上移动10px
    this.ctx.shadowOffsetX = 3;
    this.ctx.shadowOffsetY = 3;
    // 轻微模糊阴影
    this.ctx.shadowBlur = 2;

    this.ctx.fillText(this.config.text, left, top);
    this.ctx.restore;
  };

  public clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.save();
  }

  public destroy() {
    this.clear();
    clearInterval(this.Interval);
    clearTimeout(this.Timeout);
  }
}

export default AntiScreenRecoording;