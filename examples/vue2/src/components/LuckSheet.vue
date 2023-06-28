<template>
  <div>
    <div
      id="luckysheet"
      style="margin: 0px; padding: 0px; position: relative; width: 100%; height: 800px; left: 0px; top: 0px"
    ></div>
  </div>
</template>

<script>
export default {
  name: "LuckSheet",
  mounted() {
    /**eslint-disable-next-line*/
    $(function () {
      //配置项
      var options = {
        container: "luckysheet", //luckysheet为容器id
        lang: "zh", // 设定表格语言
      };
      console.log(window, window.luckysheet);
      luckysheet.create(options);
    });
  },
};
</script>

<style lang="scss" scoped>
</style>