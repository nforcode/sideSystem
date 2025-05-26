<script setup lang="ts">
import { ref, defineProps, watch, nextTick, toRaw } from 'vue'
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
  groupDescription: '',
  id: '',
})
const formVisible = ref(false)
const form = ref<InstanceType<typeof import('element-plus')['ElForm']> | null>(null)
const formRules = {
  groupCode: [{ required: true, message: '請輸入群組代碼', trigger: 'blur' }],
  groupName: [{ required: true, message: '請輸入群組名稱', trigger: 'blur' }],
}
function dialogClose() {
  emit('visibleEmit', false)
}
function confirm() {
  form.value?.validate((valid: any, fields: any) => {
    // console.log(valid);
    if (valid) {
      props.sendFunction(formData.value)
    } else {
      console.log('groupCode:', formData.value.groupCode)
      console.log('groupName:', formData.value.groupName)
      console.log('enable:', formData.value.enable)
      console.log('groupDescription:', formData.value.groupDescription)
      console.log('驗證錯誤欄位 fields:', fields)
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
      console.log(formData.value)
      nextTick(() => {
        form.value?.clearValidate()
      })
    } else {
      Object.assign(formData.value, {
        groupCode: '',
        groupName: '',
        enable: true,
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
