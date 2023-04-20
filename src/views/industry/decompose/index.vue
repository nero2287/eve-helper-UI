<template>
<div>
  <div class="max">
    <div class="max-box">
      <p style="color: #ff0000">蓝图名称：{{ bluePrintName }}</p>
      <div class="box" @click="ImgClick()">
        <img v-if="bluePrintReady" :src="bluePrintPicture" />
      </div>
      <div class="search-box">
        <p>流程：</p>
        <input class="search" type="text" v-model="processValue" @change="processChange()"/>
      </div>
    </div>
    <el-form label-width="120px">
      <el-form-item label="蓝图材料效率：">
        <el-input/>
      </el-form-item>
      <el-form-item label="蓝图时间效率：">
        <el-input/>
      </el-form-item>
      <el-form-item label="制造时间：">
        <el-input/>
      </el-form-item>
    </el-form>
    <el-dialog title="蓝图选择" :visible.sync="open" width="30%">
        <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
        <el-tree class="filter-tree" :data="bluePrintList" @node-click="nodeClick" :props="defaultProps" :filter-node-method="filterNode" ref="tree">
            <span class="custom-tree-node" slot-scope="{node,data}">
                <img v-if="data.picture!=null && data.picture!=undefined" :src="getUrl(data.picture)" height="16px" width="16px" />
                <span>{{node.label}}</span>
            </span>
        </el-tree>
    </el-dialog>
  </div>
  <el-form label-width="100px">
    <el-col :span="8">
    <el-form-item label="材料等级:">
        <el-select v-model="form.region" placeholder="请选择材料等级">
            <el-option label="材料1" value="1"></el-option>
            <el-option label="材料2" value="2"></el-option>
        </el-select>
    </el-form-item>
    </el-col>
  </el-form>
   <el-table :data="tableData" v-loading="loading" border style="width: 100%">
       <el-table-column prop="name" label="材料名称" align="center"></el-table-column>
       <el-table-column prop="num" label="材料数量" align="center"></el-table-column>
       <el-table-column prop="level" label="材料类型" align="center"></el-table-column>
       <el-table-column prop="type" label="物品类型" align="center"></el-table-column>
       <el-table-column label="操作" align="center" width="300">
           <template slot-scope="scope">
               <el-button>锁定</el-button>
               <el-button @click="decompose(scope.row)">分解</el-button>
               <el-button>移除</el-button>
           </template>

       </el-table-column>
  </el-table>
  </div>
</template>

<script>

import { BluePrintList } from "@/api/article/article.js";
import {listArticleWarehouse } from "@/api/decomposition/decomposition.js";
export default {
  watch: {
    filterText(val) {
        this.$refs.tree.filter(val);
    }
  },
  data() {
    return {
        bluePrintInfo:{},
        processValue:0,
        loading:false,
      data:[],
      filterText:'',
      open: false,
        bluePrintPicture:'',
        bluePrintName: '',
        bluePrintReady:false,
        treePicture:'',
      bluePrintList: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
     tableData: [],
          form: {
          region: '',
          },
    };
  },
  created(){
    BluePrintList().then(res => {
      this.bluePrintList = res.data;
    })
  },
  methods: {
      getUrl(type){
          if(type!=undefined&&type!=""){
              return require(`@/assets/images/${type}`);
          }else{
              return false;
          }
      },
      ImgClick() {
          this.open = true;
      },
      nodeChange() {
          console.log(this.data);
      },
      filterNode(value, data) {
          if (!value) return true;
          return data.label.indexOf(value) !== -1;
      },
      nodeClick(data){
          this.bluePrintInfo = data.value;
          if(data.children==undefined){
              this.tableData = [];
              this.processValue = 1;
              this.loading = true;
              this.bluePrintPicture=require('@/assets/images/2.png');
              this.bluePrintReady=true;
              this.bluePrintName = data.value.blueprint_name;
              this.open=false;
              listArticleWarehouse(data.value).then(res=>{
                  res.data.forEach((item)=>{
                      let material ={};
                      material.name = item.material_name;
                      material.num = item.material_num;
                      material.level = item.material_type;
                      material.type = item.article_type;
                      material.materialData = item;
                      this.tableData.push(material);
                  })
                  this.loading = false;

			  })
          }
      },
      processChange(){
        let process = this.processValue;
        let bluePrintData = this.bluePrintInfo;
        bluePrintData.process_num = process;
        this.loading = true;
          listArticleWarehouse(bluePrintData).then(res=>{
              this.tableData = [];
              res.data.forEach((item)=>{
                  let material ={};
                  material.name = item.material_name;
                  material.num = item.material_num;
                  material.level = item.material_type;
                  material.type = item.article_type;
                  material.materialData = item;
                  this.tableData.push(material);
              })
              this.loading = false;
          })
      },
      decompose(row){
          let BluePrint = {};
          BluePrint.article_code = row.materialData.material_bluePrint;
          BluePrint.article_num = row.num;
          BluePrint.process_num = this.processValue;
          let newTableData = [];
          let addMaterialData = [];
          let materialData = [];
          listArticleWarehouse(BluePrint).then(res=>{
              res.data.forEach((item)=>{
                  let flag = true;
                  this.tableData.forEach((tableItem)=>{
                      let a = 0;
                      if(item.material_name==tableItem.name){
                          tableItem.name = item.material_name;
                          tableItem.num = tableItem.num + item.material_num;
                          tableItem.level = item.material_type;
                          tableItem.type = item.article_type;
                          tableItem.materialData = item;
                          flag=false;
                      }
                      a++;
                  })

                  if(flag){
                      materialData.push(item);
                  }
              })
              materialData.forEach((item)=>{
                  let material = {};
                  material.name = item.material_name;
                  material.num = item.material_num;
                  material.level = item.material_type;
                  material.type = item.article_type;
                  material.materialData = item;
                  this.tableData.push(material);
              })
              let newTableData = [];
              this.tableData.forEach((item)=>{
                  if(item.name!=row.name){
                      newTableData.push(item);
                  }
              })
              this.tableData = newTableData;
          })
      },
  },
};
</script>
<style lang="less" scoped>
.max {
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  .max-box {
    width: 500px;
    justify-content: center;
    align-items: center;
    text-align: center;
    .box {
      height: 200px;
      width: 200px;
      background: url("../../../assets/images/lt.png") no-repeat;
      background-size: 100%;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .search-box {
      margin-top: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      .search {
        width: 152px;
        height: 26px;
        outline: none;
      }
    }
  }
}
</style>