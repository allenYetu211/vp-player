/*
 * @Author: Allen OYang
 * @Date: 2021-07-09 16:44:33
 * @Descripttion: 
 * @LastEditTime: 2021-07-30 15:40:50
 * @FilePath: /plugin-core/packages/vpplayer/src/typings.d.ts
 */

declare module '*.scss' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.svg' {
  const classes: { readonly [key: string]: string }
  export default classes
}


interface Window {
  ctarget:any;
}

interface Document{
  webkitFullscreenElement: any;
  mozFullScreenElement: any;
  msFullscreenElement: any;
}

