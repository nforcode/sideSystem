<template>
  <div class="search-bar">
    <el-row align="middle" justify="space-between">
      <!-- 搜尋欄 -->
      <el-col :span="24" :md="4" style="display: flex">
        <el-tooltip :content="getLabel" placement="top" effect="light">
          <el-select-v2
            class="search-item"
            v-model="searchData"
            :options="searchOptionSet"
            filterable
            default-first-option
            clearable
            :placeholder="`code`"
            popper-class="select-drop"
          />
        </el-tooltip>
        <el-button type="primary" class="search-item" @click="filterData">
          <el-icon>
            <Search />
          </el-icon>
          filter</el-button
        >
      </el-col>
      <el-col :span="24" :md="4" :push="3" style="display: flex">
        <el-button type="primary" @click="addData">
          add
          <el-icon class="ms-1">
            <CirclePlus />
          </el-icon> </el-button
      ></el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, watch } from 'vue'

interface SearchOption {
  code: string | number
  name: string
}
const props = defineProps<{
  searchVal: string
  searchOption: SearchOption[]
}>()
const emit = defineEmits<{
  (e: 'search', value: string | null): void
  (e: 'addData', value: boolean): void
}>()

const searchData = ref(null)

const searchOptionSet = computed(() => {
  if (Array.isArray(props.searchOption) && props.searchOption.length > 0) {
    return props.searchOption.map((option) => ({
      value: option.code,
      label: option.name,
    }))
  }
  return []
})
const getLabel = computed(() => {
  const matchedOption = searchOptionSet.value.find((e) => {
    return e.value === searchData.value
  })
  return matchedOption ? matchedOption.label : null
})
function filterData() {
  emit('search', searchData.value)
}
function addData() {
  emit('addData', true)
}
watch(
  () => props.searchVal,
  (val) => {
    searchData.value = val
  }
)
</script>

<style scoped>
.search-bar {
  margin-top: 24px;
  margin-bottom: 20px;
}

.search-item {
  margin-right: 10px;
}

/* .select-drop> :global(.el-vl__window.el-select-dropdown__list) {
  width: 352px !important;
} */
</style>
