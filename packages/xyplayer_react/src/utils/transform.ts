/*
 * @Author: Allen OYang
 * @Date: 2021-09-23 10:41:41
 * @Descripttion:
 * @LastEditTime: 2021-09-23 11:45:13
 * @FilePath: /plugin-core/packages/xyplayer_react/src/utils/transform.ts
 */

import { configInterface } from 'xyplayer/lib/interface/index';
import { initConfig } from '../interface';

export const transformInjectParam = (config?: initConfig): configInterface => {

  console.log('config', config);

  const newObj: any = Object.assign({}, config);


  /**
   *  分辨率
   */
  if (config!.option) {
    newObj['multiResolution'] = {
      list: config!.option?.multiStreams,
      defaultInit: config!.option?.playIndex
    }

    newObj.url = config!.option?.multiStreams[config!.option?.playIndex].src
  }

  /**
   * 分辨率
   */
  if (config!.multiple) {
    newObj['playbackRate'] = {
      rate: config!.multiple.list.map((item) => item.value),
      placeholder: 'X',
      defaultPlaybackRate: config!.multiple.initIndex,
    }
  }

  /**
   * 进度条预览图
   */

  if (config!.thumbnail) {
    newObj['thumbnail'] = {
      pic_num: config!.thumbnail.count,
      width: config!.thumbnail.width || 160,
      height: config!.thumbnail.height || 90,
      col: config!.thumbnail.backgroundSize / (config!.thumbnail.width || 160),
      row: 0,
      url: [config!.thumbnail.picture]
    }
  }

  return newObj;

}