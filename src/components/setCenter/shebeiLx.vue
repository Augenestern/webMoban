<template>
  <div class="wBox">
    <div class="bodyTop">
      <div style="margin: 0 10px 0 50px; font-size: 15px">设备类型</div>
      <el-input
        v-model="searchInput"
        placeholder="请输入"
        style="width: 200px; margin-right: 20px"
      />

      <el-button
        type="primary"
        style="font-size: 13px; margin-left: 10px"
        @click="getData"
        >查询&nbsp;<el-icon> <Search /> </el-icon
      ></el-button>
      <el-button
        type="primary"
        style="font-size: 13px; margin-left: auto; margin-right: 150px"
        @click="handleEdit('add')"
        ><el-icon><Plus /></el-icon>&nbsp;新增设备</el-button
      >
    </div>
    <div class="bodyBottom">
      <div style="padding: 3vh; box-sizing: border-box">
        <el-table
          :data="tableData"
          style="width: 100%; height: 60vh"
          table-layout="fixed"
          :header-cell-style="{
            background: '#eef1f6',
            color: '#606266',
            height: '70px',
          }"
          :cell-style="{ height: '50px' }"
        >
          <el-table-column label="设备类型名称" align="center" width="width">
            <template v-slot="scoped">
              {{ tableData[scoped.$index].name }}
            </template>
          </el-table-column>
          <el-table-column label="创建时间" align="center" width="width">
            <template v-slot="scoped">
              {{ tableData[scoped.$index].createTime }}
            </template>
          </el-table-column>
          <el-table-column label="更新时间" align="center" width="width">
            <template v-slot="scoped">
              {{ tableData[scoped.$index].updateTime }}
            </template>
          </el-table-column>
          <el-table-column label="描述" align="center" width="width">
            <template v-slot="scoped">
              {{ tableData[scoped.$index].desc }}
            </template>
          </el-table-column>
          <el-table-column label="协议" align="center" width="width">
            <template v-slot="scoped">
              <el-button
                class="btnText"
                text
                type="primary"
                @click="protocolNews(scoped.$index, scoped.row)"
                ><el-icon><Postcard /></el-icon
                >{{ tableData[scoped.$index].protocol.name }}</el-button
              >
            </template>
            <!-- protocol -->
          </el-table-column>
          <el-table-column label="传感器" align="center" width="width">
            <template v-slot="scoped">
              <el-button
                text
                type="primary"
                @click="sensorsNews(scoped.$index, scoped.row)"
                ><el-icon><MessageBox /></el-icon>传感器详情</el-button
              >
            </template>
            <!-- sensors -->
          </el-table-column>
          <el-table-column label="操作" align="center" width="width">
            <template v-slot="scoped">
              <el-button
                type="primary"
                text
                @click="handleEdit('edit', scoped.$index, scoped.row)"
                ><el-icon><EditPen /></el-icon>编辑</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="bottom: 3vh; position: absolute; right: 60px">
        <el-pagination
          v-model:page-size="pageSize"
          :background="true"
          layout="total, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <el-dialog
      v-model="centerDialogVisible"
      :title="protocolTitle"
      width="40%"
      align-center
      style="height: 40%"
    >
    <el-divider></el-divider>
      <el-table :data="protocolTable" style="height: 16rem">
        <el-table-column label="协议值" prop="originalKey"></el-table-column>
        <el-table-column label="实际值" prop="analyticKey"></el-table-column>
        <el-table-column label="单位" prop="unit"></el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog
      v-model="centerDialogVisible1"
      title="传感器"
      width="40%"
      align-center
      style="height: 50%"
    >
      <el-divider />
      <el-table :data="tableDate1" border style="width: 100%">
        <el-table-column label="传感器名称" prop="name" />
        <el-table-column label="传感器编码" prop="code" />
        <el-table-column type="expand">
          <template #default="props">
            <el-table
              :data="props.row.sensors[0].detectionValue"
              style="
                width: 100%;
                padding: 5px 20px 10px 20px;
                border: none;
                height: 200px;
              "
            >
              <el-table-column label="指标名称" prop="key"> </el-table-column>
              <el-table-column property="alarmRule" label="alarmRule">
                <el-table-column property="max" label="最大值">
                </el-table-column>
                <el-table-column property="min" label="最小值">
                </el-table-column>
              </el-table-column>
              <el-table-column property="validRule" label="validRule">
                <el-table-column property="max" label="最大值">
                </el-table-column>
                <el-table-column property="min" label="最小值">
                </el-table-column>
              </el-table-column>
              <el-table-column property="unit" label="单位"></el-table-column>
            </el-table>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog
      v-model="centerDialogVisible2"
      :title='ruleForm.name==""?"新增设备类型":"修改设备类型"'
      align-center
      style="max-width: 39%"
    >
    <el-divider></el-divider>
      <el-form label-width="100px" :model="ruleForm" style="max-width: 700px">
        <el-form-item label="类型名称">
          <el-input v-model="ruleForm.name" required></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item label="协议名称">
          <el-input v-model="ruleForm.protocol.name"></el-input>
        </el-form-item>
        <div class="sp9">协议详情</div>
        <div class="overFlowX" style="max-height: 200px">
          <el-form-item
            v-for="(item, index) in ruleForm.protocol.key"
            :key="index"
          >
            <div class="marginR2 BS WH17 edgeDisInter">
              <div class="commonFont">key{{ index + 1 }}</div>
              <el-input v-model="item.originalKey">
                <template #prepend>originalKey</template>
              </el-input>
              <el-input v-model="item.analyticKey" class="marginT1">
                <template #prepend>analyticKey</template>
              </el-input>
              <el-input v-model="item.unit" class="marginT1">
                <template #prepend>unit</template>
              </el-input>
              <div class="marginT1 btp-top">
                <el-button type="primary" @click="addProtocol">添加</el-button>
                <el-button type="danger" @click="removeProtocol(item, index)"
                  >删除</el-button
                >
              </div>
            </div>
          </el-form-item>
        </div>
        <div class="sp8">传感器</div>
        <div class="overFlowX marginT1" style="max-height: 200px">
          <el-form-item v-for="(item, index) in ruleForm.sensors" :key="index">
            <div class="marginR2 BS WH16 edgeDisInter">
              <div class="commonFont">sensors{{ index + 1 }}</div>
              <el-input v-model="item.code">
                <template #prepend>code</template>
              </el-input>
              <el-input v-model="item.name" class="marginT1">
                <template #prepend>name</template>
              </el-input>
              <div class="marginT1 btp-top">
                <el-button type="primary" @click="addSensors">添加</el-button>
                <el-button type="primary" @click="sensorsDetails(index)"
                  >详情</el-button
                >
                <el-button type="danger" @click="removeSensors(item, index)"
                  >删除</el-button
                >
              </div>
            </div>
          </el-form-item>
        </div>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible2 = false">取消</el-button>
          <el-button type="primary" @click="createType"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog
      v-model="centerDialogVisible3"
      title="传感器详情"
      width="30%"
      align-center
    >
      <el-divider></el-divider>
      <el-form v-for="(item1, index1) in detailF" :key="index1">
        <div>
          <div class="marginT1 BS edgeDisInter2">
            <span>{{ item1.key }}</span>
            <div class="marginT1">
              <el-input v-model="item1.key" style="width: 9rem">
                <template #prepend>key</template>
              </el-input>
              <el-input
                v-model="item1.unit"
                style="width: 11rem"
                class="marginL"
              >
                <template #prepend>unit</template>
              </el-input>
              <el-input
                v-model="item1.alarmRule.max"
                style="width: 12rem"
                class="marginT1"
              >
                <template #prepend>alarmRuleMax</template>
              </el-input>
            </div>
            <div class="marginT1">
              <el-input v-model="item1.alarmRule.min" style="width: 200px">
                <template #prepend>alarmRuleMin</template>
              </el-input>
              <el-input
                v-model="item1.validRule.max"
                style="width: 200px"
                class="marginL"
              >
                <template #prepend>validRuleMax</template>
              </el-input>
            </div>
            <div class="marginT1">
              <el-input v-model="item1.validRule.min" style="width: 200px">
                <template #prepend>validRuleMin</template>
              </el-input>
            </div>
          </div>
        </div>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible3 = false">取消</el-button>
          <el-button type="primary" @click="addSensorsDetail"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {
  getTypeData,
  createTypeData,
  updateTypeData,
} from "../../api/production/typeData";
import { ElMessage } from "element-plus";
import { ref, reactive, onMounted } from "vue";
let tableData = ref([]);
let searchInput = ref();
let total = ref();
let protocolTable = ref([]);
let protocolTitle = ref();
let tableDate1 = ref();
let ruleForm = ref({name:""});
let detailF = ref();
let sensorindex = ref();
let judgeSig = ref();
let centerDialogVisible = ref(false);
let centerDialogVisible1 = ref(false);
let centerDialogVisible2 = ref(false);
let centerDialogVisible3 = ref(false);
let payLoad = reactive({
  name: "",
  pageSize: "10",
  currPage: "1",
});
const getData = () => {
  let payLoadR = {
    name: searchInput.value,
    pageSize: payLoad.pageSize,
    currPage: payLoad.currPage,
  };
  getTypeData(payLoadR).then((res) => {
    total.value = res.data.data.total;
    tableData.value = res.data.data.pageData;
  });
};
const handleSizeChange = (e) => {
  payload.pageSize = e;
  getData();
};
const handleCurrentChange = (e) => {
  payload.currPage = e;
  getData();
};
const protocolNews = (x, y) => {
  protocolTable.value = y.protocol.key;
  protocolTitle.value = y.name + "详情";
  centerDialogVisible.value = true;
};
const sensorsNews = (x, y) => {
  tableDate1.value = [y];
  centerDialogVisible1.value = true;
};
const handleEdit = (m, x, y) => {
  if (m == "edit") {
    ruleForm.value = JSON.parse(JSON.stringify(tableData.value[x]));
    judgeSig = "edit";
    centerDialogVisible2.value = true;
  } else if (m == "add") {
    judgeSig = "add";
    ruleForm.value = {
      name: "",
      desc: "",
      protocol: {
        key: [
          {
            analyticKey: "",
            originalKey: "",
            unit: "",
          },
        ],
        name: "",
      },
      sensors: [
        {
          code: "",
          name: "",
          detectionValue: [
            {
              key: "",
              unit: "",
              alarmRule: {
                min: "",
                max: "",
              },
              validRule: {
                min: "",
                max: "",
              },
            },
          ],
        },
      ],
      _id: "",
    };
    centerDialogVisible2.value = true;
  }
};
const addSensors = () => {
  ruleForm.value.sensors.push({
    code: "",
    name: "",
    detectionValue: [
      {
        key: "",
        unit: "",
        alarmRule: {
          min: "",
          max: "",
        },
        validRule: {
          min: "",
          max: "",
        },
      },
    ],
  });
};
const addProtocol = () => {
  ruleForm.value.protocol.key.push({
    originalKey: "",
    analyticKey: "",
    unit: "",
  });
};
const removeSensors = (x, y) => {
  if (ruleForm.value.sensors.length != 1) {
    ruleForm.value.sensors.splice(y, 1);
  }
};
const removeProtocol = (x, y) => {
  if (ruleForm.value.protocol.key.length != 1) {
    ruleForm.value.protocol.key.splice(y, 1);
  }
};
const sensorsDetails = (x) => {
  detailF.value = JSON.parse(
    JSON.stringify(ruleForm.value.sensors[x].detectionValue)
  );
  sensorindex.value = x;
  centerDialogVisible3.value = true;
};
const addSensorsDetail = () => {
  ruleForm.value.sensors[sensorindex.value].detectionValue = detailF.value;
  centerDialogVisible3.value = false;
};
const createType = () => {
  if (judgeSig == "add") {
    createTypeData(ruleForm.value).then((res) => {
      if (res.data.code == 200) {
        ElMessage.success("添加成功");
        getData();
      } else {
        ElMessage.error("添加失败");
      }
    });
  } else if (judgeSig == "edit") {
    updateTypeData(ruleForm.value).then((res) => {
      if (res.data.code == 200) {
        ElMessage.success("修改成功");
        getData();
      } else {
        ElMessage.error("修改失败");
      }
    });
  }
  centerDialogVisible2.value = false;
};
onMounted(() => {
  getData();
});
</script>

<style lang="less" scoped>
.wBox {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bodyTop {
  width: 98.8%;
  height: 10vh;
  background-color: #fff;
  margin-top: 10px;
  box-shadow: 0 0px 12px 0px #d9d9d9;
  display: flex;
  align-items: center;
}

.bodyBottom {
  width: 98.8%;
  flex: auto;
  height: 0;
  position: relative;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #fff;
  box-shadow: 0 0px 16px 0px #d9d9d9;
  box-sizing: border-box;
  padding: 15px;
}

/deep/.el-dialog__body {
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 0px;
}
div::-webkit-scrollbar {
  width: 4px;
}
div::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  opacity: 0.2;
}
div::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
}
.el-table {
  --el-table-header-bg-color: #e7f4ff !important;
}
/deep/.table_header {
  height: 60px;
}
.overFlowX{
    overflow-y: scroll;
}
</style>
