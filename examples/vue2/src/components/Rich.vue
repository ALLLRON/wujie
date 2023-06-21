<template>
  <div style="border: 1px solid #ccc; margin-top: 10px">
    <!-- 工具栏 -->
    <Toolbar style="border-bottom: 1px solid #ccc" :editor="editor" :defaultConfig="toolbarConfig" />
    <!-- 编辑器 -->
    <Editor
      v-model="html"
      style="height: 400px; overflow-y: hidden"
      :defaultConfig="editorConfig"
      @onCreated="onCreated"
      @onChange="onChange"
    />
  </div>
</template>

<script>
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
// import Editor from "./Editor.vue";
// import Toolbar from "./Toolbar.vue";

export default {
  name: "Rich",
  props: {
    /**
     * 绑定字段
     */
    value: {
      type: String,
    },
    /**
     * 配置项，详情请参考wangEditor文档
     */
    config: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  components: {
    Editor,
    Toolbar,
  },
  data() {
    return {
      editor: null,
      html: "",
      toolbarConfig: {
        toolbarKeys: [
          // 标题
          "headerSelect",
          // 粗体
          "bold",
          // 字号
          "fontSize",
          // 字体
          "fontFamily",
          // 斜体
          "italic",
          // 下划线
          "underline",
          // 删除线
          "through",
          // 文字颜色
          "color",
          // 背景颜色
          "bgColor",
          // 插入链接
          "insertLink",
          // 对齐方式
          {
            key: "group-justify",
            menuKeys: ["justifyLeft", "justifyRight", "justifyCenter"],
            title: "对齐",
          },
          // 引用
          "blockquote",
          // 插入图片
          {
            key: "group-image",
            menuKeys: ["insertImage", "uploadImage"],
            title: "图片",
          },
          "|",
          // 撤销
          "undo",
          // 重复
          "redo",
        ],
        // excludeKeys: ['', 'group-more-style'],
      },
      editorConfig: {
        autoFocus: false,
        // 所有的菜单配置，都要在 MENU_CONF 属性下
        MENU_CONF: {
          // 上传图片
          uploadImage: {
            server: "/",
            fieldName: "imageFile",
            maxFileSize: 1 * 1024 * 1024,
            // 最多可上传几个文件
            maxNumberOfFiles: 5,
            // 跨域是否传递 cookie
            withCredentials: true,

            base64LimitSize: 1 * 1024 * 1024,
            uploadImgShowBase64: true,
            uploadImgParams: undefined,
            uploadImgParamsWithUrl: true,
            uploadImgTimeout: 5000,
            uploadImgHeaders: undefined,
            uploadImgHooks: undefined,
          },
        },
      },
    };
  },
  computed: {},
  watch: {
    value: {
      handler(newValue) {
        this.html = newValue;
      },
      immediate: true,
    },
  },
  mounted() {
    this.html = this.value;
  },
  methods: {
    getHtml() {
      return this.html;
    },

    onCreated(editor) {
      console.log(window, window.getSelection());
      console.log(editor);
      this.editor = Object.seal(editor);
    },

    onChange(editor) {
      console.log("change", editor);
    },
  },

  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器
  },
};
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>
