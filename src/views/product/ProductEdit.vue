<template>
  <div>
    <!-- Form -->
    <el-card class="card" title="新增">
      <div slot="header">
        <span>{{ form.id ? "编辑" : "新建" }}</span>
      </div>
      <el-form :model="form" :rules="formRules" ref="formRef">
        <el-form-item label="日期" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.date"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.phone" type="tel"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="submitForm"> 确定 </el-button>
      <el-button type="info" @click="dialogFormVisible = false">取消</el-button>
    </el-card>
  </div>
</template>

<script>
import tableData from "../../data/index";

export default {
  name: "TableForm",
  data() {
    return {
      formLabelWidth: "120px",
      form: {},
      formRules: {
        date: [
          {
            type: "string",
            required: true,
            message: "请选择日期",
            trigger: "blur",
          },
        ],
        name: [
          { required: true, message: "请输入名字", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字", trigger: "blur" },
        ],
        phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
      },
    };
  },
  created() {
    // 初始化表单
    this.updateFormItem();
  },
  watch: {
    $route() {
      // 路由跳转时清空表单
      this.updateFormItem();
    },
  },
  methods: {
    updateFormItem() {
      const id = this.$route.params.id;
      const formItem = tableData.find((x) => x.id === id);
      if (formItem) {
        this.form = { ...formItem };
      } else {
        this.form = {};
      }
    },
    updateTableItem(item = {}) {
      if (item.id !== undefined) {
        const itemIndex = tableData.findIndex((x) => x.id === item.id);
        if (itemIndex > -1) {
          tableData.splice(itemIndex, 1, { ...item });
        } else {
          tableData.push({ ...item, id: tableData.length + 1 });
        }
      }
    },
    submitForm() {
      this.$refs["formRef"].validate((valid) => {
        if (valid) {
          this.updateTableItem(this.form);
          this.$route.push({ name: "ProductList" });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  width: 600px;
}
</style>
