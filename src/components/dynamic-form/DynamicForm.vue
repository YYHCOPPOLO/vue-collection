<template>
  <el-form ref="formRef" label-width="80px">
    <!-- 遍历 formComponentList，生成表单组件列表 -->
    <!-- 通过 formLabel 配置左侧 label 标签名称 -->
    <el-form-item
      v-for="(item, index) in formComponentList"
      :label="item.formLabel"
      :key="index"
    >
      <!-- 通过 if 判断，插入对应的表单组件 -->
      <!-- 每个表单组件都有 v-model 绑定 value -->

      <!-- el-input -->
      <el-input
        v-if="item.componentName === 'el-input'"
        v-model="item.value"
        :type="item.type"
        :placeholder="item.placeholder"
      ></el-input>
      <!-- el-select -->
      <el-select v-if="item.componentName === 'el-select'">
        <!-- select, checkbox-group, radio-group 等组件可以通过 options 配置选项 -->
        <el-option
          v-for="option in item.options"
          :label="option.label"
          :value="option.value"
          :key="option.value"
        ></el-option>
      </el-select>
      <!-- el-date-picker -->
      <el-date-picker
        v-if="item.componentName === 'el-date-picker'"
        v-model="item.value"
        :type="item.type || 'date'"
        :value-format="item.valueFormat"
        :placeholder="item.placeholder"
      ></el-date-picker>
      <!-- el-time-picker -->
      <el-time-picker
        v-if="item.componentName === 'el-time-picker'"
        v-model="item.value"
        :value-format="item.valueFormat"
        :placeholder="item.placeholder"
      ></el-time-picker>
      <!-- el-switch -->
      <el-switch
        v-if="item.componentName === 'el-switch'"
        v-model="item.value"
      ></el-switch>
      <!-- el-checkbox-group -->
      <el-checkbox-group
        v-if="item.componentName === 'el-check-group'"
        v-model="item.value"
      >
        <el-checkbox
          v-for="option in item.options"
          :label="optoin.label"
          :key="option.label"
        >
          {{ option.text || option.label }}
        </el-checkbox>
      </el-checkbox-group>
      <!-- el-radio-group -->
      <el-radio-group>
        <el-radio
          v-for="option in item.options"
          :label="option.label"
          :key="option.label"
        >
          {{ option.text || option.label }}
        </el-radio>
      </el-radio-group>
    </el-form-item>
    <slot></slot>
  </el-form>
</template>

<script>
// 下面是 Vue 组件
export default {
  // 传入选项
  props: {
    // 表单组件信息
    formComponentList: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
