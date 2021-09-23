/*
 * @Author: Allen OYang
 * @Date: 2021-09-23 09:39:25
 * @Descripttion:
 * @LastEditTime: 2021-09-23 17:44:08
 * @FilePath: /plugin-core/packages/xyplayer_react/src/components/player.tsx
 */
import * as React from 'react';
import XYPlayer from 'xyplayer';
import XYPlayerHLS from 'xyplayerhls';
import { config, hls_config } from '../config/player-config';
import { transformInjectParam } from '../utils/transform';

const PlayerComponents = () => {

  /**
   *  mp4 播放入参
   */
  // React.useEffect(() => {
  //   const newConfig = Object.assign(config, { el: videoContentEl.current });
  //   const info = new XYPlayer(newConfig);
  //   console.log(info);
  // }, []);

  React.useEffect(() => {
    // @ts-ignore
    const newConfig = Object.assign(transformInjectParam(hls_config),
      {
        el: videoContentEl.current,
        isLive: true,
      }
    );

    console.log('newConfig', newConfig);
    const info = new XYPlayerHLS(newConfig);
    console.log('info', info);
  }, [])

  const videoContentEl = React.useRef(null);

  return (
    <div>
      <div ref={videoContentEl} />
      PlayerComponents
    </div>
  )
}

export default PlayerComponents;

