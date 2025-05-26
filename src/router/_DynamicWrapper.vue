<template>
  <keep-alive v-if="AsyncComponent">
    <component :is="AsyncComponent" />
  </keep-alive>
  <div v-else-if="!isLoading && !AsyncComponent" class="not-found">
    <h2>🚫 找不到此頁面</h2>
    <p>請確認 URL 是否正確，或此頁面尚未建立。</p>
  </div>
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const AsyncComponent = ref()
const isLoading = ref(false)

watch(
  () => route.params.pageName,
  async (pageName) => {
    isLoading.value = true
    try {
      const prefix = pageName.split('_')[0] + '_0'
      // 手動先 import 一次並取得 component
      const module = await import(`@/views/${prefix}/${pageName}.vue`)
      const loadedComponent = module.default
      await import(`@/views/${prefix}/${pageName}.vue`)
      AsyncComponent.value = defineAsyncComponent(() =>
        import(`@/views/${prefix}/${pageName}.vue`)
      )
    } catch (err) {
      console.error(`❌ 找不到頁面檔案：${pageName}`, err)
      AsyncComponent.value = null
    } finally {
      isLoading.value = false
    }
  },
  { immediate: true }
)
</script>

<style scoped>
.not-found {
  padding: 2rem;
  text-align: center;
  color: #666;
  margin: 0 auto;
}

.not-found h2 {
  font-size: 1.5rem;
  color: #c00;
}
</style>
