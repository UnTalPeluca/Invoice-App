<template>
  <NavBar/>
  <div id="view-wrapper">
    <router-view v-slot="{ Component }">
      <transition name="page">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
  <div v-if="showBlur" id="bg-blur">
    <Loading/>
  </div>
</template>

<script>
import NavBar from "@/layout/NavBar.vue"
import Loading from "@/components/Loading.vue"

export default{
  data() {
    return{
      blur: Boolean
    }
  },
  components:{
    NavBar,
    Loading
  },
  computed:{
    showBlur() {
      return this.blur
    },
    hideForm() {
      this.$store.dispatch('setShowEdit', false)
      this.$store.dispatch('setInvoiceCreate', false)
    }
  },
  watch: {
  '$store.state.blur': function() {
    this.blur = this.$store.state.blur
  }
}

}
</script>

<style lang="scss">
@import '@/styles/_app.scss';

</style>
