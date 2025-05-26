<script setup lang="ts">
</script>

<template>
  asd
  <div class="row justify-content-between align-items-center col-12 mt-4">
    <div
      :class="{ addBtnMb: rwdSize, 'addBtnPc col-2 text-end': !rwdSize }"
      style="margin-top: 5px; margin-right: -12px"
    >
      <el-button type="primary"
        >{{ add
        }}<el-icon class="ms-1">
          <CirclePlus /> </el-icon
      ></el-button>
    </div>
    <div :class="{ 'col-10': !rwdSize }"></div>
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
