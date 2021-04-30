(function() {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 6255:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
var __webpack_unused_export__;


var _interopRequireDefault = __webpack_require__(2426);

__webpack_unused_export__ = true;
exports.default = Image;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(__webpack_require__(6169));

var _extends2 = _interopRequireDefault(__webpack_require__(9566));

var _react = _interopRequireDefault(__webpack_require__(9297));

var _head = _interopRequireDefault(__webpack_require__(5273));

var _toBase = __webpack_require__(5519);

var _imageConfig = __webpack_require__(444);

var _useIntersection = __webpack_require__(5749);

if (true) {
  ;
  global.__NEXT_IMAGE_IMPORTED = true;
}

const VALID_LOADING_VALUES = ['lazy', 'eager', undefined];
const loaders = new Map([['imgix', imgixLoader], ['cloudinary', cloudinaryLoader], ['akamai', akamaiLoader], ['default', defaultLoader]]);
const VALID_LAYOUT_VALUES = ['fill', 'fixed', 'intrinsic', 'responsive', undefined];
const {
  deviceSizes: configDeviceSizes,
  imageSizes: configImageSizes,
  loader: configLoader,
  path: configPath,
  domains: configDomains
} = {"deviceSizes":[640,750,828,1080,1200,1920,2048,3840],"imageSizes":[16,32,48,64,96,128,256,384],"path":"/_next/image","loader":"default"} || _imageConfig.imageConfigDefault; // sort smallest to largest

const allSizes = [...configDeviceSizes, ...configImageSizes];
configDeviceSizes.sort((a, b) => a - b);
allSizes.sort((a, b) => a - b);

function getWidths(width, layout, sizes) {
  if (sizes && (layout === 'fill' || layout === 'responsive')) {
    // Find all the "vw" percent sizes used in the sizes prop
    const percentSizes = [...sizes.matchAll(/(^|\s)(1?\d?\d)vw/g)].map(m => parseInt(m[2]));

    if (percentSizes.length) {
      const smallestRatio = Math.min(...percentSizes) * 0.01;
      return {
        widths: allSizes.filter(s => s >= configDeviceSizes[0] * smallestRatio),
        kind: 'w'
      };
    }

    return {
      widths: allSizes,
      kind: 'w'
    };
  }

  if (typeof width !== 'number' || layout === 'fill' || layout === 'responsive') {
    return {
      widths: configDeviceSizes,
      kind: 'w'
    };
  }

  const widths = [...new Set( // > This means that most OLED screens that say they are 3x resolution,
  // > are actually 3x in the green color, but only 1.5x in the red and
  // > blue colors. Showing a 3x resolution image in the app vs a 2x
  // > resolution image will be visually the same, though the 3x image
  // > takes significantly more data. Even true 3x resolution screens are
  // > wasteful as the human eye cannot see that level of detail without
  // > something like a magnifying glass.
  // https://blog.twitter.com/engineering/en_us/topics/infrastructure/2019/capping-image-fidelity-on-ultra-high-resolution-devices.html
  [width, width * 2
  /*, width * 3*/
  ].map(w => allSizes.find(p => p >= w) || allSizes[allSizes.length - 1]))];
  return {
    widths,
    kind: 'x'
  };
}

function generateImgAttrs({
  src,
  unoptimized,
  layout,
  width,
  quality,
  sizes,
  loader
}) {
  if (unoptimized) {
    return {
      src,
      srcSet: undefined,
      sizes: undefined
    };
  }

  const {
    widths,
    kind
  } = getWidths(width, layout, sizes);
  const last = widths.length - 1;
  return {
    sizes: !sizes && kind === 'w' ? '100vw' : sizes,
    srcSet: widths.map((w, i) => `${loader({
      src,
      quality,
      width: w
    })} ${kind === 'w' ? w : i + 1}${kind}`).join(', '),
    // It's intended to keep `src` the last attribute because React updates
    // attributes in order. If we keep `src` the first one, Safari will
    // immediately start to fetch `src`, before `sizes` and `srcSet` are even
    // updated by React. That causes multiple unnecessary requests if `srcSet`
    // and `sizes` are defined.
    // This bug cannot be reproduced in Chrome or Firefox.
    src: loader({
      src,
      quality,
      width: widths[last]
    })
  };
}

function getInt(x) {
  if (typeof x === 'number') {
    return x;
  }

  if (typeof x === 'string') {
    return parseInt(x, 10);
  }

  return undefined;
}

function defaultImageLoader(loaderProps) {
  const load = loaders.get(configLoader);

  if (load) {
    return load((0, _extends2.default)({
      root: configPath
    }, loaderProps));
  }

  throw new Error(`Unknown "loader" found in "next.config.js". Expected: ${_imageConfig.VALID_LOADERS.join(', ')}. Received: ${configLoader}`);
}

function Image(_ref) {
  let {
    src,
    sizes,
    unoptimized = false,
    priority = false,
    loading,
    className,
    quality,
    width,
    height,
    objectFit,
    objectPosition,
    loader = defaultImageLoader
  } = _ref,
      all = (0, _objectWithoutPropertiesLoose2.default)(_ref, ["src", "sizes", "unoptimized", "priority", "loading", "className", "quality", "width", "height", "objectFit", "objectPosition", "loader"]);
  let rest = all;
  let layout = sizes ? 'responsive' : 'intrinsic';
  let unsized = false;

  if ('unsized' in rest) {
    unsized = Boolean(rest.unsized); // Remove property so it's not spread into image:

    delete rest['unsized'];
  } else if ('layout' in rest) {
    // Override default layout if the user specified one:
    if (rest.layout) layout = rest.layout; // Remove property so it's not spread into image:

    delete rest['layout'];
  }

  if (false) {}

  let isLazy = !priority && (loading === 'lazy' || typeof loading === 'undefined');

  if (src && src.startsWith('data:')) {
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
    unoptimized = true;
    isLazy = false;
  }

  const [setRef, isIntersected] = (0, _useIntersection.useIntersection)({
    rootMargin: '200px',
    disabled: !isLazy
  });
  const isVisible = !isLazy || isIntersected;
  const widthInt = getInt(width);
  const heightInt = getInt(height);
  const qualityInt = getInt(quality);
  let wrapperStyle;
  let sizerStyle;
  let sizerSvg;
  let imgStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    boxSizing: 'border-box',
    padding: 0,
    border: 'none',
    margin: 'auto',
    display: 'block',
    width: 0,
    height: 0,
    minWidth: '100%',
    maxWidth: '100%',
    minHeight: '100%',
    maxHeight: '100%',
    objectFit,
    objectPosition
  };

  if (typeof widthInt !== 'undefined' && typeof heightInt !== 'undefined' && layout !== 'fill') {
    // <Image src="i.png" width="100" height="100" />
    const quotient = heightInt / widthInt;
    const paddingTop = isNaN(quotient) ? '100%' : `${quotient * 100}%`;

    if (layout === 'responsive') {
      // <Image src="i.png" width="100" height="100" layout="responsive" />
      wrapperStyle = {
        display: 'block',
        overflow: 'hidden',
        position: 'relative',
        boxSizing: 'border-box',
        margin: 0
      };
      sizerStyle = {
        display: 'block',
        boxSizing: 'border-box',
        paddingTop
      };
    } else if (layout === 'intrinsic') {
      // <Image src="i.png" width="100" height="100" layout="intrinsic" />
      wrapperStyle = {
        display: 'inline-block',
        maxWidth: '100%',
        overflow: 'hidden',
        position: 'relative',
        boxSizing: 'border-box',
        margin: 0
      };
      sizerStyle = {
        boxSizing: 'border-box',
        display: 'block',
        maxWidth: '100%'
      };
      sizerSvg = `<svg width="${widthInt}" height="${heightInt}" xmlns="http://www.w3.org/2000/svg" version="1.1"/>`;
    } else if (layout === 'fixed') {
      // <Image src="i.png" width="100" height="100" layout="fixed" />
      wrapperStyle = {
        overflow: 'hidden',
        boxSizing: 'border-box',
        display: 'inline-block',
        position: 'relative',
        width: widthInt,
        height: heightInt
      };
    }
  } else if (typeof widthInt === 'undefined' && typeof heightInt === 'undefined' && layout === 'fill') {
    // <Image src="i.png" layout="fill" />
    wrapperStyle = {
      display: 'block',
      overflow: 'hidden',
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      boxSizing: 'border-box',
      margin: 0
    };
  } else {
    // <Image src="i.png" />
    if (false) {}
  }

  let imgAttributes = {
    src: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    srcSet: undefined,
    sizes: undefined
  };

  if (isVisible) {
    imgAttributes = generateImgAttrs({
      src,
      unoptimized,
      layout,
      width: widthInt,
      quality: qualityInt,
      sizes,
      loader
    });
  }

  if (unsized) {
    wrapperStyle = undefined;
    sizerStyle = undefined;
    imgStyle = undefined;
  }

  return /*#__PURE__*/_react.default.createElement("div", {
    style: wrapperStyle
  }, sizerStyle ? /*#__PURE__*/_react.default.createElement("div", {
    style: sizerStyle
  }, sizerSvg ? /*#__PURE__*/_react.default.createElement("img", {
    style: {
      maxWidth: '100%',
      display: 'block',
      margin: 0,
      border: 'none',
      padding: 0
    },
    alt: "",
    "aria-hidden": true,
    role: "presentation",
    src: `data:image/svg+xml;base64,${(0, _toBase.toBase64)(sizerSvg)}`
  }) : null) : null, !isVisible && /*#__PURE__*/_react.default.createElement("noscript", null, /*#__PURE__*/_react.default.createElement("img", Object.assign({}, rest, generateImgAttrs({
    src,
    unoptimized,
    layout,
    width: widthInt,
    quality: qualityInt,
    sizes,
    loader
  }), {
    src: src,
    decoding: "async",
    sizes: sizes,
    style: imgStyle,
    className: className
  }))), /*#__PURE__*/_react.default.createElement("img", Object.assign({}, rest, imgAttributes, {
    decoding: "async",
    className: className,
    ref: setRef,
    style: imgStyle
  })), priority ?
  /*#__PURE__*/
  // Note how we omit the `href` attribute, as it would only be relevant
  // for browsers that do not support `imagesrcset`, and in those cases
  // it would likely cause the incorrect image to be preloaded.
  //
  // https://html.spec.whatwg.org/multipage/semantics.html#attr-link-imagesrcset
  _react.default.createElement(_head.default, null, /*#__PURE__*/_react.default.createElement("link", {
    key: '__nimg-' + imgAttributes.src + imgAttributes.srcSet + imgAttributes.sizes,
    rel: "preload",
    as: "image",
    href: imgAttributes.srcSet ? undefined : imgAttributes.src // @ts-ignore: imagesrcset is not yet in the link element type
    ,
    imagesrcset: imgAttributes.srcSet // @ts-ignore: imagesizes is not yet in the link element type
    ,
    imagesizes: imgAttributes.sizes
  })) : null);
} //BUILT IN LOADERS


function normalizeSrc(src) {
  return src[0] === '/' ? src.slice(1) : src;
}

function imgixLoader({
  root,
  src,
  width,
  quality
}) {
  // Demo: https://static.imgix.net/daisy.png?format=auto&fit=max&w=300
  const params = ['auto=format', 'fit=max', 'w=' + width];
  let paramsString = '';

  if (quality) {
    params.push('q=' + quality);
  }

  if (params.length) {
    paramsString = '?' + params.join('&');
  }

  return `${root}${normalizeSrc(src)}${paramsString}`;
}

function akamaiLoader({
  root,
  src,
  width
}) {
  return `${root}${normalizeSrc(src)}?imwidth=${width}`;
}

function cloudinaryLoader({
  root,
  src,
  width,
  quality
}) {
  // Demo: https://res.cloudinary.com/demo/image/upload/w_300,c_limit,q_auto/turtles.jpg
  const params = ['f_auto', 'c_limit', 'w_' + width, 'q_' + (quality || 'auto')];
  let paramsString = params.join(',') + '/';
  return `${root}${paramsString}${normalizeSrc(src)}`;
}

function defaultLoader({
  root,
  src,
  width,
  quality
}) {
  if (false) {}

  return `${root}?url=${encodeURIComponent(src)}&w=${width}&q=${quality || 75}`;
}

/***/ }),

/***/ 8391:
/***/ (function(__unused_webpack_module, exports) {

"use strict";


exports.__esModule = true;
exports.cancelIdleCallback = exports.requestIdleCallback = void 0;

const requestIdleCallback = typeof self !== 'undefined' && self.requestIdleCallback || function (cb) {
  let start = Date.now();
  return setTimeout(function () {
    cb({
      didTimeout: false,
      timeRemaining: function () {
        return Math.max(0, 50 - (Date.now() - start));
      }
    });
  }, 1);
};

exports.requestIdleCallback = requestIdleCallback;

const cancelIdleCallback = typeof self !== 'undefined' && self.cancelIdleCallback || function (id) {
  return clearTimeout(id);
};

exports.cancelIdleCallback = cancelIdleCallback;

/***/ }),

/***/ 5749:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.useIntersection = useIntersection;

var _react = __webpack_require__(9297);

var _requestIdleCallback = __webpack_require__(8391);

const hasIntersectionObserver = typeof IntersectionObserver !== 'undefined';

function useIntersection({
  rootMargin,
  disabled
}) {
  const isDisabled = disabled || !hasIntersectionObserver;
  const unobserve = (0, _react.useRef)();
  const [visible, setVisible] = (0, _react.useState)(false);
  const setRef = (0, _react.useCallback)(el => {
    if (unobserve.current) {
      unobserve.current();
      unobserve.current = undefined;
    }

    if (isDisabled || visible) return;

    if (el && el.tagName) {
      unobserve.current = observe(el, isVisible => isVisible && setVisible(isVisible), {
        rootMargin
      });
    }
  }, [isDisabled, rootMargin, visible]);
  (0, _react.useEffect)(() => {
    if (!hasIntersectionObserver) {
      if (!visible) {
        const idleCallback = (0, _requestIdleCallback.requestIdleCallback)(() => setVisible(true));
        return () => (0, _requestIdleCallback.cancelIdleCallback)(idleCallback);
      }
    }
  }, [visible]);
  return [setRef, visible];
}

function observe(element, callback, options) {
  const {
    id,
    observer,
    elements
  } = createObserver(options);
  elements.set(element, callback);
  observer.observe(element);
  return function unobserve() {
    elements.delete(element);
    observer.unobserve(element); // Destroy observer when there's nothing left to watch:

    if (elements.size === 0) {
      observer.disconnect();
      observers.delete(id);
    }
  };
}

const observers = new Map();

function createObserver(options) {
  const id = options.rootMargin || '';
  let instance = observers.get(id);

  if (instance) {
    return instance;
  }

  const elements = new Map();
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const callback = elements.get(entry.target);
      const isVisible = entry.isIntersecting || entry.intersectionRatio > 0;

      if (callback && isVisible) {
        callback(isVisible);
      }
    });
  }, options);
  observers.set(id, instance = {
    id,
    observer,
    elements
  });
  return instance;
}

/***/ }),

/***/ 1983:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "QM": function() { return /* binding */ PlayerContextProvider; },
/* harmony export */   "nn": function() { return /* binding */ usePlayer; }
/* harmony export */ });
/* unused harmony export PlayerContext */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9297);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


const PlayerContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({});
function PlayerContextProvider({
  children
}) {
  const {
    0: episodeList,
    1: setEpisodeList
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
  const {
    0: currentEpisodeIndex,
    1: setCurrentEpisodeIndex
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
  const {
    0: isPlaying,
    1: setIsPlaying
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const {
    0: isLooping,
    1: setIsLooping
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const {
    0: isShuffling,
    1: setIsShuffling
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);

  function play(episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function playList(list, index) {
    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  }

  const hasPrevious = currentEpisodeIndex > 0;
  const hasNext = isShuffling || currentEpisodeIndex + 1 < episodeList.length;

  function playNext() {
    if (isShuffling) {
      const nextRendomEpisodeIndex = Math.floor(Math.random() * episodeList.length);
      setCurrentEpisodeIndex(nextRendomEpisodeIndex);
    } else if (hasNext) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1);
    }
  }

  function playPrevious() {
    if (hasPrevious) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1);
    }
  }

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  function toggleLoop() {
    setIsLooping(!isLooping);
  }

  function toggleShuffle() {
    setIsShuffling(!isShuffling);
  }

  function setPlayingState(state) {
    setIsPlaying(state);
  }

  function clearPlayerState() {
    setEpisodeList([]);
    setCurrentEpisodeIndex(0);
  }

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(PlayerContext.Provider, {
    value: {
      episodeList,
      currentEpisodeIndex,
      play,
      playList,
      playNext,
      hasNext,
      playPrevious,
      hasPrevious,
      isPlaying,
      isLooping,
      isShuffling,
      toggleLoop,
      togglePlay,
      toggleShuffle,
      setPlayingState,
      clearPlayerState
    },
    children: children
  });
}
const usePlayer = () => {
  return (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(PlayerContext);
};

/***/ }),

/***/ 1240:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ _app; }
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(5282);
;// CONCATENATED MODULE: external "date-fns/format"
var format_namespaceObject = require("date-fns/format");;
var format_default = /*#__PURE__*/__webpack_require__.n(format_namespaceObject);
// EXTERNAL MODULE: external "date-fns/locale/pt-BR"
var pt_BR_ = __webpack_require__(5639);
var pt_BR_default = /*#__PURE__*/__webpack_require__.n(pt_BR_);
// EXTERNAL MODULE: ./src/components/Header/styles.module.scss
var styles_module = __webpack_require__(3372);
var styles_module_default = /*#__PURE__*/__webpack_require__.n(styles_module);
;// CONCATENATED MODULE: ./src/components/Header/index.tsx





function Header() {
  const currentDate = format_default()(new Date(), 'EEEEEE, d MMMM', {
    locale: (pt_BR_default())
  });
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("header", {
    className: (styles_module_default()).headerContainer,
    children: [/*#__PURE__*/(0,jsx_runtime_.jsx)("img", {
      src: "/logo.svg",
      alt: "Podcastr"
    }), /*#__PURE__*/(0,jsx_runtime_.jsx)("p", {
      children: "O melhor para voc\xEA ouvir, sempre"
    }), /*#__PURE__*/(0,jsx_runtime_.jsx)("span", {
      children: currentDate
    })]
  });
}
// EXTERNAL MODULE: ./src/styles/app.module.scss
var app_module = __webpack_require__(4811);
var app_module_default = /*#__PURE__*/__webpack_require__.n(app_module);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(5675);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(9297);
// EXTERNAL MODULE: ./src/contexts/PlayerContext.tsx
var PlayerContext = __webpack_require__(1983);
;// CONCATENATED MODULE: external "rc-slider"
var external_rc_slider_namespaceObject = require("rc-slider");;
var external_rc_slider_default = /*#__PURE__*/__webpack_require__.n(external_rc_slider_namespaceObject);
// EXTERNAL MODULE: ./src/components/Player/styles.module.scss
var Player_styles_module = __webpack_require__(5638);
var Player_styles_module_default = /*#__PURE__*/__webpack_require__.n(Player_styles_module);
// EXTERNAL MODULE: ./src/utils/convertDurationToTimeString.ts
var convertDurationToTimeString = __webpack_require__(4005);
;// CONCATENATED MODULE: ./src/components/Player/index.tsx









function Player() {
  var _episode$duration;

  const audioRef = (0,external_react_.useRef)(null);
  const {
    0: progress,
    1: setProgress
  } = (0,external_react_.useState)(0);
  const {
    episodeList,
    currentEpisodeIndex,
    isPlaying,
    isLooping,
    isShuffling,
    togglePlay,
    toggleLoop,
    toggleShuffle,
    setPlayingState,
    playNext,
    playPrevious,
    hasNext,
    hasPrevious,
    clearPlayerState
  } = (0,PlayerContext/* usePlayer */.nn)();
  (0,external_react_.useEffect)(() => {
    if (!audioRef.current) {
      return;
    }

    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  function setupProgressListener() {
    audioRef.current.currentTime = 0;
    audioRef.current.addEventListener('timeupdate', () => {
      setProgress(Math.floor(audioRef.current.currentTime));
    });
  }

  function handleSeek(amount) {
    audioRef.current.currentTime = amount;
    setProgress(amount);
  }

  function handleEpisodeEnded() {
    if (hasNext) {
      playNext();
    } else {
      clearPlayerState();
    }
  }

  const episode = episodeList[currentEpisodeIndex];
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    className: (Player_styles_module_default()).playerContainer,
    children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("header", {
      children: [/*#__PURE__*/(0,jsx_runtime_.jsx)("img", {
        src: "/playing.svg",
        alt: "Tocando Agora"
      }), /*#__PURE__*/(0,jsx_runtime_.jsx)("strong", {
        children: "Tocando agora"
      })]
    }), episode ? /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      className: (Player_styles_module_default()).currentEpisode,
      children: [/*#__PURE__*/(0,jsx_runtime_.jsx)(next_image.default, {
        width: 592,
        height: 592,
        src: episode.thumbnail,
        objectFit: "cover"
      }), /*#__PURE__*/(0,jsx_runtime_.jsx)("strong", {
        children: episode.title
      }), /*#__PURE__*/(0,jsx_runtime_.jsx)("span", {
        children: episode.members
      })]
    }) : /*#__PURE__*/(0,jsx_runtime_.jsx)("div", {
      className: (Player_styles_module_default()).emptyPlayer,
      children: /*#__PURE__*/(0,jsx_runtime_.jsx)("strong", {
        children: "Selecione um podcast para ouvir"
      })
    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("footer", {
      className: !episode ? (Player_styles_module_default()).empty : '',
      children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
        className: (Player_styles_module_default()).progress,
        children: [/*#__PURE__*/(0,jsx_runtime_.jsx)("span", {
          children: (0,convertDurationToTimeString/* convertDurationToTimeString */.D)(progress)
        }), /*#__PURE__*/(0,jsx_runtime_.jsx)("div", {
          className: (Player_styles_module_default()).slider,
          children: episode ? /*#__PURE__*/(0,jsx_runtime_.jsx)((external_rc_slider_default()), {
            max: episode.duration,
            value: progress,
            onChange: handleSeek,
            trackStyle: {
              backgroundColor: '#04d361'
            },
            railStyle: {
              backgroundColor: '#9f57ff'
            },
            handleStyle: {
              borderColor: '#04d361',
              borderWidth: 4
            }
          }) : /*#__PURE__*/(0,jsx_runtime_.jsx)("div", {
            className: (Player_styles_module_default()).emptySlider
          })
        }), /*#__PURE__*/(0,jsx_runtime_.jsx)("span", {
          children: (0,convertDurationToTimeString/* convertDurationToTimeString */.D)((_episode$duration = episode === null || episode === void 0 ? void 0 : episode.duration) !== null && _episode$duration !== void 0 ? _episode$duration : 0)
        })]
      }), episode && /*#__PURE__*/(0,jsx_runtime_.jsx)("audio", {
        src: episode.url,
        ref: audioRef,
        loop: isLooping,
        autoPlay: true,
        onLoadedMetadata: setupProgressListener,
        onPlay: () => setPlayingState(true),
        onPause: () => setPlayingState(false),
        onEnded: handleEpisodeEnded
      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
        className: (Player_styles_module_default()).buttons,
        children: [/*#__PURE__*/(0,jsx_runtime_.jsx)("button", {
          type: "button",
          disabled: !episode || episodeList.length === 1,
          onClick: toggleShuffle,
          className: isShuffling ? (Player_styles_module_default()).isActive : '',
          children: /*#__PURE__*/(0,jsx_runtime_.jsx)("img", {
            src: "/shuffle.svg",
            alt: "Embaralhar"
          })
        }), /*#__PURE__*/(0,jsx_runtime_.jsx)("button", {
          type: "button",
          disabled: !episode || !hasPrevious,
          onClick: playPrevious,
          children: /*#__PURE__*/(0,jsx_runtime_.jsx)("img", {
            src: "/play-previous.svg",
            alt: "Tocar anterior"
          })
        }), /*#__PURE__*/(0,jsx_runtime_.jsx)("button", {
          type: "button",
          disabled: !episode,
          className: (Player_styles_module_default()).playButton,
          onClick: togglePlay,
          children: isPlaying ? /*#__PURE__*/(0,jsx_runtime_.jsx)("img", {
            src: "/pause.svg",
            alt: "Pausar"
          }) : /*#__PURE__*/(0,jsx_runtime_.jsx)("img", {
            src: "/play.svg",
            alt: "Tocar"
          })
        }), /*#__PURE__*/(0,jsx_runtime_.jsx)("button", {
          type: "button",
          disabled: !episode || !hasNext,
          onClick: playNext,
          children: /*#__PURE__*/(0,jsx_runtime_.jsx)("img", {
            src: "/play-next.svg",
            alt: "Tocar pr\xF3xima"
          })
        }), /*#__PURE__*/(0,jsx_runtime_.jsx)("button", {
          type: "button",
          disabled: !episode,
          onClick: toggleLoop,
          className: isLooping ? (Player_styles_module_default()).isActive : '',
          children: /*#__PURE__*/(0,jsx_runtime_.jsx)("img", {
            src: "/repeat.svg",
            alt: "Repetir"
          })
        })]
      })]
    })]
  });
}
;// CONCATENATED MODULE: ./src/pages/_app.tsx



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







function MyApp({
  Component,
  pageProps
}) {
  return /*#__PURE__*/(0,jsx_runtime_.jsx)(PlayerContext/* PlayerContextProvider */.QM, {
    children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      className: (app_module_default()).wrapper,
      children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("main", {
        children: [/*#__PURE__*/(0,jsx_runtime_.jsx)(Header, {}), /*#__PURE__*/(0,jsx_runtime_.jsx)(Component, _objectSpread({}, pageProps))]
      }), /*#__PURE__*/(0,jsx_runtime_.jsx)(Player, {})]
    })
  });
}

/* harmony default export */ var _app = (MyApp);

/***/ }),

/***/ 4005:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "D": function() { return /* binding */ convertDurationToTimeString; }
/* harmony export */ });
function convertDurationToTimeString(duration) {
  const hours = Math.floor(duration / (60 * 60));
  const minutes = Math.floor(duration % 3600 / 60);
  const seconds = duration % 60;
  const timeString = [hours, minutes, seconds].map(unit => String(unit).padStart(2, '0')).join(':');
  return timeString;
}

/***/ }),

/***/ 3372:
/***/ (function(module) {

// Exports
module.exports = {
	"headerContainer": "styles_headerContainer__3jyUX"
};


/***/ }),

/***/ 5638:
/***/ (function(module) {

// Exports
module.exports = {
	"playerContainer": "styles_playerContainer__2kTpC",
	"empty": "styles_empty__XvMyC",
	"progress": "styles_progress__ULW9V",
	"currentEpisode": "styles_currentEpisode__3Qmiu",
	"emptyPlayer": "styles_emptyPlayer__WHPi6",
	"slider": "styles_slider__3_Mkb",
	"emptySlider": "styles_emptySlider__3p9Ad",
	"buttons": "styles_buttons__i4fo8",
	"isActive": "styles_isActive__PGy6l",
	"playButton": "styles_playButton__fmvI6"
};


/***/ }),

/***/ 4811:
/***/ (function(module) {

// Exports
module.exports = {
	"wrapper": "app_wrapper__X8llh"
};


/***/ }),

/***/ 5675:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__(6255)


/***/ }),

/***/ 9566:
/***/ (function(module) {

function _extends() {
  module.exports = _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

module.exports = _extends;

/***/ }),

/***/ 2426:
/***/ (function(module) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;

/***/ }),

/***/ 6169:
/***/ (function(module) {

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

module.exports = _objectWithoutPropertiesLoose;

/***/ }),

/***/ 5639:
/***/ (function(module) {

"use strict";
module.exports = require("date-fns/locale/pt-BR");;

/***/ }),

/***/ 5273:
/***/ (function(module) {

"use strict";
module.exports = require("next/dist/next-server/lib/head.js");;

/***/ }),

/***/ 5519:
/***/ (function(module) {

"use strict";
module.exports = require("next/dist/next-server/lib/to-base-64.js");;

/***/ }),

/***/ 444:
/***/ (function(module) {

"use strict";
module.exports = require("next/dist/next-server/server/image-config.js");;

/***/ }),

/***/ 9297:
/***/ (function(module) {

"use strict";
module.exports = require("react");;

/***/ }),

/***/ 5282:
/***/ (function(module) {

"use strict";
module.exports = require("react/jsx-runtime");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = (__webpack_exec__(1240));
module.exports = __webpack_exports__;

})();