<template>
  <div class="table-container">
    <!-- 非删除就正常显示这两个按钮 -->
    <el-button v-if="!showDeleteCheckBox" @click="initForm" type="primary"
      >新增</el-button
    >
    <el-button
      v-if="!showDeleteCheckBox"
      @click="showDeleteCheckBox = true"
      type="danger"
      >删除</el-button
    >
    <!-- 批量删除模式就只显示删除按钮 -->
    <el-button
      v-if="showDeleteCheckBox"
      @click="deleteTableItem(chosenItem, false)"
      type="danger"
      >删除</el-button
    >
    <el-button
      v-if="showDeleteCheckBox"
      @click="showDeleteCheckBox = false"
      type="info"
    >
      取消
    </el-button>
    <!-- Form -->
    <el-dialog title="新增" :visible.sync="dialogFormVisible">
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
        <div class="form-button-group">
          <el-button type="info" @click="dialogFormVisible = false"
            >取消</el-button
          >
          <el-form-item>
            <el-button type="primary" @click="submitForm"> 确定 </el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-dialog>
    <el-table
      stripe
      :data="tableData"
      style="border: 1px solid #ebebeb; border-radius: 3px; margin-top: 10px"
    >
      <!-- 绑定 tableData 中的各个属性 -->
      <el-table-column prop="id" label="id" width="100">
        <template slot-scope="scope">
          <el-checkbox
            v-if="showDeleteCheckBox"
            :checked="chosenItem.indexOf(scope.row.id) > -1"
            @change="toggleChosenItem(scope.row.id)"
            style="margin-right: 5px"
          ></el-checkbox>
          <span> {{ scope.row.id }} </span>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="日期" width="200"></el-table-column>
      <el-table-column prop="name" label="姓名" width="200"></el-table-column>
      <el-table-column prop="phone" label="电话" width="200"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <!-- 表格右侧的表头名称操作 -->
      <el-table-column fixed="right" label="操作" width="300">
        <template slot-scope="scope">
          <el-button
            :disabled="showDeleteCheckBox"
            @click="editFormItem(scope.row)"
            type="info"
            size="small"
          >
            编辑
          </el-button>
          <el-button
            :disabled="showDeleteCheckBox"
            @click="deleteTableItem([scope.row.id])"
            type="danger"
            size="small"
            >删除</el-button
          >
          <el-button
            :disabled="showDeleteCheckBox"
            @click="moveTableItem(scope.row.id, 'up')"
            size="small"
            type="text"
          >
            上移
          </el-button>
          <el-button
            :disabled="showDeleteCheckBox"
            @click="moveTableItem(scope.row.id, 'down')"
            size="small"
            type="text"
          >
            下移
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
const tableItem = {
  date: "2019-05-20", // 日期
  name: "被删", // 姓名
  phone: "13888888888", // 电话
  address: "深圳市南山区滨海大道 888 号", // 地址
};

const tableData = Array(20)
  .fill(tableItem)
  .map((x, i) => {
    return { id: i + 1, ...x };
  });

export default {
  name: "Table",
  data() {
    return {
      dialogFormVisible: false,
      showDeleteCheckBox: false,
      tableData,
      chosenItem: [],
      form: {},
      formLabelWidth: "120px",
      formRules: {
        date: [
          {
            type: "string",
            required: true,
            message: "请选择日期",
            trigger: blur,
          },
        ],
        name: [
          { required: true, message: "请输入名字", trigger: "change" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字", trigger: "blur" },
        ],
        phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
      },
    };
  },
  methods: {
    // add new one
    updateTableItem(item = {}) {
      if (item.id !== undefined) {
        const itemIndex = this.tableData.findIndex((x) => x.id === item.id);
        if (itemIndex > -1) {
          this.tableData.splice(itemIndex, 1, { ...item });
        }
      } else {
        this.tableData.push({ ...item, id: this.tableData.length + 1 });
      }
    },
    // delete one
    deleteTableItem(idArray, flag = true) {
      if (flag) {
        const filteredTableData = this.tableData.filter(
          (x) => idArray.indexOf(x.id) === -1
        );
        this.tableData = filteredTableData;
      } else {
        const filteredTableData = this.tableData.filter(
          (x) => idArray.indexOf(x.id) === -1
        );
        this.tableData = filteredTableData;
        this.showDeleteCheckBox = false;
        this.chosenItem = [];
      }
    },
    // move one
    moveTableItem(id, direction) {
      const dataLength = this.tableData.length;
      const index = this.tableData.findIndex((x) => x.id === id);
      switch (direction) {
        case "up":
          if (index > 0) {
            // 第一个不进行上移
            const item = this.tableData.splice(index, 1)[0];
            this.tableData.splice(index - 1, 0, item);
          }
          break;
        case "down":
          // 最后一个不进行下移
          if (index < dataLength - 1) {
            const item = this.tableData.splice(index, 1)[0];
            this.tableData.splice(index + 1, 0, item);
          }
          break;
      }
    },
    // 编辑已存在数据的表单
    editFormItem(formItem) {
      this.form = { ...formItem };
      this.dialogFormVisible = true;
    },
    // 提交表单
    submitForm() {
      this.$refs["formRef"].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false;
          this.updateTableItem(this.form);
        } else {
          return false;
        }
      });
    },
    // 初始化表单
    initForm(form = {}) {
      this.dialogFormVisible = true;
      this.form = form;
    },
    toggleChosenItem(id) {
      const index = this.chosenItem.findIndex((x) => x.id === id);
      if (index > -1) {
        //如果大于 -1 说明已经有这个选项，所以删除
        this.chosenItem.splice(index, 1);
      } else {
        console.log(id);
        this.chosenItem.push(id);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.form-button-group {
  display: flex;
}
</style>
