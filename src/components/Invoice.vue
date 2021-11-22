<template>
    <transition name="invoice-fade">
        <router-link v-show="created" :to="{ name: 'InvoiceDetails', params: { id: invoiceData.id } }">
            <div class="invoice">
                <p class="bold">{{ invoiceData.id }}</p>
                <p>Due <span>{{ this.dateUtils.splitDocDate(invoiceData.data().paymentDue) }}</span></p>
                <p class="bold">£ {{ amountDue }}</p>
                <p class="name">{{ invoiceData.data().clientName }}</p>
                <div class="state" :class="invoiceData.data().status">
                    <p class="bold">{{ invoiceData.data().status }}</p>
                </div>
                <i class="arrow right"></i>
            </div>
        </router-link>
    </transition>
</template>

<script>
import dateUtils from "@/utils/dateUtils.js"

export default {
    data(){
        return{
            dateUtils,
            created: false
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
    created() {
        setInterval(() => this.created = true, 0)
    }
}

</script>

<style lang="scss" scoped>
@import '@/styles/components/_invoice.scss';
</style>