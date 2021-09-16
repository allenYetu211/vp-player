/*
 * @Author: Allen OYang
 * @Date: 2021-07-02 17:44:10
 * @Descripttion: 
 * @LastEditTime: 2021-09-15 14:28:16
 * @FilePath: /plugin-core/packages/xyplayer/src/util/index.ts
 */




type createDom = {
  el?: string,
  tpl?: string,
  attrs?: any,
  cname?: string
}


export const createDOM = ({
  el = 'div',
  tpl = '',
  attrs = {},
  cname = ''
}: createDom) => {
  const dom = document.createElement(el);
  if (cname) {
    dom.className = cname;
  }
  dom.innerHTML = tpl
  Object.keys(attrs).forEach(item => {
    const key = item
    const value = attrs[item]
    dom.setAttribute(key, value)
  })
  return dom;
}

export const findDom = (el = document, sel) => {
  let dom;
  try {
    dom = el.querySelector(sel);
  } catch (e) {
    if (sel.indexOf('#') === 0) {
      dom = el.getElementById(sel.slice(1));
    }
  }
  return dom;
}


export const hasClass = (el: Element, className: string) => {
  if (!el) {
    return false;
  }

  if (el.classList) {
    return Array.prototype.some.call(el.classList, item => item === className)
  } else {
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
  }
}


export const addClass = (el: Element, className: string) => {
  if (!el) {
    return;
  }

  if (el.classList) {
    className.replace(/(^\s+|\s+$)/g, '').split(/\s+/g).forEach(item => {
      item && el.classList.add(item)
    })
  } else if (!hasClass(el, className)) {
    el.className += ' ' + className
  }
}


export const removeClass = (el: Element, className: string) => {
  if (!el) {
    return;
  }

  if (el.classList) {
    className.split(/\s+/g).forEach(item => {
      el.classList.remove(item)
    })
  } else if (hasClass(el, className)) {
    className.split(/\s+/g).forEach(item => {
      let reg = new RegExp('(\\s|^)' + item + '(\\s|$)')
      el.className = el.className.replace(reg, ' ')
    })
  }
}

export const toggleClass = (el: Element, className: string) => {
  if (!el) {
    return;
  }

  className.split(/\s+/g).forEach(item => {
    if (hasClass(el, item)) {
      removeClass(el, item)
    } else {
      addClass(el, item)
    }
  })
}


// export const format = (time: string | number) => {
//   let duration = 0;
//   if (typeof time === 'string') {
//     duration = Number(time);
//   } else {
//     duration = time;
//   }

//   let seconds = Math.floor((duration) % 60);
//   let minutes = Math.floor((duration / 60) % 60);
//   let hours = Math.floor((duration / 60 * 60) % 24);



//   const ihours = hours < 10 ? `0${hours}` : hours;
//   const iminutes = minutes < 10 ? `0${minutes}` : minutes;
//   const iseconds = seconds < 10 ? `0${seconds}` : seconds;

//   if (hours <= 0) {
//     return `${iminutes}:${iseconds}`
//   }
//   return `${ihours}:${iminutes}:${iseconds}`
// };



export const padStart = (str, length, pad) => {
  let charstr = String(pad)
  let len = length >> 0
  let maxlen = Math.ceil(len / charstr.length)
  let chars = []
  let r = String(str)
  while (maxlen--) {
    chars.push(charstr)
  }
  return chars.join('').substring(0, len - r.length) + r
}

export const format = (time) => {
  if (window.isNaN(time)) {
    return ''
  }
  let hour = padStart(Math.floor(time / 3600), 2, 0)
  let minute = padStart(Math.floor((time - Number(hour) * 3600) / 60), 2, 0)
  let second = padStart(Math.floor((time - Number(hour) * 3600 - Number(minute) * 60)), 2, 0)
  return (hour === '00' ? [minute, second] : [hour, minute, second]).join(':')
}