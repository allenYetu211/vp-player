/*
 * @Author: Allen OYang
 * @Date: 2021-07-30 14:48:50
 * @Descripttion: 
 * @LastEditTime: 2021-07-30 15:37:17
 * @FilePath: /plugin-core/packages/vpplayer/src/controls/fullScreen/utils.ts
 */

export const requestFullscreen = (element: HTMLVideoElement | HTMLDivElement) => {
  ['requestFullscreen',
    'mozRequestFullScreen',
    'webkitRequestFullscreen',
    'msRequestFullscreen',
    'msRequestFullscreen'].some((item: string) => {
      if (element[item]) {
        element[item]().then(() => {
          console.log('requestFullscreen', item)
        });
        return true
      }
    })
};


export const exitFullscreen = () => {
  ['exitFullscreen',
    'mozExitFullScreen',
    'webkitExitFullscreen',
    'msRequestFullscreen',
    'msExitFullscreen'].some((item: string) => {
      if (document[item]) {
        document[item]().then(() => {
          console.log('exitFullscreen', item)
        });
        return true
      }
    })
};
