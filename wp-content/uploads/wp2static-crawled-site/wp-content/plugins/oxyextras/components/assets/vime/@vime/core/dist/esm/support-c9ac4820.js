import { l as listen, g as isFunction } from './dom-888fcf0c.js';

const IS_CLIENT = typeof window !== 'undefined';
const UA = (IS_CLIENT ? window.navigator.userAgent.toLowerCase() : '');
const IS_IOS = /iphone|ipad|ipod|ios|CriOS|FxiOS/.test(UA);
const IS_ANDROID = /android/.test(UA);
const IS_MOBILE = (IS_IOS || IS_ANDROID);
const IS_IPHONE = (IS_CLIENT && /(iPhone|iPod)/gi.test(window.navigator.platform));
const IS_FIREFOX = (/firefox/.test(UA));
const IS_SAFARI = (IS_CLIENT && (window.safari || IS_IOS || /Apple/.test(UA)));
const onTouchInputChange = (callback) => {
  if (!IS_CLIENT)
    return () => { };
  let lastTouchTime = 0;
  const offTouchListener = listen(document, 'touchstart', () => {
    lastTouchTime = new Date().getTime();
    callback(true);
  }, true);
  const offMouseListener = listen(document, 'mousemove', () => {
    // Filter emulated events coming from touch events
    if ((new Date().getTime()) - lastTouchTime < 500)
      return;
    callback(false);
  }, true);
  return () => {
    offTouchListener();
    offMouseListener();
  };
};
/**
 * Checks if a video player can enter fullscreen.
 *
 * @see https://developer.apple.com/documentation/webkitjs/htmlvideoelement/1633500-webkitenterfullscreen
 */
const canFullscreenVideo = () => {
  if (!IS_CLIENT)
    return false;
  const video = document.createElement('video');
  // @ts-ignore
  return isFunction(video.webkitEnterFullscreen);
};
/**
 * Checks if the screen orientation can be changed.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Screen/orientation
 */
const canRotateScreen = () => IS_CLIENT
  && window.screen.orientation
  && window.screen.orientation.lock;
/**
 * Checks if the native HTML5 video player can play HLS.
 */
const canPlayHLSNatively = () => {
  if (!IS_CLIENT)
    return false;
  const video = document.createElement('video');
  return video.canPlayType('application/vnd.apple.mpegurl').length > 0;
};
/**
 * Checks if the native HTML5 video player can enter picture-in-picture (PIP) mode when using
 * the Chrome browser.
 *
 * @see  https://developers.google.com/web/updates/2018/10/watch-video-using-picture-in-picture
 */
const canUsePiPInChrome = () => {
  if (!IS_CLIENT)
    return false;
  const video = document.createElement('video');
  // @ts-ignore
  return !!document.pictureInPictureEnabled && !video.disablePictureInPicture;
};
/**
 * Checks if the native HTML5 video player can enter picture-in-picture (PIP) mode when using
 * the desktop Safari browser, iOS Safari appears to "support" PiP through the check, however PiP
 * does not function.
 *
 * @see https://developer.apple.com/documentation/webkitjs/adding_picture_in_picture_to_your_safari_media_controls
 */
const canUsePiPInSafari = () => {
  if (!IS_CLIENT)
    return false;
  const video = document.createElement('video');
  // @ts-ignore
  return isFunction(video.webkitSupportsPresentationMode)
    // @ts-ignore
    && isFunction(video.webkitSetPresentationMode)
    && !IS_IPHONE;
};
// Checks if the native HTML5 video player can enter PIP.
const canUsePiP = () => canUsePiPInChrome() || canUsePiPInSafari();
/**
 * To detect autoplay, we create a video element and call play on it, if it is `paused` after
 * a `play()` call, autoplay is supported. Although this unintuitive, it works across browsers
 * and is currently the lightest way to detect autoplay without using a data source.
 *
 * @see https://github.com/ampproject/amphtml/blob/9bc8756536956780e249d895f3e1001acdee0bc0/src/utils/video.js#L25
 */
const canAutoplay = (muted = true, playsinline = true) => {
  if (!IS_CLIENT)
    return Promise.resolve(false);
  const video = document.createElement('video');
  if (muted) {
    video.setAttribute('muted', '');
    video.muted = true;
  }
  if (playsinline) {
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
  }
  video.setAttribute('height', '0');
  video.setAttribute('width', '0');
  video.style.position = 'fixed';
  video.style.top = '0';
  video.style.width = '0';
  video.style.height = '0';
  video.style.opacity = '0';
  // Promise wrapped this way to catch both sync throws and async rejections.
  // More info: https://github.com/tc39/proposal-promise-try
  new Promise((resolve) => resolve(video.play())).catch(() => { });
  return Promise.resolve(!video.paused);
};

export { IS_CLIENT as I, IS_MOBILE as a, canAutoplay as b, canPlayHLSNatively as c, canRotateScreen as d, IS_IOS as e, canUsePiPInChrome as f, canUsePiPInSafari as g, canUsePiP as h, canFullscreenVideo as i, onTouchInputChange as o };
