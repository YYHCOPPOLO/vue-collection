<template>
  <div style="height: 600px">
    <div id="jsoneditor"></div>
  </div>
</template>

<script>
import JSONEditor from "jsoneditor/dist/jsoneditor-minimalist";

export default {
  props: {
    // 配置项，用于更新配置
    options: {
      type: Object,
      default: () => {},
    },
    // 是否可读，默认可编辑
    isReadOnly: {
      type: Boolean,
      default: false,
    },
    // 绑定 v-model 的值
    value: null,
  },
  data() {
    return {
      // 保存 jsoneditor 实例
      editor: null,
      // 保存 jsonedtior 内部的值，便于和外部值比较和更新
      innerValue: null,
    };
  },
  // 配置 v-model 的事件和绑定值，分别为 change 和 value
  model: {
    event: "change",
    prop: "value",
  },
  watch: {
    //监听 options 选项，用于更新
    options(val) {
      this.setOption(val);
    },
    value(newVal) {
      if (JSON.stringify(newVal) !== JSON.stringify(this.innerValue)) {
        this.editor.set(newVal);
      }
    },
  },
  mounted() {
    let options = this.isReadOnly
      ? { mode: "view" }
      : {
          mode: "code",
          modes: ["code", "form", "tree", "view"],
          onChange: () => {
            try {
              const value = this.editor.get();
              this.setValue(value);
            } catch (e) {
              console.error(e);
            }
          },
        };
    // 将初始化选项和传入的选项合并
    options = Object.assign(options, this.options);
    // 初始化 jsoneditor ，传入选项信息
    this.editor = new JSONEditor(this.$el, options);
    // 有默认值就设置
    if (this.value) {
      this.editor.set(this.value);
    }
  },
  methods: {
    setValue(val) {
      // 更新内部值
      this.innerValue = val;
      // 触发 change 事件，将 val 更新到 v-model
      this.$emit("change", val);
    },
  },
};
</script>

<style scoped>
@import "~jsoneditor/dist/jsoneditor.min.css";
</style>
