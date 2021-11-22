<template>
    <transition name="empty-fade">
        <div v-if="created" id="invoice-empty">
            <div class="img-wrapper">
                <img src="@/assets/illustration-empty.svg" alt="Empty-icon">
            </div>
            <p class="bold">There is nothing here</p>
            <p>Create on invoice by clicking the <b>New</b> button and get started</p>
        </div>
    </transition>
</template>

<script>
export default {
    data() {
        return {
            created: false
        }
    },
    created() {
        setInterval(() => this.created = true, 0)
    }
}
</script>
<style lang="scss" scoped>
@import '@/styles/components/_invoice-empty.scss';
</style>