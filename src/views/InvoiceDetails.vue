<template>
    <div v-if="invoice" id="invoice-details" class="page-wrapper">
        <router-link :to="{ name: 'Home' }">
            <div class="back">
                <i class="arrow left"></i>
                <span class="bold">Go Back</span>
            </div>
        </router-link>
        <div  class="status-wrapper">
            <p>Status</p>
            <div class="state" :class="invoice.status">
                <p class="bold">{{invoice.status}}</p>
            </div>
            <div class="action-btns action-header">
                <button @click="showEdit" class="edit">Edit</button>
                <button @click="deleteI" class="delete">Delete</button>
                <button v-if="invoice.status == 'pending'" @click="markAsPaid" class="mark">Mark as Paid</button>
            </div>
        </div>
        <div class="invoice-details-wrapper">
            <div class="invoice-details">
                <div class="from">
                    <div class="header">
                        <p class="bold id">{{this.id}}</p>
                        <p>{{invoice.description}}</p>
                    </div>
                    <div class="from-address">
                        <p>{{invoice.senderAddress.street}}</p>
                        <p>{{invoice.senderAddress.city}}</p>
                        <p>{{invoice.senderAddress.postCode}}</p>
                        <p>{{invoice.senderAddress.country}}</p>
                    </div>
                </div>
                <div class="date">
                    <div>
                        <p>Invoice Date</p>
                        <p class="bold">{{dateUtils.splitDocDate(invoice.createdAt)}}</p>
                    </div>
                    <div>
                        <p>Payment Due</p>
                        <p class="bold">{{dateUtils.splitDocDate(invoice.paymentDue)}}</p>
                    </div>
                </div>
                <div class="bill-to">
                    <div class="header">
                        <p>Bill To</p>
                        <p class="bold">{{invoice.clientName}}</p>
                    </div>
                    <div class="to-address">
                        <p>{{invoice.clientAddress.street}}</p>
                        <p>{{invoice.clientAddress.city}}</p>
                        <p>{{invoice.clientAddress.postCode}}</p>
                        <p>{{invoice.clientAddress.country}}</p>
                    </div>
                </div>
                <div class="email">
                    <p>Sent to</p>
                    <p class="bold">{{invoice.clientEmail}}</p>
                </div>
                <div class="amount">
                    <div class="list">
                        <p class="name">Item Name</p>
                        <p class="quantity">QTY.</p>
                        <p class="price">Price</p>
                        <p class="total-price">Total</p>
                    </div>
                    <div class="items bold" v-for="item in invoice.items" :key="item.id">
                        <div class="item">
                            <p>{{item.name}}</p>
                            <p>{{item.quantity}}<span>{{item.price}}</span></p>
                        </div>
                        <p class="quantity">{{item.quantity}}</p>
                        <p class="price">{{item.price}}</p>
                        <p class="total-price">{{item.quantity * item.price}}</p>
                    </div>
                    <div class="total">
                        <p>Amount Due</p>
                        <p class="bold">{{ amountDue }}</p>
                    </div>
                </div>
            </div>
        </div>
        <transition>
            <div v-show="showFooter" class="action-footer action-btns">
                <button @click="showEdit" class="edit">Edit</button>
                <button @click="deleteI" class="delete">Delete</button>
                <button v-if="invoice.status == 'pending'" @click="markAsPaid" class="mark">Mark as Paid</button>
            </div>
        </transition>
        <InvoiceEdit/>
    </div>
</template>
<script>
import dateUtils from "@/utils/dateUtils.js"
import InvoiceEdit from "@/components/InvoiceEdit.vue"

export default {
    components:{
        InvoiceEdit,
    },
    data(){
        return{
            dateUtils,
            invoice: false,
        }
    },
    props: ['id'],
    created(){
        this.$store.dispatch('setShowEdit', false)
        this.$store.dispatch('fetchInvoice', {id:this.id, reload:false})
    },
    watch: {
        '$store.state.invoice': function() {
            this.invoice = this.$store.state.invoice.data()
        }
    },
    methods:{
        showEdit() {
            this.$store.dispatch('setShowEdit', true)
        },
        markAsPaid() {
            this.$store.dispatch('updateInvoice', {id:this.id, data:this.invoice, status:"paid"})
        },
        deleteI() {
            this.$store.dispatch('deleteInvoice', {id:this.id, draft: false})
        }
    },
    computed:{
        showFooter() {
            return !this.$store.state.showEdit
        },
        amountDue() {
            const items = this.$store.state.invoice.data().items
            return items.reduce((sum, { total }) => sum + total, 0)
        }
    },
}
</script>
<style lang="scss" scoped>
@import '@/styles/views/_invoice-details.scss';
.page-enter-from,
.page-leave-to{
    opacity: 0;
    transform: translateX(110%);
}
</style>