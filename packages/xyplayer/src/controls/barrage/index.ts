/*
 * @Author: Allen OYang
 * @Date: 2022-02-18 15:45:29
 * @LastEditTime: 2022-02-18 16:33:54
 */



import Player from '@/core';
import { addClass, removeClass, hasClass } from '@/util';
import style from '@/skin/controls/barrage/index.scss';

const barrage = function (this: Player) {

  const onBarrageBtnClick = () => {
    console.log('onBarrageBtnClick')
    if (hasClass(this.root, style.containerBarrageOpen)) {
      removeClass(this.root, style.containerBarrageOpen)
      addClass(this.root, style.containerBarrageOff)
    } else {
      removeClass(this.root, style.containerBarrageOff)
      addClass(this.root, style.containerBarrageOpen)
    }
  }

  this.on('barrageBtnClick', onBarrageBtnClick)
}


Player.install('barrage', barrage);