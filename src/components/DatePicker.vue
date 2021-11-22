<template>
    <div ref="datePicker" class="date-picker">
        <input
        v-model="e_Date" 
        readonly="readonly" 
        type="text" 
        id="to-date">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.3334 2H14C15.1027 2 16 2.89734 16 4V14C16 15.1027 15.1027 16 14 16H2C0.897339 16 0 15.1027 0 14V4C0 2.89734 0.897339 2 2 2H2.66663V0.666626C2.66663 0.298706 2.96533 0 3.33337 0H4C4.36804 0 4.66663 0.298706 4.66663 0.666626V2H11.3334V0.666626C11.3334 0.298706 11.632 0 12 0H12.6666C13.0347 0 13.3334 0.298706 13.3334 0.666626V2ZM14 14.6666C14.3673 14.6666 14.6666 14.3673 14.6666 14V6.69336H1.33337V14C1.33337 14.3673 1.63269 14.6666 2 14.6666H14Z" fill="#7E88C3"/></svg>
        <div v-show="show" class="dp-container">
            <div class="dp-selected-date">
                <div 
                @click="e_SetMonth(-1)" 
                class="dp-prev-month"><i class="arrow left"></i></div>
                <p>{{`${this.months[this.month]} ${this.year}`}}</p> 
                <div @click="this.e_SetMonth(1)" class="dp-next-month"><i class="arrow right"></i></div>
            </div>
            <div class="dp-days">
                <p 
                @click="e_SetDay(index)" 
                class="dp-day" 
                :class="this.day == index ? 'dp-day-selected' : '' " 
                v-for="index in this.e_DaysPerMonth" :key="index">{{index}}</p>
                <p 
                class="dp-day-fill" 
                v-for="index in 35-this.e_DaysPerMonth" :key="index">{{index}}</p>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data(){
        return{
            show: false,
            day: 6,
            month: 10,
            year: 1996,
            months: ["","Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        }
    },
    prop:{
        edit: {
            type: String,
            default: false
        }
    },
    methods:{
        e_SetMonth(v){
            if((this.month + v) > 12){
                this.month = 1
                this.year = this.year + 1
            } else if((this.month + v) == 0){
                this.month = 12
                this.year = this.year - 1
            } else{
                this.month = this.month + v
            }
        },
        e_SetDay(index){
            this.day = index
            const that = this
            setTimeout(function(){ 
                that.show = false
            }, 0);
            this.e_FormatDate()
        },
        e_FormatDate(){
            const date = `${this.year}-${this.month}-${this.day}`
            console.log(date)
            this.$emit("getFormatDate", date)
        }
    },
    computed:{
        e_Date(){
            return `${this.day} ${this.months[this.month]} ${this.year}`
        },
        e_DaysPerMonth(){
            return new Date(this.year, this.month, 0).getDate()
        },
    },
    created(){
        document.addEventListener('click', (e) => {
            if(this.$refs.datePicker == null){
                document.removeEventListener('click', e)
            } else{
                this.show = this.$refs.datePicker.contains(e.target) ? true : false
            }
        })
        if (!this.edit){
            const d = new Date();
            const day = d.getDate();
            const month = d.getMonth();
            const year = d.getFullYear();
            this.day = day;
            this.month = month;
            this.year = year;
            this.$emit('created', day, month, year)
        }
    },
}
</script>

<style lang="scss" scoped>
@import '@/styles/components/_date-picker.scss';
</style>