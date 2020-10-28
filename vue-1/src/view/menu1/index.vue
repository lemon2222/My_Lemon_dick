<template>
  <header>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="成绩分析名称">
        <el-input v-model="formInline.user" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="分析类型">
        <el-select v-model="form.region" placeholder="请选择" width="100px">
          <el-option label="胡乱分析"></el-option>
          <el-option label="2²分析"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="form.region" placeholder="请选择">
          <el-option label="参数设置"></el-option>
          <el-option label="分析完整"></el-option>
        </el-select>
      </el-form-item>
      <el-date-picker
        v-model="value1"
        type="date"
        placeholder="选择日期"
        class="Data"
        width= "180px"
      >
      </el-date-picker>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-form-item>
          <el-button type="primary" @click="clean">新增分析</el-button>
        </el-form-item>
      </el-form-item>
    </el-form>
    <el-table
      ref="singleTable"
      :data="tableData"
      highlight-current-row
      @current-change="handleCurrentChange"
      style="width: 100%"
    >
      <el-table-column
        property="name"
        label="教师姓名"
        width="120"
      ></el-table-column>
      <el-table-column property="age" label="年龄" width="120">
      </el-table-column>
      <el-table-column
        property="sex"
        label="性别"
        :formatter="formatter"
        width="120"
      >
      </el-table-column>
      <el-table-column property="phone" label="手机号码" width="120">
      </el-table-column>
      <el-table-column property="date" label="申请时间" width="120">
      </el-table-column>
      <el-table-column property="status" label="操作" width="240">
        <template slot-scope="scope">
          <div v-if="scope.row.status == 0"></div>
          <el-button @click="handleClick(scope.row, 1)" type="success"
            >通过</el-button
          >
          <el-button @click="handleClick(scope.row, 2)" type="danger"
            >拒绝</el-button
          >
          <el-tag v-if="scope.row.status == 1" type="success">通过</el-tag>
          <el-tag v-if="scope.row.status == 2" type="danger">拒绝</el-tag>
        </template>
      </el-table-column>
    </el-table>

    <div class="block">
      <el-pagination
        background
        @size-change="changeSize"
        @current-change="cheangepage"
        :current-page="page.pageIndex"
        :page-sizes="[1, 10]"
        :page-size="page.pageIndex"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </header>
</template>

<script>
import { getSchoolApply } from "../../api/api";
export default {
  data() {
    return {
      page: {
        pageSize: 1,
        pageIndex: 10,
      },
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
        },
        value1: '',
        value2: '',
      formInline: {
        user: "",
        region: "",
      },
      tableData: [],
      total: 0,
      currentRow: null,
      loading: false,
    };
  },

  methods: {
    getSchoolApply() {
      getSchoolApply(this.page).then((res) => {
        let { data } = res;
        this.tableData = data.list;
        this.total = data.num;
      });
    },
    handleClick(row, status) {
      row.status = status;
    },
    formatter(row) {
      return row.sex ? "男" : "女";
    },

    //修改当前条目数
    changeSize(e) {
      this.page.pageSize = e;
      this.page.pageIndex = 1;
      this.getSchoolApply();
    },
    //修改当前页数
    changePage(e) {
      this.page.pageIndex = e;
      this.getSchoolApply();
    },
    //查找当前列表
    search(e) {
      this.page.pageIndex = e;
      this.getSchoolApply();
    },
    clean() {
      this.page.phone = "";
      this.page.name = "";
      this.page.pageIndex = "";
      this.getSchoolApply();
    },
  },
  mounted() {
    this.getSchoolApply();
  },
};
</script>

<style lang='scss'>
.el-date-editor {
  width: 140px !important;
}
.el-input__inner {
  width: 140px;
}
.cell {
  text-align: center !important;
}
.el-main {
  background-color: #ececec;
  padding: 10px;
}
header {
  background-color: #ffffff;
  padding: 10px;
  border-radius: 5px;
}
.el-table__row {
  width: 100%;
}
table {
  width: 100%;
  margin-right: 0;
}

.el-pagination {
  text-align: center;
  margin: 10px 0;
}


.el-button {
  margin-left: 15px;
  background-color: #1dbd84;
}

.Data {
  width: 75px;
}
.el-date-editor{
  width: 120px;
}

</style>