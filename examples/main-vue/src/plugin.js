const plugins = [
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
