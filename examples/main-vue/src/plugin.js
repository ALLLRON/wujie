const plugins = [
  {
    jsBeforeLoaders: [
      {
        // content: "window.Selection = window.parent.Selection; window.DataTransfer = window.parent.DataTransfer",
        callback: (appWindow) => {
          console.log(appWindow.parent, appWindow.parent.luckysheet);

          console.log(appWindow, appWindow.luckysheet);

          console.log(window.__WUJIE_RAW_WINDOW__, window);

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
        },
      },
    ],
    jsAfterLoaders: [
      {
        callback: (appWindow) => {
          console.log(appWindow);
        },
      },
    ],
    jsLoader: (code) => {
      return (
        code
          // wangEditor
          // .replace("IS_CHROME && hasShadowRoot()", `(IS_CHROME && hasShadowRoot()) || (IS_CHROME && window.$wujie)`)
          .replace(
            "window.document.activeElement&&window.document.activeElement.shadowRoot",
            "((window.document.activeElement && window.document.activeElement.shadowRoot) || window.$wujie )"
          )
          // window.document.activeElement&&window.document.activeElement.shadowRoot
          .replace("!!t&&e instanceof t.Node", " e !=null&&typeof e.nodeType === 'number'")
          // .replace("e instanceof t.Node", "e instanceof (window.__WUJIE.degrade ? window.Node : t.Node)")
          .replace("n.isCollapsed", "n.baseOffset === n.focusOffset")
          .replace("n.collapsed", "n.startOffset === n.endOffset")
        // luckysheet
        // .replace("var luckysheet", "window.luckysheet") // 与jsignores二选一即可
      );
    },
    jsIgnores: [/luckysheet\.umd\.js/, /luckysheet\/plugins\/js\/plugin\.js/],
  },
  // wangEditor-降级开启模式下（degrade:true）加入这个插件可以正常使用。非降级模式异常
  // {
  //   jsBeforeLoaders: [
  //     {
  //       callback: (appWindow) => {
  //         Object.defineProperties(appWindow, {
  //           Selection: {
  //             get: () => appWindow.__WUJIE.document.defaultView.Selection,
  //           },
  //           DataTransfer: {
  //             get: () => appWindow.__WUJIE.document.defaultView.DataTransfer,
  //           },
  //         });
  //       },
  //     },
  //   ],
  //   jsLoader: (code) => {
  //     return code
  //       .replace("!!t&&e instanceof t.Node", " e !=null&&typeof e.nodeType === 'number'")
  //       .replace("n.isCollapsed", "n.baseOffset === n.focusOffset")
  //       .replace("n.collapsed", "n.startOffset === n.endOffset");
  //   },
  // },
];

export default plugins;
