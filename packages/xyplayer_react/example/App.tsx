/*
 * @Author: Allen OYang
 * @Date: 2021-09-22 19:08:08
 * @Descripttion: 
 * @LastEditTime: 2022-01-04 19:29:00
 * @FilePath: /plugin-core/packages/xyplayer_react/example/App.tsx
 */

import * as React from 'react';
import { hot } from "react-hot-loader/root";
import PlayerComponents from '../src/index';

import { configHLS } from './player-config';

interface Props {
  name: string
}

class App extends React.Component<Props> {
  render() {
    return (
      <PlayerComponents {...configHLS} />
    );
  }
}

export default hot(App);
