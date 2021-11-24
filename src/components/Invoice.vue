<template>
    <transition name="invoice-fade">
            <div @click="clickInvoice" class="invoice">
                <p class="bold">{{ invoiceData.id }}</p>
                <p>Due <span>{{ this.dateUtils.splitDocDate(invoiceData.data().paymentDue) }}</span></p>
                <p class="bold">£ {{ amountDue }}</p>
                <p class="name">{{ invoiceData.data().clientName }}</p>
                <div class="state" :class="invoiceData.data().status">
                    <p class="bold">{{ invoiceData.data().status }}</p>
                </div>
                <i class="arrow right"></i>
            </div>
    </transition>
</template>

<script>
import dateUtils from "@/utils/dateUtils.js"

export default {
    data(){
        return{
            dateUtils,
        }
    },
    props:{
        invoiceData: Object,
    },
    computed: {
        amountDue() {
            const items = this.invoiceData.data().items
            return items.reduce((sum, { total }) => sum + total, 0)
        },
    },
    methods:{
        clickInvoice() {
            if(this.invoiceData.data().status === 'draft') {
                this.$store.dispatch('fetchInvoice', {id:this.invoiceData.id, reload:false})
                this.$store.dispatch('setShowEdit', true)
            } else {
                window.scrollTo(0, 0);
                this.$router.push({name:'InvoiceDetails', params:{id: this.invoiceData.id}})
            }
        }
    }
}

</script>

<style lang="scss" scoped>
@import '@/styles/components/_invoice.scss';
</style>