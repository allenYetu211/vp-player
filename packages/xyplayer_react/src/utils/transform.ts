/*
 * @Author: Allen OYang
 * @Date: 2021-09-23 10:41:41
 * @Descripttion:
 * @LastEditTime: 2022-02-16 14:53:21
 * @FilePath: /plugin-core/packages/xyplayer_react/src/utils/transform.ts
 */

import { configInterface } from 'xyplayer/lib/interface/index';
import { initConfig } from '../interface';

export const transformInjectParam = (config: Partial<initConfig>): configInterface => {

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
  if (config.multiple) {
    const { initIndex, list } = config.multiple;
    newObj['playbackRate'] = {
      rate: list.map((item) => item.value),
      placeholder: 'X',
      defaultPlaybackRate: list[initIndex].value
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

  if (config.src) {
    newObj['url'] = config.src;
  }

  return newObj;

}