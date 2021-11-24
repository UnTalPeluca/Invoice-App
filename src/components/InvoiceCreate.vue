<template>
    <transition name="fade">
        <div id="invoice-create" v-if="show">
            <div class="container">
                <div @click="hideInvoiceCreate" class="back">
                    <i class="arrow left"></i>
                    <span class="bold">Go Back</span>
                </div>
                <h2 class="bold">New Invoice</h2>
                <InvoiceForm ref="ref_create_form"/>
                <div class="footer">
                    <button @click="hideInvoiceCreate" class="discard">Discard</button>
                    <button @click="saveDraft" class="save-draft">Save as Draft</button>
                    <button @click="send" class="send">Save & Send</button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import uid from "@/utils/uid.js"
import InvoiceForm from "@/components/InvoiceForm.vue"
export default {
    components:{
        InvoiceForm,
    },
    methods:{
        hideInvoiceCreate() {
            this.$store.dispatch('setInvoiceCreate', false)
        },
        send() {
            if(this.$refs.ref_create_form.validateForm()){
                this.$store.dispatch('postInvoice', {id:uid(), data: this.$refs.ref_create_form.invoiceData, status:"pending"})
                this.hideInvoiceCreate()
                this.$store.dispatch('fetchInvoices')
            }
        },
        saveDraft() {
            this.$store.dispatch('postInvoice', {id:uid(), data: this.$refs.ref_create_form.invoiceData, status:"draft"})
            this.hideInvoiceCreate()
        }
    },
    computed:{
        show(){
            return this.$store.state.showCreate
        },
    },
}
</script>

<style lang="scss" scoped>
@import '@/styles/components/_invoice-form-container.scss';
</style>