/*
 * @Author: Allen OYang
 * @Date: 2022-02-16 11:15:26
 * @LastEditTime: 2022-02-16 11:15:26
 */


export const isLive = (type: string, vod?: boolean): boolean => {
  if (type === 'hls' && vod) {
    return false;
  }

  if (type === 'flv' || type === 'hls') {
    return true;
  }

  return false
}

export const currentCodingType = (codingType) => {
  
}
