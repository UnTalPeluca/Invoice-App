<template>
    <div id="nav-bar">
        <div id="logo" class="img-wrapper">
            <img src="@/assets/logo.svg" alt="">
        </div>
        <div class="img-wrapper">
            <img @click="toogleDarkMode" id="mode-img" src="@/assets/icon-sun.svg" alt="">
        </div>
        <div class="img-wrapper">
            <img id="avatar" src="@/assets/image-avatar.jpg" alt="">
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        toogleDarkMode() {
            document.documentElement.setAttribute('data-theme', 'dark')
        }
    },
    created() {
        document.querySelector('body').setAttribute('data-theme', 'dark')
    }
}
</script>
<style lang="scss" scoped>
@import '@/styles/layouts/_navbar.scss';
</style>