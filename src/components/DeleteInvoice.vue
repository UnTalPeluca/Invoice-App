<template>
    <transition name="fade">
        <div v-if="show" class="blur">
            <div id="delete-invoice">
                <p class="bold">Confirm Deletion</p>
                <p>Are you sure you want to delete invoice #<span>{{ id }}</span>? This action cannot be undone.</p>
                <div class="buttons">
                    <button @click="cancel" class="cancel">Cancel</button>
                    <button @click="deleteI" class="delete">Delete</button>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    data() {
        return {
            id: ""
        }
    },
    methods: {
        cancel() {
            this.$store.dispatch('setShowDelete', false)
        },
        deleteI() {
            this.$store.dispatch('deleteInvoice')
        }
    },
    computed: {
        show() {
            return this.$store.state.showDelete
        }
    },
    watch: {
        '$store.state.invoice': function() {
            this.id = this.$store.state.invoice.id
        }
    },
}
</script>

<style lang="scss" scoped>
@import '@/styles/components/_delete-invoice.scss';
</style>