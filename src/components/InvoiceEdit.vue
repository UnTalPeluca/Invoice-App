<template>
    <transition name="fade">
        <div id="invoice-edit" v-if="show">
            <div class="container">
                <div @click="hide" class="back">
                    <i class="arrow left"></i>
                    <span class="bold">Go Back</span>
                </div>
                <h2 class="bold">Edit <span class="id">{{this.invoice.id}}</span></h2>
                <InvoiceForm edit="true" ref="ref_edit_form"/>
                <div class="footer">
                    <button class="cancel" @click="hide">Cancel</button>
                    <button class="save" @click="send">Save Changes</button>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
import InvoiceForm from "@/components/InvoiceForm.vue"
export default {
    components:{
        InvoiceForm,
    },
    methods:{
        hide(){
            this.$store.dispatch('setShowEdit', false)
        },
        send(){
            this.$store.dispatch('postInvoice', {id:this.invoice.id, data: this.$refs.ref_edit_form.invoiceData, status:this.invoice.data().status})
        },
    },
    computed: {
        show() {
            return this.$store.state.showEdit
        },
        invoice() {
            return this.$store.state.invoice
        }
    },
}
</script>

<style lang="scss" scoped>
@import '@/styles/components/_invoice-form-container.scss';
</style>