<template>
    <div id="invoice-form">
        <form ref="ref_form">
            <fieldset>
                <legend>Bill From</legend>
                <label for="from-street">Street Address
                    <input @input="resetValidation" v-model="invoiceData.senderAddress.street" type="text" id="from-street">
                </label>
                <label for="from-city">City
                    <input @input="resetValidation" v-model="invoiceData.senderAddress.city" type="text" id="from-city">
                </label>
                <label for="from-post">Post Code
                    <input @input="resetValidation" v-model="invoiceData.senderAddress.postCode" type="text" id="from-post">
                </label>
                <label for="from-country">Country
                    <input @input="resetValidation" v-model="invoiceData.senderAddress.country" type="text" id="from-country">
                </label>
            </fieldset>
            <fieldset class="bill-to">
                <legend>Bill To</legend>
                <label for="to-name">Client's Name
                    <input @input="resetValidation" v-model="invoiceData.clientName" type="text" id="to-name">
                </label>
                <label for="to-email">Client's Email
                    <input @input="resetValidation" v-model="invoiceData.clientEmail" type="email" id="to-email">
                </label>
                <label for="to-street">Street Address
                    <input @input="resetValidation" v-model="invoiceData.clientAddress.street" type="text" id="to-street">
                </label>
                <label for="to-city">City
                    <input @input="resetValidation" v-model="invoiceData.clientAddress.city" type="text" id="to-city">
                </label>
                <label for="to-post">Post Code
                    <input @input="resetValidation" v-model="invoiceData.clientAddress.postCode" type="text" id="to-post">
                </label>
                <label for="to-country">Country
                    <input @input="resetValidation" v-model="invoiceData.clientAddress.country" type="text" id="to-country">
                </label>
                <label for="to-date">Invoice Date
                    <DatePicker
                    @created="setInitialTime"
                    @getFormatDate="getDate"
                    edit="true" 
                    ref="ref_date_picker"/>
                </label>
                <label @click="e_ShowOptions" class="label-select" for="to-terms">Payment Terms
                    <input @input="resetValidation" ref="ref_option_input" v-model="options.optionInput" type="text" id="to-terms" disabled>
                </label>
                <div v-show="options.showOptions" ref="ref_option_box" class="option-box">
                    <div class="wrapper">
                        <p @click="selectOption(index)" v-for="(option, index) in options.ptOptions" :key="index" ref="ref_option">Net {{option}} 
                            <span v-if="option <= 1">Day</span>
                            <span v-else>Days</span>
                        </p>
                    </div>
                </div>
                <label for="to-description">Project / Description
                    <input @input="resetValidation" v-model="invoiceData.description" type="text" id="to-description">
                </label>
            </fieldset>
            <fieldset class="item-list">
                <legend>Item List</legend>
                <div v-for="(item, index) in invoiceData.items" :key="index" class="list">
                    <label for="">
                        <input @input="resetValidation" v-model="item.name" type="text">
                    </label>
                    <label for="">
                        <input @input="getTotal(index), resetValidation($event)" v-model="item.quantity" type="number">
                    </label>
                    <label for="">
                        <input @input="getTotal(index), resetValidation($event)" v-model="item.price" type="number">
                    </label>
                    <label class="total" for="">
                        <input @input="resetValidation" v-model="item.total" type="number" disabled>
                    </label>
                    <div v-if="invoiceData.items.length > 1" @click="removeItem(index)" class="delete-item">
                        <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.47225 0L9.36117 0.888875H12.4722V2.66667H0.027832V0.888875H3.13892L4.02783 0H8.47225ZM2.6945 16C1.71225 16 0.916707 15.2045 0.916707 14.2222V3.55554H11.5834V14.2222C11.5834 15.2045 10.7878 16 9.80562 16H2.6945Z" fill="#888EB0"/></svg>
                    </div>
                </div>
                <button @click.prevent="addNewItem">+ Add New Item</button>
            </fieldset>
        </form>
    </div>
</template>
<script>
import DatePicker from "@/components/DatePicker.vue"
import dateUtils from "@/utils/dateUtils.js"

export default {
    props:{
        edit: false,
    },
    data(){
        return{
            fails: ["hola", "quetal", "todo"],
            options:{
                ptOptions: [1, 7, 14, 30],
                optionSelected: 1,
                showOptions: false,
                optionInput: "",
            },
            invoiceData: {
                senderAddress: {
                    city: "",
                    country: "",
                    postCode: "",
                    street: "",
                },
                clientName: "",
                clientEmail: "",
                clientAddress:{
                    city: "",
                    country: "",
                    postCode: "",
                    street: "",
                },
                createdAt: "",
                description: "",
                paymentDue: "",
                paymentTerms: "",
                status: "",
                items: [{name:"", quantity:0, price:0, total:0}]
            },
        }
    },
    components:{
        DatePicker,
    },
    methods:{
        resetValidation(e) {
            e.target.parentElement.classList.remove("empty-number", "empty", "invalid")
        },
        getDate(date) {
            this.invoiceData.createdAt = date
            this.setPaymentDue()
        },
        e_ShowOptions() {
            this.options.showOptions = !this.options.showOptions
        },
        selectOption(index) {
            const d =  this.options.ptOptions <= 1 ? "Day" : "Days"
            this.invoiceData.paymentTerms = this.options.ptOptions[index]
            this.options.optionInput = "Net" + ` ${this.options.ptOptions[index]} ` + d
            this.setPaymentDue()
        },
        addNewItem() {
            this.invoiceData.items.push({name:"", quantity:0, price:0, total:0})
        },
        removeItem(i) {
            this.invoiceData.items.splice(i, 1);
        },
        getTotal(i) {
            const data = this.invoiceData.items[i]
            this.invoiceData.items[i].total = data.quantity * data.price
        },
        setPaymentDue() {
            
            const date = dateUtils.onlySplitDocDate(this.invoiceData.createdAt)
            const offset = this.invoiceData.paymentTerms
            this.invoiceData.paymentDue = dateUtils.addDays(date, offset).toISOString().split('T')[0];
        },
        setInitialTime(day, month, year) {
            this.invoiceData.createdAt = dateUtils.formatDate(day, month, year)
        },
        validateForm() {
            //Validations
            const isEmpty = (variable) => variable == ""
            const validEmail = (variable) => {
                const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(String(variable).toLowerCase())
            }
            //Variables
            const form = this.$refs.ref_form
            const labels = form.querySelectorAll('label')
            let valid = true

            labels.forEach(label => {
                //Validate
                if(!label.classList.contains("total")){
                    const input = label.querySelector('input')
                    if(isEmpty(input.value)) {
                        valid = false
                        if(input.type == "number") {
                            label.classList.add("empty-number");
                        } else{
                            label.classList.add("empty");
                        }
                    } 
                    else if((input.type == "email") & !validEmail(input.value) ) {
                        valid = false
                        label.classList.add("invalid");
                    } else if (input.value == 0 & input.type == "number") {
                        label.classList.add("empty-number");
                    }
                } 
            })
        return valid
        }
    },
    created() {
        document.addEventListener('click', (e) =>{
            const optionBox = this.$refs.ref_option_box
            const optionInput = this.$refs.ref_option_input
            if(optionInput !== null) {
                if (!optionInput.isEqualNode(e.target) || optionBox.contains(e.target)){
                    this.options.showOptions = false
                }
            }
        })
        if (this.edit){
            this.invoiceData = this.$store.state.invoice.data()
            const terms = this.invoiceData.paymentTerms
            const index = this.options.ptOptions.findIndex((option) => option == terms)
            
        }
        setInterval(()=> this.selectOption(0), 0)
    },
}

</script>

<style lang="scss" scoped>
@import '@/styles/components/_invoice-form.scss';
</style>