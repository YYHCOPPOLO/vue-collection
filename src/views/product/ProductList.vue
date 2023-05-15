<template>
  <div class="table-container">
    <el-row>
      <el-col :span="24">
        <!-- 删除过程中不允许其他操作 -->
        <el-button
          v-if="!showDeleteCheckbox"
          @click="updateTableItem()"
          type="primary"
          >新增</el-button
        >
        <el-button
          v-if="!showDeleteCheckbox"
          @click="changeShowDeleteCheckBox"
          type="danger"
          >删除</el-button
        >
        <!-- 删除过程中只能出现确认删除和取消按钮 -->
        <el-button
          v-if="showDeleteCheckbox"
          @click="deleteTableItem(chosenItem)"
          type="danger"
          >确认删除</el-button
        >
        <el-button
          v-if="showDeleteCheckbox"
          @click="changeShowDeleteCheckBox"
          type="info"
        >
          取消
        </el-button>
      </el-col>
    </el-row>
    <el-table
      stripe
      :data="tableData"
      style="border: 1px solid #ebebeb; border-radius: 3px; margin-top: 10px"
    >
      <!-- 绑定 tableData 中的各个属性 -->
      <el-table-column prop="id" label="id" width="100">
        <template slot-scope="scope">
          <el-checkbox
            v-if="showDeleteCheckbox"
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
            :disabled="showDeleteCheckbox"
            type="info"
            size="small"
            @click="updateTableItem(scope.row.id)"
          >
            编辑
          </el-button>
          <el-button
            :disabled="showDeleteCheckbox"
            @click="deleteTableItem([scope.row.id])"
            type="danger"
            size="small"
            >删除</el-button
          >
          <el-button
            :disabled="showDeleteCheckbox"
            @click="moveTableItem(scope.row.id, 'up')"
            size="small"
          >
            上移
          </el-button>
          <el-button
            :disabled="showDeleteCheckbox"
            @click="moveTableItem(scope.row.id, 'down')"
            size="small"
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
      tableData,
      showDeleteCheckbox: false,
      chosenItem: [],
    };
  },
  methods: {
    // add new one
    addTableItem(item = {}) {
      this.tableData.push({ ...item, id: this.tableData.length + 1 });
    },
    // delete one
    deleteTableItem(idArray) {
      const filteredData = this.tableData.findIndex(
        (x) => idArray.indexOf(x.id) === -1
      );
      this.tableData = filteredData;
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
    updateTableItem(id = 0) {
      if (id !== 0) {
        this.$router.push({ name: "ProductEdit", params: { id } });
      } else {
        this.$router.push({ name: "ProductAdd" });
      }
    },
    toggleChosenItem(id) {
      const index = this.chosenItem.findIndex((x) => x.id === id);
      if (index > -1) {
        this.chosenItem.splice(index, 1);
      } else {
        console.log(111);
        this.chosenItem.push(id);
      }
    },
    changeShowDeleteCheckBox() {
      this.showDeleteCheckbox = !this.showDeleteCheckbox;
    },
  },
};
</script>

<style lang="scss" scoped></style>
