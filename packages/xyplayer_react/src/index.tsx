/*
 * @Author: Allen OYang
 * @Date: 2021-09-23 09:39:25
 * @Descripttion:
 * @LastEditTime: 2022-02-22 16:15:53
 * @FilePath: /plugin-core/packages/xyplayer_react/src/index.tsx
 */
import * as React from 'react';
import XYPlayerHLS from '@xylink/xyplayer_hls';
import XYPlayerFlv from '@xylink/xyplayer_flv';

import { transformInjectParam } from './utils/transform';
import { isLive } from './utils/getConfigInfo';
import { initConfig } from './interface';

import { configInterface } from '@xylink/xyplayer/lib/interface/index';


const PlayerComponents = (config: initConfig): JSX.Element => {

  const player = React.useRef<XYPlayerHLS  | XYPlayerFlv>();

  React.useEffect(() => {
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


    
    player.current.mountFunction = {
      barrage: {
        push: (value) => {
          player.current.emit('barrage_push', value)
        },
        start:() => {
          player.current.emit('barrage_start')
        },
        clean:() => {
          player.current.emit('barrage_clean')
        },
        open:() => {
          player.current.emit('barrage_open')
        },
        resetView:() => {
          player.current.emit('barrage_reset_view')
        },
        onChangePlayIndex: () => {
        }
      }
    }

    if (config.onVideoPlayerState)  {
      config.onVideoPlayerState(player.current)
    }
  }, []);

  const videoContentEl = React.useRef(null);

  return (
    <>
      <div ref={videoContentEl} />
    </>
  )
}

export default PlayerComponents;

