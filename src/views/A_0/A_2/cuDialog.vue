<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import type { groupFormdata } from '@/type/user'

const props = defineProps<{
  dialogVisible: boolean
  dialogTitle: string
  dialogFormData: groupFormdata
  sendFunction: (data: groupFormdata) => void
}>()
const emit = defineEmits<{
  (e: 'visibleEmit', value: boolean): void
}>()

const loading = ref(true)
const formTitle = ref('')

const formData = ref<groupFormdata>({
  groupCode: '',
  groupName: '',
  enable: true,
  userList: [],
  groupDescription: '',
  id: '',
})
const formVisible = ref(false)
const form = ref<InstanceType<typeof import('element-plus')['ElForm']> | null>(null)
const formRules = {
  groupCode: [
    {
      required: true,
      message: '請輸入群組代碼',
      trigger: ['blur', 'change'],
      pattern: /^[a-zA-Z0-9_-]{1,25}$/,
    },
  ],
  groupName: [
    {
      required: true,
      message: '請輸入群組名稱',
      trigger: ['blur', 'change'],
      pattern: /^[\w\u4e00-\u9fa5\-_() \t]*[\w\u4e00-\u9fa5\-_()]{0,25}$/,
    },
  ],
}
function dialogClose() {
  emit('visibleEmit', false)
}
function confirm() {
  form.value?.validate((valid: boolean) => {
    // console.log(valid);
    if (valid) {
      props.sendFunction(formData.value)
    } else {
      ElMessage({
        showClose: true,
        message: 'format',
        type: 'error',
        duration: 3000,
      })
    }
  })
}
watch(
  () => props.dialogVisible,
  (val) => {
    if (val) {
      loading.value = true
      formTitle.value = props.dialogTitle
      Object.assign(formData.value, props.dialogFormData)
      nextTick(() => {
        form.value?.clearValidate()
      })
    } else {
      Object.assign(formData.value, {
        groupCode: '',
        groupName: '',
        enable: true,
        userList: [],
        groupDescription: '',
        id: '',
      })
    }
    formVisible.value = val
    loading.value = false
  }
)
</script>

<template>
  <el-dialog
    v-model="formVisible"
    :before-close="dialogClose"
    :close-on-click-modal="false"
    :title="`使用者群組-${formTitle}`"
    :z-index="1000"
    width="600"
    align-center
  >
    <div v-loading="loading">
      <el-form
        :model="formData"
        :rules="formRules"
        ref="form"
        label-position="right"
        label-width="auto"
      >
        <el-row :gutter="8">
          <el-col :span="24" :md="12">
            <el-form-item prop="groupCode" label="group code">
              <el-input
                v-model="formData.groupCode"
                style="width: 100%"
                maxlength="25"
                show-word-limit
                :disabled="formTitle === 'edit'"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24" :md="12">
            <el-form-item prop="groupName" label="group name">
              <el-input
                v-model="formData.groupName"
                style="width: 100%"
                maxlength="25"
                show-word-limit
              />
            </el-form-item>
          </el-col>
          <el-col :span="24" :md="12">
            <el-form-item prop="enable" label="enable">
              <el-switch v-model="formData.enable"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="8">
          <el-col :span="24">
            <el-form-item prop="groupDescription" label="Description">
              <el-input
                type="textarea"
                v-model="formData.groupDescription"
                style="width: 100%"
                maxlength="50"
                show-word-limit
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div style="max-height: 680px">
      <!-- ------------------------------------ -->
      <el-pagination
        style="margin-bottom: 10px"
        background
        layout="prev, pager, next, jumper"
        :total="formData.userList.length"
        :current-page="currentPage"
        :page-size="pageSize"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
      <el-table
        v-loading="loading"
        :data="formData.userList"
        style="width: 100%"
        height="451"
        stripe
      >
        <el-table-column prop="groupCode" label="groupCode" :min-width="160" />
        <el-table-column prop="groupName" label="groupName" :min-width="160" />
        <el-table-column fixed="right" align="center" label="tableOp" min-width="150">
          <template #default="scope">
            <el-button-group>
              <el-button type="danger" size="small" @click="handleDel(scope.row)"> del </el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top: 20px"
        background
        layout="prev, pager, next, jumper"
        :total="formData.userList.length"
        :current-page="currentPage"
        :page-size="pageSize"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogClose">cancel </el-button>
        <el-button type="primary" @click="confirm">confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
</style>
