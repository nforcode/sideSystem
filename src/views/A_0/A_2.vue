<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import searchBar from '@/components/searchBar.vue'
import { getUserGroupList, createUserGroup, updateUserGroup, deleteUserGroup } from '@/api/A'
import { ElMessage, ElMessageBox } from 'element-plus'
import cuDialog from './A_2/cuDialog.vue'
import type { groupFormdata } from '@/type/user'
import { showSuccess, showError } from '@/components/msgAlert'
const searchData = ref({
  code: null,
})

const apiData = ref({
  totalPage: 2,
  tableData: [],
})

const pageSize = ref(10)
const currentPage = ref(1)
const loading = ref(true)
const groupOption = ref([])
// 顯示在 <el-table> 上的資料
const pagedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return apiData.value.tableData.slice(start, end)
})

onMounted(() => {
  getTableData()
})

function handleCurrentChange(page: number) {
  currentPage.value = page
}

function handleSizeChange(size: number) {
  pageSize.value = size
  currentPage.value = 1 // 重新從第一頁開始
}

function getTableData() {
  loading.value = true
  const data = { groupCode: searchData.value.code }
  getUserGroupList(data)
    .then((res: { status: number; data: any[]; statusText: any }) => {
      if (res.status === 200) {
        if (res.data.length > 0) {
          apiData.value.tableData = res.data
          groupOption.value = res.data.map((item) => {
            return {
              code: item.groupCode,
              name: item.groupName,
            }
          })
        }
      } else {
        showError(res.statusText)
      }
    })
    .catch((error: any) => {
      showError(error)
    })
    .finally(() => {
      loading.value = false
    })
}

function tableValueMap(col: string | number, val: string | number) {
  const map = {
    enable: {
      true: '啟用',
      false: '停用',
    },
  }
  if (map[col]) {
    return map[col][val]
  }
  return val
}

function emitData(value: string | null) {
  searchData.value.code = value
  handleSizeChange(10)
  getTableData()
}

const groupDialogVisible = ref(false)

const groupData = ref({
  groupCode: '',
  groupName: '',
  enable: true,
  groupDescription: '',
  id: '',
})

const groupDialoghandle = ref('')

function handleAdd() {
  openGroupDialog('add')
}
function openGroupDialog(mode: 'add' | 'edit', data: object = {}) {
  groupDialoghandle.value = mode
  groupData.value =
    mode === 'add'
      ? (groupData.value = {
          groupCode: '',
          groupName: '',
          enable: true,
          groupDescription: '',
          id: '',
        })
      : { ...JSON.parse(JSON.stringify(data)) }
  groupDialogVisible.value = true
}

function groupDialogClose() {
  groupDialogVisible.value = false
}

function groupDataSend(data: groupFormdata) {
  if (groupDialoghandle.value === 'add') {
    groupDataCreate(data)
  } else if (groupDialoghandle.value === 'edit') {
    groupDataEdit(data)
  }
}
function groupDataCreate(data: groupFormdata) {
  loading.value = true
  const sendData = {
    groupCode: data.groupCode,
    groupName: data.groupName,
    enable: data.enable,
    groupDescription: data.groupDescription,
  }
  createUserGroup(sendData)
    .then((res: { status: number; data: any[]; statusText: any }) => {
      if (res.status === 201) {
        emitData(null)
        showSuccess('Create Success')
      } else {
        showError(res.statusText)
      }
    })
    .catch((error: any) => {
      showError(error)
    })
    .finally(() => {
      groupDialogClose()
      loading.value = false
    })
}

function handleEdit(row: object) {
  openGroupDialog('edit', row)
}

function groupDataEdit(data: groupFormdata) {
  loading.value = true
  updateUserGroup(data)
    .then((res: { status: number; data: any[]; statusText: any }) => {
      if (res.status === 200) {
        emitData(null)
        showSuccess('Edit Success')
      } else {
        showError(res.statusText)
      }
    })
    .catch((error: any) => {
      showError(error)
    })
    .finally(() => {
      groupDialogClose()
      loading.value = false
    })
}

function handleDel(row: { groupName: string }) {
  ElMessageBox.confirm(`確定要刪除 ${row.groupName}？`, '使用者群組 - Delete', {
    confirmButtonText: '確認刪除',
    cancelButtonText: '取消',
    type: 'error',
  })
    .then(() => {
      groupDataDelete(row)
    })
    .catch((action: string) => {
      ElMessage({
        type: 'info',
        message: action === 'cancel' ? '取消刪除' : '取消刪除',
      })
    })
}

function groupDataDelete(row: object) {
  loading.value = true
  deleteUserGroup(row)
    .then((res) => {
      if (res.status === 200) {
        emitData(null)
        searchData.value.code = null
        showSuccess('Delete Success')
      } else {
        showError(res.statusText)
      }
    })
    .catch((error) => {
      showError(error)
    })
    .finally(() => {
      groupDialogClose()
      loading.value = false
    })
}
</script>

<template>
  <div class="frameContainer">
    <searchBar
      :searchVal="searchData"
      :searchOption="groupOption"
      @search="emitData"
      @addData="handleAdd"
    />
    <div style="max-height: 680px">
      <!-- ------------------------------------ -->
      <el-pagination
        style="margin-bottom: 10px"
        background
        layout="prev, pager, next, jumper"
        :total="apiData.tableData.length"
        :current-page="currentPage"
        :page-size="pageSize"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
      <el-table v-loading="loading" :data="pagedData" style="width: 100%" height="451" stripe>
        <el-table-column prop="groupCode" label="groupCode" :min-width="160" />
        <el-table-column prop="groupName" label="groupName" :min-width="160" />
        <el-table-column prop="enable" label="enable" :min-width="80">
          <template #default="scope">
            <el-tag
              v-if="scope.row.enable !== null"
              effect="dark"
              round
              size="small"
              :type="scope.row.enable ? 'success' : 'danger'"
            >
              {{ tableValueMap('enable', scope.row.enable) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="groupDescription" label="groupDescription" :min-width="160" />
        <el-table-column fixed="right" align="center" label="tableOp" min-width="150">
          <template #default="scope">
            <el-button-group>
              <el-button type="primary" size="small" @click="handleEdit(scope.row)">
                edit
              </el-button>
              <el-button type="danger" size="small" @click="handleDel(scope.row)"> del </el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top: 20px"
        background
        layout="prev, pager, next, jumper"
        :total="apiData.tableData.length"
        :current-page="currentPage"
        :page-size="pageSize"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>
    <!--新增編輯頁 ------------------------------------------------------------------------ -->
    <cuDialog
      @visibleEmit="groupDialogClose"
      :dialogVisible="groupDialogVisible"
      :dialogTitle="groupDialoghandle"
      :dialogFormData="groupData"
      :sendFunction="groupDataSend"
    >
    </cuDialog>
  </div>
</template>



<style scoped>
.searchbar {
  display: flex;
  margin-bottom: 20px;
}

.block,
.searchitem {
  margin-right: 10px;
}

:deep(.el-card.move) {
  cursor: move;
}
</style>
