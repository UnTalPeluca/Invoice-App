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
  <DeleteInvoice/>
</template>

<script>
import NavBar from "@/layout/NavBar.vue"
import Loading from "@/components/Loading.vue"
import DeleteInvoice from "@/components/DeleteInvoice.vue"

export default{
  data() {
    return{
      blur: Boolean
    }
  },
  components:{
    NavBar,
    Loading,
    DeleteInvoice
  },
  computed:{
    showBlur() {
      return this.blur
    },
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
