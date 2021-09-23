/*
 * @Author: Allen OYang
 * @Date: 2021-09-22 19:08:08
 * @Descripttion: 
 * @LastEditTime: 2021-09-23 09:42:01
 * @FilePath: /plugin-core/packages/xyplayer_react/src/App.tsx
 */

import * as React from 'react';
import { hot } from "react-hot-loader/root";
import PlayerComponents from './components/player';

interface Props {
  name: string
}

class App extends React.Component<Props> {
  render() {
    const { name } = this.props;
    return (
      <>
        <h1>
          Hello {name}
          <PlayerComponents />
        </h1>
      </>
    );
  }
}

export default hot(App);
