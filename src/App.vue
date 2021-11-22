<template>
  <NavBar/>
  <div id="view-wrapper">
    <router-view v-slot="{ Component }">
      <transition name="page">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
  <div @click="hideForm" v-if="showBlur" id="bg-blur">
    <Loading/>
  </div>
</template>

<script>
import NavBar from "@/layout/NavBar.vue"
import Loading from "@/components/Loading.vue"

export default{
  components:{
    NavBar,
    Loading
  },
  computed:{
    showBlur() {
      return this.$store.state.blur
    },
    hideForm() {
      console.log("jejejeje")
      this.$store.dispatch('setShowEdit', false)
      this.$store.dispatch('setInvoiceCreate', false)
    }
  },

}
</script>

<style lang="scss">
@import '@/styles/_app.scss';
</style>
