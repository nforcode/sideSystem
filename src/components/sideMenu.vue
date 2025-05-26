<template>
  <div id="side" class="ps-3">
    <div id="side_panel" class="panel-group">
      <el-collapse v-model="activeMenu" accordion>
        <el-collapse-item
          v-for="item in mainMenu"
          :key="item.code"
          :name="item.code"
          class="main-menu-item ripple"
        >
          <template #title>
            <el-icon class="mr-1">
              <component :is="item.icon" />
            </el-icon>
            {{ item.title }}
          </template>

          <!-- 第二層子選單 -->
          <ul class="list-group">
            <li v-for="child in item.subitem" :key="child.code" class="list-group-item ripple">
              <router-link v-if="child.visible" :to="child.route">
                <el-icon class="mr-1">
                  <component :is="child.icon" />
                </el-icon>
                {{ child.title }}
              </router-link>
            </li>
          </ul>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { mainMenu } from '@/components/menu'
const activeMenu = ref('') // 當前展開的 menu code
</script>
<style scoped>
/* #adc_defect_manage_title {
  display: none !important;
} */

#side {
  background: #fff;
  overflow: auto;
  /*max-height: 841px;*/
  min-height: 100%;
  /* padding-top: 5%; */
  /* width: 12vw; */
}

#side #side_panel {
  overflow-x: hidden;
  overflow-y: scroll;
  /*max-height: 600px;*/
  padding-right: 2px;
  padding-left: 8px;
  height: 88vh;
}

#side #side_panel::-webkit-scrollbar {
  display: block;
  width: 10px;
}

#side #side_panel::-webkit-scrollbar-track {
  background: transparent;
}

#side #side_panel::-webkit-scrollbar-thumb {
  background: #568ca5;
  border-radius: 10px;
}

#side #side_panel::-webkit-scrollbar-thumb:hover {
  background: #76b7d4;
}

#side_panel a.panel-title,
#side_panel ul li a {
  display: block;
  font-size: 1rem;
}

#side_panel a.panel-title {
  color: #75818b;
  position: relative;
  border-bottom: 1px dashed #ececec;
  /* height: 56px; */
  line-height: 56px;
  padding: 0rem 0.6rem;
}

#side_panel ul li a,
#side_panel ul li a.panel-title {
  /* padding: 0rem 1.6rem 0rem 3.6rem; */
  /* padding: 0rem 1rem 0rem 2.8rem; */
  padding: 0rem 0.5rem 0rem 2rem;
}

#side_panel ul.list-third li a {
  padding: 0rem 1rem 0rem 5rem;
}

#side_panel ul li a.haschild.panel-title {
  border-bottom: none;
}

#side_panel ul {
  padding-left: 0;
}

#side_panel ul li {
  cursor: pointer;
  text-align: left;
  padding: 0;
  border: none;
  /* height: 56px; */
  line-height: 56px;
}

#side_panel ul li a,
#side_panel ul li a.panel-title {
  /* background-color: #ecf5ff; */
  /* ----- */
  /* background-color: #68a9d6;
  color: #fff; */
  background-color: #fff;
  color: #99a3ac;
  border-bottom: 1px solid #eee;
}

/* Ripple effect */

.ripple {
  background-position: center;
  transition: background 0.8s;
}

.ripple:hover {
  background: #92c6e0 radial-gradient(circle, transparent 1%, #92c6e0 1%) center/15000%;
}

.ripple:active {
  background-color: #fff;
  background-size: 100%;
  transition: background 0s;
}

#side_panel a:hover,
#side_panel ul li a.haschild.panel-title:hover {
  /* color: #fff;
  text-shadow: 0px 0px 5px #000;
  background: #438fc3; */
  color: #438fc3;
  /* border-left: 5px solid #438fc3; */
  text-shadow: none;
  background: #eee;
}

#side_panel .panel-title i.fa-chevron-circle-left {
  position: absolute;
  /* right: 7%; */
  right: 7%;
  top: 34%;
}

#side_panel i.el-icon {
  width: 25px;
  height: 20px;
  padding-right: 8px;
  font-size: 1.1rem;
  vertical-align: text-bottom;
}

/*未下拉時的icon*/
a.collapsed i.fa-chevron-circle-left:before {
  content: '\f13a';
}

/* 無子項選中頁面；屬於子項選中頁面 */
#side_panel .panel-title.router-link-active,
#side_panel ul li a.router-link-active {
  color: #438fc3;
  text-shadow: none;
  background: #eee;
  font-weight: bold;
}

/* 最外層有子項且開著項目 */
#side_panel a.haschild.panel-title:not(.collapsed) {
  color: #1c95e8;
  border-left: 5px solid #438fc3;
  font-weight: bold;
}

#side_panel a.haschild.panel-title:not(.collapsed):hover {
  /* color: #fff; */
  color: #1c95e8;
}

/* 內層有子項且開著項目 */
#side_panel ul li a.haschild.panel-title:not(.collapsed) {
  /* color: #fff;
  background: #4a7c9f; */
  color: #1c95e8;
  background: #ffffff;
  font-weight: bold;
  border-left: 5px solid #438fc3;
}

:deep(.main-menu-item .el-collapse-item__header) {
  background-color: #fff;
  color: #99a3ac;
  border-bottom: 1px solid #eee;
  font-size: 1rem;
  line-height: 56px;
  padding: 0 0 0 10px;
  cursor: pointer;
  transition: background 0.3s, color 0.3s;
}

:deep(.main-menu-item .el-collapse-item__header:hover) {
  background-color: #eee;
  color: #438fc3;
}

:deep(.el-collapse-item__content) {
  padding-bottom: 5px;
  background: #e9e9e9;
}
</style>
