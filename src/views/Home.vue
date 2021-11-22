<template>
  <div id="home" class="page-wrapper">
    <InvoiceList/>
    <InvoiceCreate/>
  </div>
</template>

<script>
import ActionBar from "@/components/ActionBar.vue"
import InvoiceList from "@/components/InvoiceList.vue"
import InvoiceCreate from "@/components/InvoiceCreate.vue"

export default {
  name: 'Home',
  data(){
    return{
      data: Object,
    }
  },
  components:{
    ActionBar,
    InvoiceList,
    InvoiceCreate,
  },
  created(){
    
    this.$store.dispatch('setInvoiceCreate', false)
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/views/_home.scss';
.page-enter-from,
.page-leave-to{
    opacity: 0;
    transform: translateX(-110%);
}
</style>
