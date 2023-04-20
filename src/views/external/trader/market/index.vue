<template>
  <div class="app-container">
    <common />
    <!-- 交易 -->
    <div class="transaction-container">
      <div class="transaction-item">
        <p class="item-title">冰矿</p>
        <el-table :data="iceTable" v-loading="loading" size="mini" style="width: 100%">
          <el-table-column prop="name" align="center" label="物品名"/>
          <el-table-column prop="price" align="left" label="价格"/>
        </el-table>
      </div>
      <div class="transaction-item">
        <p class="item-title">矿物</p>
        <el-table :data="mineralTable" v-loading="loading" size="mini" style="width: 100%">
          <el-table-column prop="name" align="center" label="物品名"/>
          <el-table-column prop="price" align="left" label="价格"/>
        </el-table>
      </div>
      <div class="transaction-item">
        <p class="item-title">行星材料</p>
        <el-table :data="planetMaterialTable" v-loading="loading" size="mini" style="width: 100%">
          <el-table-column prop="name" align="center" label="物品名"/>
          <el-table-column prop="price" align="left" label="价格"/>
        </el-table>
      </div>
      <div class="transaction-item">
        <p class="item-title">卫星矿物</p>
        <el-table :data="moonMaterialTable" v-loading="loading" size="mini" style="width: 100%">
          <el-table-column prop="name" align="center" label="物品名"/>
          <el-table-column prop="price" align="left" label="价格"/>
        </el-table>
      </div>
    </div>
    <!-- 市场地点-->
    <el-form class="select" label-width="80px">
      <el-form-item label="市场地点">
        <el-select v-model="location" placeholder="选择地点">
          <el-option label="吉他" value="10000002" selected></el-option>
          <el-option label="G族" value="10000003"></el-option>
          <el-option label="M族" value="10000004"></el-option>
          <el-option label="A族" value="10000005"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="服务器">
        <el-select v-model="dataSource" placeholder="选择服务器">
          <el-option label="国服" value="serenity" selected></el-option>
          <el-option label="欧服" value="tranquility"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="数据时间">
        <span>数据更新时间：2022年10月4日11:39:40</span>
      </el-form-item>
    </el-form>
    <!-- 物品-->
    <div class="goods-container">
      <div class="goods-left">
        <el-input placeholder="输入关键字进行过滤" v-model="data_name" @change="searchUniverseTypeByTypeName" clearable/>
        <el-tree v-if="data_name === ''" class="filter-tree tree-container" :props="props" @node-click="nodeClick" :load="loadTree" lazy>
          <span class="custom-tree-node tree-text" slot-scope="{ node, data }">
            <img v-if="data.picture != null && data.picture !== undefined" :src="getUrl(data.picture)" height="16px" width="16px"/>
            <span>{{ " " + node.label }}</span>
          </span>
        </el-tree>
        <div v-if="data_name !== ''" class="total-container tree-container" v-infinite-scroll="scrollMethods">
          <p class="total" v-for="(item, index) in searchData" :key="index">{{item.name}}</p>
        </div>
      </div>
      <div class="goods-right">
        <div class="right-top">
          <div class="right-top-box">
            <div class="left-content">
              <div class="img-box"></div>
            </div>
            <div class="right-content">
              <div>{{type_name}}</div>
<!--              <div>类型</div>-->
            </div>
          </div>
          <el-table :data="sellTable" v-loading="loading" size="mini" style="width: 100%">
            <el-table-column prop="volume_remain" label="数量" align="center" width="100" />
            <el-table-column prop="price" label="价格" align="center" width="130" />
            <el-table-column prop="system_name" align="center" label="地点" />
            <el-table-column prop="duration" align="center" label="订单时间" />
          </el-table>
        </div>
        <div class="right-bottom">
          <el-table :data="buyTable" v-loading="loading" size="mini" style="width: 100%">
            <el-table-column prop="volume_remain" align="center" label="数量" width="100" />
            <el-table-column prop="price" align="center" label="价格" width="130" />
            <el-table-column prop="system_name" align="center" label="地点" />
            <el-table-column prop="duration" align="center" label="订单时间" />
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import common from "@/views/external/common/common.vue";

import { getMarketGroupTree,getUniverseTypeInfoOrder,marketPriceList } from "@/api/public/market/market.js";
import { searchUniverseTypeByTypeName } from "@/api/public/universe/universe.js";

export default {
  mounted(){

  },
  components: { common },
  data() {
    return {
      data_name: "",
      tradeTable:[],
      sellTable: [],
      buyTable: [],
      groupsList: [],
      type_name: "",
      loading: false,
      props: {
        label: "name",
        children: "zones",
        isLeaf: "leaf",
      },
      searchData:[],
      location: "10000002",
      dataSource: "serenity",
      filterText: "",
      iceTable:[],
      mineralTable:[],
      planetMaterialTable:[],
      moonMaterialTable:[],
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  created() {
    this.getTradeTable();
  },
  methods: {
    getTradeTable(){
      marketPriceList(this.dataSource).then(res=>{
        let data = res.data;
        console.log(data);
        this.iceTable = this.tradeDataFormat(data.ice);
        this.mineralTable = this.tradeDataFormat(data.mineral);
        this.planetMaterialTable = this.tradeDataFormat(data.planetMaterial);
        this.moonMaterialTable = this.tradeDataFormat(data.moonMaterial);
      })
    },
    tradeDataFormat(obj){
      let data = [];
      obj.forEach((item)=>{
        let value = {};
        value.name = item.name;
        value.price = this.toThousands(item.price.price)+" isk";
        data.push(value);
      })
      return data;
    },
    scrollMethods(e){
      // let data ={};
      // data.name = "1111";
      // console.log(111);
      // this.searchData.push(data);
    },
    searchUniverseTypeByTypeName(){
      if(this.data_name!==""){
        searchUniverseTypeByTypeName(this.data_name,this.dataSource).then((res)=>{
          this.searchData=res.data;
        })
      }else{
        this.searchData=[];
      }
    },
    async loadTree(node, resolve) {
      let dataList = [];
      let group_id = 0;
      if (node.data !== undefined) {
        group_id = node.data.group_id;
      }
      await getMarketGroupTree(group_id,this.dataSource).then((res) => {
        if (res.data.type === "types") {
          res.data.list.forEach((item) => {
            let data = {};
            data.name = data.lable = item.name;
            data.leaf = true;
            data.picture = item.picture;
            data.type = item;
            dataList.push(data);
          });
        } else {
          res.data.list.forEach((item) => {
            let data = {};
            data.name = data.lable = item.name;
            data.leaf = false;
            data.picture = item.picture;
            data.group_id = item.market_group_id;
            dataList.push(data);
          });
        }
        this.groupsList = dataList;
      });
      return resolve(dataList);
    },
    getUrl(type) {
      if (type !== undefined && type !== "") {
        return require(`@/assets/public/images/${type}`);
      } else {
        return false;
      }
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    async nodeClick(data) {
      this.loading = true;
      if (data.leaf) {
        this.sellTable = [];
        this.buyTable = [];
        this.type_name = data.name;
        let order = {};
        order.type_id = data.type.type_id;
        order.region_id = this.location;
        order.dataSource = this.dataSource;
        order.is_buy = "sell";
        await getUniverseTypeInfoOrder(order).then((res) => {
          let orderList = res.data.orderList;
          orderList.sort(function (a, b) {
            return a.price - b.price;
          });

          for (let i = 0; i < 11 && orderList[i] !== undefined; i++) {
            orderList[i].price = this.toThousands(orderList[i].price) + " isk";
            this.sellTable.push(orderList[i]);
          }
        });
        order.is_buy = "buy";
        await getUniverseTypeInfoOrder(order).then((res) => {
          let orderList = res.data.orderList;
          orderList.sort(function (a, b) {
            return b.price - a.price;
          });
          for (let i = 0; i < 6 && orderList[i] !== undefined; i++) {
            orderList[i].price = this.toThousands(orderList[i].price) + " isk";
            this.buyTable.push(orderList[i]);
          }
        });
      }
      this.loading = false;
    },

    toThousands(num) {
      return num.toString().replace(/\d+/, function (n) {
        return n.replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
      });
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
.select {
  display: flex;
  justify-content: left;
  padding-left: 160px;
  margin: 10px 0 -22px 0;
}
.top-nav-container {
  display: flex;
  justify-content: space-around;
  height: 30px;
  nav-left-container {
    flex: 1;
    background: #f00;
    .nav-left-item {
      padding: 0 5px;
    }
  }
  nav-right-container {
    flex: 3;
    background: #00f;
    .nav-right-item {
      padding: 0 5px;
    }
  }
}
.menu-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #000;
  color: #fff;
  .menu-item {
    flex: 1;
    text-align: center;
  }
}
.rotation {
  width: 1200px;
  display: flex;
  justify-content: center;
  align-content: center;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.business-container {
  display: flex;
  justify-content: space-between;
  .business-item {
    flex: 1;
    margin: 10px 5px;
    border: 1px solid #000;
    height: 200px;
    .item-name {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
.el-dropdown-link {
  cursor: pointer;
  color: #fff;
}
.el-icon-arrow-down {
  font-size: 12px;
}

/*   物品*/
.goods-container {
  display: flex;
  justify-content: space-around;
  padding: 20px 200px;
  .goods-left {
    flex: 1;
    .total-container {
      .total {
        border-bottom: 1px solid #f1f1f1;
        margin-top:2px;
        margin-bottom:2px;
      }
    }
  }
  .goods-right {
    flex: 3;
    margin-left: 20px;
    .right-top {
      height: 460px;
      background: #fff;
      .right-top-box {
        margin-bottom: 10px;
        height: 100px;
        display: flex;
        .left-content {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          .img-box {
            height: 80px;
            width: 80px;
            background: #f1f1f1;
          }
        }
        .right-content {
          flex: 3;
          div {
            color: #5a5e66;
            margin-top:12px
          }
        }
      }
    }
    .right-bottom {
      height: 210px;
      margin-top: 12px;
    }
  }
}
// 交易
.transaction-container {
  display: flex;
  justify-content: center;
  height: 300px;
  padding: 10px 100px;
  .transaction-item {
    flex: 1;
    align-content: center;
    margin: 0 5px;
    border: 1px solid #000;
    .item-title {
      margin-left: 15px;
    }
  }
}
.tree-container {
  height: 650px;
  width: 100%;
  overflow-y: scroll;
}
.el-table__row td {
  padding: 2px 0;
}
</style>
