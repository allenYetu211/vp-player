/*
 * @Author: Allen OYang
 * @Date: 2021-09-13 15:31:30
 * @Descripttion:
 * @LastEditTime: 2021-09-13 17:10:41
 * @FilePath: /plugin-core/packages/vpplayer_barrage/src/core/index.ts
 */

/*
 * @Author: Allen OYang
 * @Date: 2021-08-18 10:26:18
 * @Descripttion:
 * @LastEditTime: 2021-08-26 14:30:16
 * @FilePath: /ts-vp/src/component/video-AntiScreenRecording/core/index.ts
 */



import CanvasProxy from './canvas';

interface BarrageItemType {
  value: string;
  top: number;
  left: number;
  color: string;
  offset: number;
  width: number;
}

interface MsgItem {
  value: string;
  top: number;
  left: number;
  color: string;
  speed: number;
  width?: number;
}

interface canvas2D extends CanvasRenderingContext2D {
  webkitBackingStorePixelRatio?: any;
  mozBackingStorePixelRatio?: any;
  msBackingStorePixelRatio?: any;
  backingStorePixelRatio?: any;
  oBackingStorePixelRatio?: any;
}

class BarrageCanvas extends CanvasProxy {

  private barrageList: MsgItem[];
  private msgCacahLength: number = 100;
  // private barrageListItem: MsgItem[] = [];
  private requestAnimationFrameId: any;
  private isRunning: boolean = false;
  private isClose: boolean = false;


  constructor(element: HTMLCanvasElement, maxCache: number = 100) {
    super(element);
    this.barrageList = new Array(maxCache);
    this.msgCacahLength = maxCache;
  }


  draw() {
    if (!this.isRunning) {
      return
    }

    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.save();
    let counter = 0;

    this.barrageList.forEach((msg: MsgItem, index: number) => {
      if (!msg) {
        counter += 1;
        if (counter === this.msgCacahLength) {
          window.cancelAnimationFrame(this.requestAnimationFrameId);
          this.isRunning = false;
        }
      } else {
        this.isRunning = true;
        if (msg.left < 0 - this.width) {
          // @ts-ignore;
          this.barrageList[index] = null;
          return;
        } else {
          msg.left = msg.left - msg.speed;
          this.ctx.shadowColor = msg.color;
          this.ctx.fillStyle = msg.color;
          this.ctx.textAlign = "left";
          this.ctx.fillText(msg.value, msg.left, msg.top);
          const text = this.ctx.measureText(msg.value);
          msg.width = text.width * this.ratio;
          this.ctx.restore;
        }
      }
    });
  }

  start() {

    if (this.isClose) {
      return
    }

    this.isRunning = true;
    this.draw();
    this.requestAnimationFrameId = window.requestAnimationFrame(() => this.start());
  }

  pushBarrage(item: {
    value: string,
    top?: number,
    left?: number,
    color?: string,
    speed?: number,
    viewableArea?: number
  }) {

    if (this.isClose) {
      return
    }


    for (let i = 0; i < this.msgCacahLength; i++) {
      if (!this.barrageList[i]) {
        this.barrageList[i] = {
          value: item.value,
          top: item.top || this.getLimitRandom(30, item.viewableArea ? item.viewableArea - 30 : this.height - 30),
          left: item.left || this.width,
          color: item.color || this.getColor(),
          speed: item.speed || 5
        }
        break;
      }
    }

    if (this.isRunning) {
      return
    }
    this.start();
  }


  clean() {
    console.log('this.isRunning:', this.isRunning);
    this.isClose = true;

    if (this.isRunning) {
      window.cancelAnimationFrame(this.requestAnimationFrameId);
      this.isRunning = false;
    }
    this.ctx.clearRect(0, 0, this.width, this.height)
    // @ts-ignore;
    this.barrageList = this.barrageList.map(() => null);
  }

  open() {
    this.isClose = false;
    this.start();
  }

}

export default BarrageCanvas;