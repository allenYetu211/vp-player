/*
 * @Author: Allen OYang
 * @Date: 2021-09-23 09:39:25
 * @Descripttion:
 * @LastEditTime: 2022-02-16 17:46:50
 * @FilePath: /plugin-core/packages/xyplayer_react/src/index.tsx
 */
import * as React from 'react';
import XYPlayerHLS from 'xyplayer_hls';
import XYPlayerFlv from 'xyplayerflv';

import { transformInjectParam } from './utils/transform';
import { isLive } from './utils/getConfigInfo';
import { initConfig } from './interface';

import { configInterface } from 'xyplayer/lib/interface/index';

const PlayerComponents = (config: initConfig): JSX.Element => {

  const player = React.useRef<XYPlayerHLS>();

  React.useEffect(() => {
    console.log('config init::')
    const newConfig: configInterface = Object.assign({}, transformInjectParam(config),
      {
        el: videoContentEl.current,
        isLive: isLive(config.type, config.vod), // 判断是否为直播
      }
    );

    const types = {
      'flv': XYPlayerFlv,
      'm3u8': XYPlayerHLS,
      'hls': XYPlayerHLS,
    }

    player.current = new types[config.type](newConfig);
  }, []);

  const videoContentEl = React.useRef(null);

  return (
    <>
      <div ref={videoContentEl} />
    </>
  )
}

export default PlayerComponents;

