/*
 * @Author: Allen OYang
 * @Date: 2021-09-23 10:53:28
 * @Descripttion:
 * @LastEditTime: 2022-01-04 17:59:22
 * @FilePath: /plugin-core/packages/xyplayer_react/src/interface/index.ts
 */


export interface initConfig {
  type?: string
  src?: string;
  autoplay?: boolean;
  option?: IMultiStreamsContainer;
  isMobile?: boolean;
  hideControl?: boolean;
  hideMultiCode?: boolean;
  hideRefresh?: boolean;
  hideMultiple?: boolean;
  hideProgressBar?: boolean;
  onVideoPlayerState?: (vp: any) => void;
  multiple?: IMultiple;
  vod?: boolean;
  poster?: string;
  duration?: number;
  timestampUnit?: boolean | string;
  thumbnail?: {
    picture: string;
    width?: number;
    height?: number;
    count: number;
    rowCount?: number;
    backgroundSize: number;

  };
  contentPreview?: {
    picture: string;
    viewCount: number;
    timestap: number[];
  }
  antiScreenRecording?: Type
  videoBarrage?: {
    fontSize?: number;
    defaultBarrageState?: boolean;
    tracksLine?: number;
    trackSpacing?: number;
    textSpacing?: number;
    cacheData?: number;
  }
}

export interface Type {
  text: string;
  color: string;
  duration: number;
  interval: number;
  fontSize?: number;
  locationX?: string | number;
  locationY?: string | number;
}

export interface IMultiStreamsContainer {
  multiStreams: IMultiStreams[];
  playIndex: number;
}


export interface IMultiStreams {
  src: string;
  text: string
}


export interface IMultiple {
  list: {
    text: string,
    value: number,
  }[],
  initIndex: number
}
