/*
 * @Author: Allen OYang
 * @Date: 2021-09-08 11:36:02
 * @Descripttion:
 * @LastEditTime: 2021-09-08 11:36:02
 * @FilePath: /plugin-core/packages/vpplayer/src/interface/index.ts
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
}