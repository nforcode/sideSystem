<template>
  <div class="common-layout">
    <el-container style="height: 100vh">
      <el-header style="height: 60px">
        <headerBar />
      </el-header>

      <el-container>
        <el-aside style="position: fixed; top: 62px; width: 10vw">
          <sideMenu />
        </el-aside>

        <el-main style="position: fixed; top: 62px; left: 10vw; width: 89vw">
          <el-tabs
            v-model="activeTab"
            type="border-card"
            closable
            @tab-remove="removeTab"
            @tab-click="switchTab"
          >
            <el-tab-pane
              v-for="(tab, index) in tabList"
              :key="index"
              :label="tab.title"
              :name="tab.path"
              :closable="tab.closable"
            >
            </el-tab-pane>
          </el-tabs>
          <div class="main-frame">
            <!-- <router-view v-slot="{ Component }">
              <keep-alive :include="cachedComponentNames" v-if="Component">
                <component :is="Component" />
              </keep-alive>
            </router-view> -->
            <router-view v-slot="{ Component }">
              <keep-alive>
                <component :is="Component" />
              </keep-alive>
            </router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<style scoped src="./style.css"></style>
<script setup lang="ts">
import headerBar from '@/components/headerBar.vue'
import sideMenu from '@/components/sideMenu.vue'
import { mainMenu, MenuItem } from '@/components/menu'
import { ref, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// const isSmallScreen = ref(false)
// const menuOpen = ref(true)
// const rwdMenuClose = ref(false)

const router = useRouter()
const route = useRoute()

// 頁簽列表
const tabList = ref([{ title: '首頁', path: '/index', closable: false }])
const activeTab = ref('/index')
// 你可以根據 tabList 動態產生要緩存的 component 名稱
const cachedComponentNames = computed(
  () => tabList.value.map((tab) => tab.code) // 假設 code 對應 component 的 name
)
// 切換頁簽時更新路由
function switchTab(tab: any) {
  router.push(tab.paneName)
}

// 關閉頁簽
function removeTab(targetPath: string) {
  const tab = tabList.value.find((t) => t.path === targetPath)
  // 阻止刪除首頁
  if (tab?.closable === false) return

  const index = tabList.value.findIndex((t) => t.path === targetPath)
  tabList.value.splice(index, 1)

  if (activeTab.value === targetPath) {
    const next = tabList.value[index] || tabList.value[index - 1]
    if (next) {
      router.push(next.path)
    }
  }
}
function findTitleByRouteName(name: string | undefined): string | null {
  if (!name) return null

  const stack = [...mainMenu]
  while (stack.length) {
    const item = stack.pop()!
    if (item.route === name) {
      return item.title
    }
    if (item.subitem) {
      stack.push(...item.subitem)
    }
  }

  return null
}

// const currentTitle = computed(() => findTitleByRouteName(route.params.pageName as string))
// 偵測路由變化，新增頁簽
watch(
  () => route.path,
  (newPath) => {
    const exist = tabList.value.find((t) => t.path === newPath)
    if (!exist && newPath !== '/') {
      tabList.value.push({
        title: findTitleByRouteName(route.path as string) || '404 Not Found',
        path: newPath,
        closable: true,
      })
    }
    activeTab.value = newPath
  },
  { immediate: true }
)
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: #2c3e50;
}

nav {
  /* padding: 25px; */

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
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

:deep(.el-main) {
  padding: initial;
}

:deep(#tab-\/index i) {
  display: none;
}

:deep(.el-tabs__content) {
  height: 85vh;
  /* display: none; */
}

.main-frame {
  position: absolute;
  top: 40px;
  padding: 10px;
  /* border: 1px solid #E0E1E4;
 height: 86vh;
 margin-top: -1px;
 border-top: none; */
}
</style>
