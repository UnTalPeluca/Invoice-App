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
                    <button v-if="isDraft" @click="deleteDraft" class="delete">Delete</button>
                    <button class="cancel" @click="hide">Cancel</button>
                    <button :class="isDraft ? 'save-draft' : 'save'" @click="save">Save Changes</button>
                    <button v-if="isDraft" class="save" @click="send">Save & Send</button>
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
            if(this.$refs.ref_edit_form.validateForm()){
                this.$store.dispatch('postInvoice', {id:this.invoice.id, data: this.$refs.ref_edit_form.invoiceData, status:"pending"})
                this.hide()
            }
        },
        save() {
            if(this.isDraft){
                this.$store.dispatch('postInvoice', {id:this.invoice.id, data: this.$refs.ref_edit_form.invoiceData, status:this.invoice.data().status})
            } else{
                this.$store.dispatch('updateInvoice', {id:this.invoice.id, data: this.$refs.ref_edit_form.invoiceData, status:this.invoice.data().status})
            }
            this.hide()
        },
        deleteDraft() {
            this.$store.dispatch('deleteInvoice', {id:this.invoice.id, draft: true})
            this.hide()
        }
    },
    computed: {
        show() {
            return this.$store.state.showEdit
        },
        invoice() {
            return this.$store.state.invoice
        },
        isDraft() {
            return this.invoice.data().status == 'draft'
        }
    },
}
</script>

<style lang="scss" scoped>
@import '@/styles/components/_invoice-form-container.scss';
</style>