<template>
  <header>
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      size="mini"
    >
      <el-form-item label="成绩分析名称">
        <el-input
          v-model="page.phone"
          placeholder="请输入成绩分析名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="分析类型">
        <el-input v-model="page.name" placeholder="请选择分析类型"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-input v-model="page.name" placeholder="请选择状态"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
        <el-form-item>
          <el-button type="primary" @click="clean">重置</el-button>
        </el-form-item>
      </el-form-item>
      <el-form-item>
        <el-form-item>
          <el-button type="primary" @click="clean" class="el-icon-plus"
            >邀请教师</el-button
          >
        </el-form-item>
      </el-form-item>
    </el-form>

    <el-table
      :data="tableData"
      border
      style="width: 100%"
      class="table"
      size="small"
    >
      <el-table-column prop="grade" label="成绩分析名称"> </el-table-column>
      <el-table-column
        prop="stage"
        label="学段"
        :formatter="(row) => this.stage[row.stage]"
      >
      </el-table-column>
      <el-table-column
        prop="class"
        label="年级"
        :formatter="(row) => this.class[row.class]"
      >
      </el-table-column>
      <el-table-column
        prop="year"
        label="入学年份"
        :formatter="(row) => `${row.year}年`"
      >
      </el-table-column>
      <el-table-column prop="time" label="考试时间"> </el-table-column>
      <el-table-column
        prop="type"
        label="分析类型"
        :formatter="(row) => this.type[row.type]"
      >
      </el-table-column>
      <el-table-column prop="name" label="创建人"> </el-table-column>
      <el-table-column prop="date" label="创建时间"> </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag
            v-show="scope.row.status === 0"
            style="cursor: pointer"
            @click="toAnalysisBuilt(scope.row)"
            >参数设置</el-tag
          >
          <el-tag
            v-show="scope.row.status === 1"
            style="cursor: pointer"
            type="success"
            >分析完成</el-tag
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 页码显示 -->
    <el-pagination
      class="page"
      background
      @size-change="changeSize"
      @current-change="changePage"
      :current-page="page.pageIndex"
      :page-sizes="[5, 10]"
      :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
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
      this.loading = true;
      getSchoolApply(this.page).then((res) => {
        let { data } = res;
        this.tableData = data.list;
        this.total = data.num;
        this.loading = true;

        // data.listforEath((item) => {
        //  item.sex = item.sex ? "男" : "女";
        // });
      });
    },

    handleClick(row, status) {
      row.status = status;
    },

    formatter(row) {
      return row.sex ? "男" : "女";
    },

    //修改当前数据显示量
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
    //查找当前列
    search(e) {
      this.page.pageIndex = e;
      this.getSchoolApply();
    },
    //重置搜索
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
}

.active {
  background-color: #1dbd84;
}
</style>