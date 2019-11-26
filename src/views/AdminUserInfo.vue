<template>
  <div>
    <top-bar v-show="true"/>
    <h1>AdminUserInfo</h1>
  </div>
</template>

<script>
import TopBar from '@/views/TopBar'
export default {
  components: {
    [TopBar.name]: TopBar
  }
}
</script>