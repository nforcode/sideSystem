<template>
  <nav class="navbar" style="box-shadow: 0px 14px 24px #e4e4e4">
    <div class="" style="position: relative; height: 60px">
      <div class="navbar-brand">
        <router-link to="/index">
          <img
            src="/logo.png"
            alt=""
            style="
              position: absolute;
              max-height: 100%;
              top: 10px;
              left: 10px;
              transform: scale(0.65);
              transform-origin: top left;
            "
          />
        </router-link>
        <!-- <span class="version">v2.5.2.0</span> -->
      </div>
      <ul class="nav" style="display: flex; top: 10px">
        <li class="topbar-item ms-2 text-muted rwd-md-hide">
          <!-- {{ this.$store.state.user.emp_code }} (<span>{{ this.$store.state.user.name }}</span>) -->
        </li>
        <li class="topbar-item ms-2">
          <!-- <loading :isLoading="this.$store.getters.getBUlist.length === 0"></loading> -->
          <el-select class="rwd-sm-hide" placeholder="廠區" size="large" />
        </li>
        <li class="topbar-item ms-2">
          <!-- <el-select v-model="getLang" size="large" @change="setLang" class="rwd-sm-hide">
            <el-option value="zhtw" :label="'Lang_op_tw'"></el-option>
            <el-option value="cn" :label="'Lang_op_cn'"></el-option>
            <el-option value="en" :label="'Lang_op_en'"></el-option>
          </el-select> -->
        </li>
        <li class="topbar-item ms-2">
          <el-dropdown trigger="click" style="margin-left: 10px">
            <span class="el-dropdown-link">
              <el-button type="primary" style="height: 40px">
                {{ 'option' }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
              </el-button>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item class="rwd-sm-show" @click="buDialogVisible = true">{{
                  'bu'
                }}</el-dropdown-item>
                <el-dropdown-item class="rwd-sm-show" @click="langDialogVisible = true">{{
                  'language'
                }}</el-dropdown-item>
                <el-dropdown-item @click="openConcurrentUser">{{ 'online_list' }}</el-dropdown-item>
                <el-dropdown-item @click="openSetting">{{ 'userinfo' }}</el-dropdown-item>
                <el-dropdown-item
                  v-if="noisePointPermission || dataTypePermission"
                  :disabled="!AUD"
                  @click="othersVisibleStatus(true)"
                  >{{ 'display' }}</el-dropdown-item
                >
                <el-dropdown-item @click="logoutMethod">{{ 'logout_text' }}</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
</script>

<style scoped>
.navbar-brand {
  display: flex;
  margin-left: -26px;
}

.navbar {
  position: fixed;
  width: 100%;
  /* z-index: 1000; */
  top: 0;
  left: 0;
}

.nav {
  position: fixed;
  right: 25px;
}

.version {
  position: absolute;
  top: 63px;
  left: 20px;
  font-size: 10px;
  color: #888988;
  font-weight: 600;
}

.form-select {
  height: 40px;
}

:deep(.el-button--info.is-plain) {
  height: 40px;
}

.user-option {
  position: fixed;
  top: 63px;
  right: 543px;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
}

.createuser-group > li {
  margin: 5px;
}

.li-object > li {
  left: 100px;
  font-size: 1rem;
}

.li-object > label,
.li-object > .optionSelect {
  display: flex;
}

.li-object > label > span {
  line-height: 35px;
}

.required {
  color: red;

  margin-right: 4px;
}

.btn-wrap {
  margin: 0 auto;
  margin-top: 20px;
  text-align: right;
}

.el-row {
  justify-content: space-between;
}

@media (max-width: 819px) {
  .rwd-sm-hide {
    display: none;
  }
}

@media (min-width: 820px) {
  :deep(.el-dropdown-menu__item.rwd-sm-show) {
    display: none;
  }
}

@media (max-width: 999px) {
  .rwd-md-hide {
    display: none;
  }
}
</style>
