<template>
    <div id="invoice-list">
        <ActionBar ref="ref_action_bar" @filterClick="updateFilters"/>
        <div v-if="isLoading" class="invoice-list-wrapper">
            <div v-if="invoices.length">
                <Invoice v-for="invoice in invoices" :key="invoice.id" :invoiceData="invoice"/>
            </div> 
            <div v-else class="invoice-empty">
                <InvoiceEmpty/>
            </div>
        </div>
    </div>
</template>

<script>
import ActionBar from "@/components/ActionBar"
import Invoice from "@/components/Invoice"
import InvoiceEmpty from "@/components/InvoiceEmpty"

export default {
    data() {
        return {
            filters: {
                draft: false,
                pending: false,
                paid: false
            }
        }
    },
    components: {
        Invoice,
        InvoiceEmpty,
        ActionBar,
    },
    methods: {
        updateFilters(filters) {
            this.filters = filters
        }
    },
    computed: {
        invoices() {
            const invoices = this.$store.state.invoices
            const filters = []
            for (const key of Object.keys(this.filters)) {
                if(this.filters[key] === true) {
                    filters.push(key)
                }
            }
            if(filters.length == 0) {
                this.$store.dispatch('setInvoiceAmount', invoices.length)
                return invoices
            } else{
                const filteredInvoices = invoices.filter((invoice) => {
                    return filters.includes(invoice.data().status)
                })
                this.$store.dispatch('setInvoiceAmount', filteredInvoices.length)
                return filteredInvoices
            }
        },
        isLoading() {
            return !this.$store.state.loading
        }
    },
    mounted() {
        this.$store.dispatch('fetchInvoices')
    }
}
</script>

<style lang="scss" scoped>
@import '@/styles/components/_invoice-list.scss';
</style>