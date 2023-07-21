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
          // appWindow.addEventListener = proxyAddEventListenerFactory(appWindow);
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
          /**wangeditor ---end */
          .replace(
            "var target = event.target",
            "var target =(event.target.shadowRoot && event.composed) ? (event.composedPath()[0] || event.target) : event.target "
          )
      );
    },
    jsIgnores: [/luckysheet\.umd\.js/, /luckysheet\/plugins\/js\/plugin\.js/],
  },
];

export default plugins;
