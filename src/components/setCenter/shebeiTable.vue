<template>
  <div class="wBox">
    <div class="bodyTop">
      <div style="margin: 0 10px 0 50px; font-size: 15px">设备表</div>
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
        @click="handleEditAndDelete('add')"
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
          <el-table-column label="设备名称" align="center" width="width">
            <template v-slot="scoped">
              <div>
                {{ tableData[scoped.$index].name }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" align="center" width="width">
            <template v-slot="scoped">
              <div>
                {{ tableData[scoped.$index].createTime }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="更新时间" align="center" width="width">
            <template v-slot="scoped">
              <div>
                {{ tableData[scoped.$index].updateTime }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="设备类型ID" align="center" width="width">
            <template v-slot="scoped">
              <div>
                {{ tableData[scoped.$index].deviceTypeId }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="编码" align="center" width="width">
            <template v-slot="scoped">
              <div>
                {{ tableData[scoped.$index].code }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="设备图片" align="center" width="width">
            <template v-slot="scoped">
              <div>
                <img :src="tableData[scoped.$index].img" alt="加载中" />
              </div>
            </template>
          </el-table-column>
          <el-table-column label="状态" align="center" width="width">
            <template v-slot="scoped">
              <div>
                {{ tableData[scoped.$index].status }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="自定义" align="center" width="width">
            <template v-slot="scoped">
              <div v-if="tableData[scoped.$index].isCustom == true">
                {{ "是" }}
              </div>
              <div v-else>
                {{ "否" }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="sensors"
            label="传感器"
            align="center"
            width="width"
          >
            <template v-slot="scope">
              <el-button
                text
                type="primary"
                @click="sensorsNews(scope.$index, scope.row)"
                ><el-icon><MessageBox /></el-icon>传感器详情</el-button
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="width">
            <template v-slot="scope">
              <div style="display: flex">
                <el-button
                  class="btnText"
                  text
                  type="primary"
                  @click="handleEditAndDelete('edit', scope.$index, scope.row)"
                  ><el-icon><EditPen /></el-icon>编辑</el-button
                >
                <el-button
                  class="btnText"
                  text
                  type="primary"
                  @click="
                    handleEditAndDelete('delete', scope.$index, scope.row)
                  "
                  style="margin-left: -1rem"
                  ><el-icon><Delete /></el-icon>删除</el-button
                >
              </div>
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
      title="传感器"
      width="40%"
      align-center
      style="height: 40%"
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
                height: 180px;
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
      v-model="centerDialogVisible1"
      :title="titleRef"
      width="40%"
      align-center
    >
      <el-divider></el-divider>
      <el-form label-width="100px" :model="ruleForm" style="max-width: 700px">
        <el-form-item label="设备图片">
          <el-upload class="avatar-uploader btp" :show-file-list="false">
            <img v-if="ruleForm.img" :src="ruleForm.img" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="设备名称">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="ruleForm.desc" />
        </el-form-item>
        <el-form-item label="设备类型" v-if="optionR1">
          <el-select v-model="ruleForm.deviceTypeId" clearable>
            <el-option
              v-for="(item, index) in optionR1"
              :key="index"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="编码">
          <el-input v-model="ruleForm.code" />
        </el-form-item>
        <el-form-item label="状态" class="btp">
          <div class="mb-2 flex items-center text-sm">
            <el-radio-group class="ml-4" v-model="ruleForm.status">
              <el-radio v-model="ruleForm.status" label="正常" size="large"
                >正常</el-radio
              >
              <el-radio v-model="ruleForm.status" label="离线" size="large"
                >离线</el-radio
              >
            </el-radio-group>
          </div>
        </el-form-item>
        <el-form-item label="自定义" v-model="ruleForm.isCustom">
          <el-switch v-model="ruleForm.isCustom" active-color="#4D70FF">
            自定义
          </el-switch>
          <div v-if="ruleForm.isCustom">
            <el-button type="primary" class="marginR1" @click="addSensors"
              ><el-icon><Plus /></el-icon>添加</el-button
            >
          </div>
        </el-form-item>
        <div class="sp8" v-if="ruleForm.isCustom">传感器</div>
        <div
          v-if="ruleForm.isCustom"
          class="overFlowX"
          style="max-height: 200px"
        >
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
                <el-button type="primary" @click="sensorsDetails(index)"
                  >编辑</el-button
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
          <el-button @click="closeWind1">取消</el-button>
          <el-button type="primary" @click="updateData"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog
      v-model="centerDialogVisible2"
      title="传感器详情"
      width="30%"
      align-center
      style="max-height: 60%; overflow-x: auto"
    >
      <el-divider></el-divider>
      <el-form v-for="(item1, index1) in detailF" :key="index1">
        <div>
          <div class="marginT1 BS edgeDisInter2">
            <span>{{ item1.key }}</span>
            <div class="marginT1">
              <el-input v-model="item1.key" style="width: 120px">
                <template #prepend>key</template>
              </el-input>
              <el-input
                v-model="item1.unit"
                style="width: 120px"
                class="marginL"
              >
                <template #prepend>unit</template>
              </el-input>
              <el-input
                v-model="item1.alarmRule.max"
                style="width: 200px"
                class="marginL"
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
          <el-button @click="centerDialogVisible2 = false">取消</el-button>
          <el-button type="primary" @click="addSensorsDetail"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {
  getConfData,
  updateConfData,
  createConfData,
  deleteConfData,
  getTypeData,
} from "../../api/production/typeData";
import { ElMessage } from "element-plus";
let tableData = ref([]);
let total = ref();
let searchSelect = ref();
let searchInput = ref();
let centerDialogVisible = ref(false);
let centerDialogVisible1 = ref(false);
let centerDialogVisible2 = ref(false);
let payload = reactive({
  deviceTypeId: "",
  name: "",
  pageSize: "10",
  currPage: "1",
});
let ruleForm = ref();
let tableDate1 = ref([]);
let detailF = ref();
let sensorindex = ref();
let titleRef = ref();
let optionR = ref();
let optionR1: any = ref([]);
const getData = () => {
  let payLoadR = {
    deviceTypeId: searchSelect.value,
    name: searchInput.value,
    pageSize: payload.pageSize,
    currPage: payload.currPage,
  };
  getConfData(payLoadR).then((res) => {
    total.value = res.data.data.total;
    tableData.value = res.data.data.pageData;
  });
  getTypeData({ pageSize: "1000", currPage: "1" }).then((res) => {
    optionR1.value = []
    res.data.data.pageData.forEach((i) => {
      optionR1.value.push({
        label: i.name,
        value: i._id,
      });
    });
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
const sensorsNews = (x, y) => {
  centerDialogVisible.value = true;
  tableDate1.value = [y];
};
const handleEditAndDelete = (x, y, z) => {
  if (x == "edit") {
    titleRef.value = "修改设备类型";
    ruleForm.value = JSON.parse(JSON.stringify(tableData.value[y]));
    optionR.value = x;
    centerDialogVisible1.value = true;
  } else if (x == "add") {
    titleRef.value = "增加设备类型";
    optionR.value = x;
    ruleForm.value = {
      name: "",
      deviceTypeId: "",
      code: "",
      isValid: true, // 不展示 也不能修改
      status: "正常",
      isCustom: false, // 默认是不自动 变true就显示sensors
      desc: "",
      loc: {},
      img: "",
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
    };
    centerDialogVisible1.value = true;
  } else if (x == "delete") {
    deleteConfData(tableData.value[y]._id).then((res) => {
      if (res.data.code == 200) {
        ElMessage.success("删除成功");
        getData();
      } else {
        ElMessage.error("删除失败");
      }
    });
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
const removeSensors = (x, y) => {
  if (ruleForm.value.sensors.length != 1) {
    ruleForm.value.sensors.splice(y, 1);
  }
};
const addSensorsDetail = () => {
  ruleForm.value.sensors[sensorindex.value].detectionValue = detailF.value;
  centerDialogVisible2.value = false;
};
const closeWind1 = () => {
  ruleForm.value = {};
  centerDialogVisible1.value = false;
};
const sensorsDetails = (x) => {
  detailF.value = JSON.parse(
    JSON.stringify(ruleForm.value.sensors[x].detectionValue)
  );
  sensorindex.value = x;
  centerDialogVisible2.value = true;
};
const updateData = () => {
  let ruleFormR = {
    _id: ruleForm.value._id,
    code: ruleForm.value.code,
    createTime: ruleForm.value.createTime,
    desc: ruleForm.value.desc,
    deviceTypeId: ruleForm.value.deviceTypeId,
    deviceTypeName: ruleForm.value.deviceTypeName,
    img: ruleForm.value.img,
    isCustom: ruleForm.value.isCustom,
    isValid: ruleForm.value.isValid,
    name: ruleForm.value.name,
    sensors: ruleForm.value.sensors,
    status: ruleForm.value.status,
    updateTime: ruleForm.value.updateTime,
  };
  if (optionR.value === "edit") {
    updateConfData(ruleFormR).then((res) => {
      centerDialogVisible1.value = false;
      getData();
    });
  } else if (optionR.value === "add") {
    createConfData(ruleFormR).then((res) => {
      if (res.data.code == 200) {
        ElMessage.success("添加成功");
      } else {
        ElMessage.error("添加失败");
      }
      centerDialogVisible1.value = false;
      getData();
    });
  }
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
.el-form::-webkit-scrollbar-thumb {
  border-radius: 10px; /*滚动条的圆角*/
  background-color: rgb(192, 190, 190); /*滚动条的背景颜色*/
}
.el-table {
  --el-table-header-bg-color: #e7f4ff !important;
}
/deep/.table_header {
  height: 80px;
}
.avatar-uploader {
  border: 1px dashed #d9d9d9b0;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 85px;
  height: 85px;
}
.btp {
  display: flex;
  justify-content: center;
}
.overFlowX {
  overflow-y: scroll;
}
</style>
