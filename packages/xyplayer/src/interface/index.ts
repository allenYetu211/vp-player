/*
 * @Author: Allen OYang
 * @Date: 2021-09-08 11:36:02
 * @Descripttion:
 * @LastEditTime: 2021-09-10 14:17:15
 * @FilePath: /plugin-core/packages/xyplayer/src/interface/index.ts
 */


export interface configInterface {
  el: Element;
  type: string;
  url: string;
  autoplay: boolean;
  playbackRate: {
    rate: number[];
    placeholder: string;
    defaultPlaybackRate: number;
  };
  multiResolution: {
    list: {
      text: string;
      src: string;
    }[];
    defaultInit: number;
  };
  thumbnail: {
    pic_num: number;
    width: number;
    height: number;
    col: number;
    row: number;
    url: string[];
  }
  isLive: boolean;
  isVod: boolean;
}