<template>
    <div id="action-bar">
        <div id="left-header">
            <h1 class="bold">Invoices</h1>
            <p><span :class="t_amount == 'No' ? 'empty' : ''">{{ t_amount }}</span> <span></span><span :class="[t_amount == 'No' ? 'empty' : '',  t_invoiceFilter]"></span> {{ t_invoice }} </p>
        </div>
        <div id="filter" ref="filter" @click="isFilterOpen=!isFilterOpen">
            <p class="bold">Filter</p>
            <i class="arrow" :class="isFilterOpen ? 'up':'down'"></i>
        </div>
        <div id="filter-nav" v-show="isFilterOpen">
            <ul>
                <li>
                    <label class="control control-checkbox bold">
                        Draft
                            <input v-model="filters.draft" @input="filterClick" type="checkbox"/>
                        <div class="control_indicator"></div>
                    </label>
                </li>
                <li>
                    <label class="control control-checkbox bold">
                        Pending
                            <input @input="filterClick" v-model="filters.pending" type="checkbox"/>
                        <div class="control_indicator"></div>
                    </label>
                </li>
                <li>
                    <label class="control control-checkbox bold">
                        Paid
                            <input @input="filterClick" v-model="filters.paid" type="checkbox"/>
                        <div class="control_indicator"></div>
                    </label>
                </li>
            </ul>
        </div>
        <div @click="newInvoice" id="new">
            <div class="img-wrapper">
                <img src="@/assets/icon-plus.svg" alt="">
            </div>
            <p class="bold">New</p>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            isFilterOpen: false,
            filters:{
                draft:false,
                pending:false,
                paid:false,
            },
            invoicesAmount: 0,
            oneInvoiceFilter: ""
        }
    },
    methods:{
        newInvoice() {
            this.$store.dispatch('setInvoiceCreate', true)
        },
        filterClick() {
            this.filter
            this.$emit('filterClick', this.filters)
            const that = this
            setTimeout(() =>{this.invoicesAmount = this.$store.state.filteredAmount}, 0)
            function setAmountOfInvoices() {
                const localFilters = []
                for (const key of Object.keys(that.filters)) {
                    if(that.filters[key] === true) {
                        localFilters.push(key)
                    }
                }
                if(localFilters.length == 1 & that.$store.state.filteredAmount) {
                    that.oneInvoiceFilter = localFilters[0]
                } else{
                    that.oneInvoiceFilter = ""
                }
            }
            setTimeout(setAmountOfInvoices, 10)
        },
    },
    computed: {
        t_amount() {
            return this.invoicesAmount > 0 ? ` ${this.invoicesAmount}` : "No"
        },
        t_invoice() {
            return this.invoicesAmount == 1 ? "invoice" : "invoices"
        },
        t_invoiceFilter() {
            return this.oneInvoiceFilter === "" ? "" : `${this.oneInvoiceFilter}` 
        }
    },
    created() {
        setInterval(() =>{this.invoicesAmount = this.$store.state.filteredAmount}, 0)
    },
}
</script>

<style lang="scss" scoped>
@import '@/styles/components/_actionbar.scss';
</style>