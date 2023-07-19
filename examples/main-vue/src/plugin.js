function proxyAddEventListenerFactory(windowObj) {
  const rawAddEventListener = windowObj.addEventListener;

  function proxyAddEventListener(type, rawListener, options) {
    const listener = (e) => {
      const target = e.target;
      const realTarget = target.shadowRoot && e.composed ? e.composedPath()[0] || target : target;
      // 因为 e.target 是只读属性，只能构造一个新的对象代替 Event 对象
      const event = {};

      for (let key in e) {
        event[key] = e[key];
      }
      event.target = realTarget; // 将 target 指向正确的节点
      // 防止后续使用 stopPropagation、preventDefault 报错
      event.stopPropagation = () => e.stopPropagation();
      event.preventDefault = () => e.preventDefault();
      event.rawEvent = e;
      console.log(event);
      rawListener.call(windowObj, event);
    };

    rawAddEventListener(type, listener, options);
  }

  return proxyAddEventListener;
}

const plugins = [
  {
    jsBeforeLoaders: [
      {
        callback: (appWindow) => {
          /**wangeditor ---start */

          Object.defineProperties(appWindow, {
            Selection: {
              get: () =>
                appWindow.__WUJIE.degrade
                  ? appWindow.__WUJIE.document.defaultView.Selection
                  : appWindow.parent.Selection,
            },
            DataTransfer: {
              get: () =>
                appWindow.__WUJIE.degrade
                  ? appWindow.__WUJIE.document.defaultView.DataTransfer
                  : appWindow.parent.DataTransfer,
            },
          });
          /**wangeditor ---end */

          /**捕获target异常处理  */
          appWindow.addEventListener = proxyAddEventListenerFactory(appWindow);
        },
      },
    ],
    jsLoader: (code) => {
      return (
        code
          /**wangeditor ---start */
          .replace(
            "window.document.activeElement&&window.document.activeElement.shadowRoot",
            "((window.document.activeElement && window.document.activeElement.shadowRoot) || window.$wujie )"
          )
          .replace("!!t&&e instanceof t.Node", " e !=null&&typeof e.nodeType === 'number'")
          .replace("n.isCollapsed", "n.baseOffset === n.focusOffset")
          .replace("n.collapsed", "n.startOffset === n.endOffset")
        // .replace(
        //   'e.target',
        //   'e.target?.shadowRoot && e.composed? (e.composedPath()[0] || e.target) : e.target'
        // )
        /**wangeditor ---end */
      );
    },
    jsIgnores: [/luckysheet\.umd\.js/, /luckysheet\/plugins\/js\/plugin\.js/],
  },
];

export default plugins;
