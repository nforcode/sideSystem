<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import searchBar from '@/components/searchBar.vue'
import { getUserList, createUser, updateUser, deleteUser } from '@/api/A'
import { ElMessage, ElMessageBox } from 'element-plus'
import cuDialog from '@/views/A_0/A_3/cuDialog.vue'
import type { userFormdata } from '@/type/user'
import { showSuccess, showError } from '@/components/msgAlert'
import SHA256 from 'crypto-js/sha256'

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
const userOption = ref([])
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
  const data = { userCode: searchData.value.code }
  getUserList(data)
    .then((res: { status: number; data: userFormdata[]; statusText: string }) => {
      if (res.status === 200) {
        apiData.value.tableData = res.data
        userOption.value = res.data.map((item) => {
          return {
            code: item.userCode,
            name: item.userName,
          }
        })
      } else {
        showError(res.statusText)
      }
    })
    .catch((error: string) => {
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

const userDialogVisible = ref(false)

const userData = ref({
  userCode: '',
  userName: '',
  password: '',
  enable: true,
  groupList: [],
  userDescription: '',
  id: '',
})

const userDialoghandle = ref('')

function handleAdd() {
  openUserDialog('add')
}
function openUserDialog(mode: 'add' | 'edit', data: object = {}) {
  userDialoghandle.value = mode
  userData.value =
    mode === 'add'
      ? (userData.value = {
          userCode: '',
          userName: '',
          password: '',
          enable: true,
          groupList: [],
          userDescription: '',
          id: '',
        })
      : {
          ...JSON.parse(JSON.stringify(data)),
          password: '',
        }
  userDialogVisible.value = true
}

function userDialogClose() {
  userDialogVisible.value = false
}

function hashPassword(rawPassword: string) {
  return SHA256(rawPassword).toString()
}

function userDataSend(data: userFormdata) {
  if (userDialoghandle.value === 'add') {
    userDataCreate(data)
  } else if (userDialoghandle.value === 'edit') {
    userDataEdit(data)
  }
}
function userDataCreate(data: userFormdata) {
  loading.value = true
  const sendData = {
    userCode: data.userCode,
    userName: data.userName,
    password: hashPassword(data.password),
    enable: data.enable,
    groupList: data.groupList,
    userDescription: data.userDescription,
  }
  createUser(sendData)
    .then((res: { status: number; data: userFormdata[]; statusText: string }) => {
      if (res.status === 201) {
        emitData(null)
        showSuccess('Create Success')
      } else {
        showError(res.statusText)
      }
    })
    .catch((error: string) => {
      showError(error)
    })
    .finally(() => {
      userDialogClose()
      loading.value = false
    })
}

function handleEdit(row: object) {
  openUserDialog('edit', row)
}

function userDataEdit(data: userFormdata) {
  loading.value = true
  updateUser(data)
    .then((res: { status: number; data: userFormdata[]; statusText: string }) => {
      if (res.status === 200) {
        emitData(null)
        showSuccess('Edit Success')
      } else {
        showError(res.statusText)
      }
    })
    .catch((error: string) => {
      showError(error)
    })
    .finally(() => {
      userDialogClose()
      loading.value = false
    })
}

function handleDel(row: { userName: string }) {
  ElMessageBox.confirm(`確定要刪除 ${row.userName}？`, '使用者 - Delete', {
    confirmButtonText: '確認刪除',
    cancelButtonText: '取消',
    type: 'error',
  })
    .then(() => {
      userDataDelete(row)
    })
    .catch((action: string) => {
      ElMessage({
        type: 'info',
        message: action === 'cancel' ? '取消刪除' : '取消刪除',
      })
    })
}

function userDataDelete(row: object) {
  loading.value = true
  deleteUser(row)
    .then((res) => {
      if (res.status === 200) {
        emitData(null)
        searchData.value.code = null
        showSuccess('Delete Success')
      } else {
        showError(res.statusText)
      }
    })
    .catch((error: string) => {
      showError(error)
    })
    .finally(() => {
      userDialogClose()
      loading.value = false
    })
}
</script>

<template>
  <div class="frameContainer">
    <searchBar
      :searchVal="searchData"
      :searchOption="userOption"
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
        <el-table-column prop="userCode" label="userCode" :min-width="160" />
        <el-table-column prop="userName" label="userName" :min-width="160" />
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
        <el-table-column prop="userDescription" label="userDescription" :min-width="160" />
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
      @visibleEmit="userDialogClose"
      :dialogVisible="userDialogVisible"
      :dialogTitle="userDialoghandle"
      :dialogFormData="userData"
      :sendFunction="userDataSend"
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
