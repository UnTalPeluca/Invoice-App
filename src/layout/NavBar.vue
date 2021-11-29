<template>
    <div id="nav-bar">
        <div id="logo" class="img-wrapper">
            <img src="@/assets/logo.svg" alt="">
        </div>
        <div class="img-wrapper">
            <img @click="toogleDarkMode" id="mode-img" :src="require('@/assets/' + icon )" alt="">
        </div>
        <div class="img-wrapper">
            <img id="avatar" src="@/assets/image-avatar.jpg" alt="">
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            icon: 'icon-moon.svg'
        }
    },
    methods: {
        toogleDarkMode() {
            if(localStorage.getItem('darkMode') === 'true'){
                localStorage.setItem('darkMode', 'false');
                document.querySelector('html').classList.remove('dark')
            } else{
                localStorage.setItem('darkMode', 'true');
                document.querySelector('html').classList.add('dark')
            }
            this.icon = localStorage.getItem('darkMode') == 'true' ? 'icon-moon.svg' : 'icon-sun.svg'
        },
    },
    created() {
        if(!localStorage.getItem('darkMode')){
            localStorage.setItem('darkMode', 'true')
            document.querySelector('html').classList.add('dark')
        } else if (localStorage.getItem('darkMode') === 'true'){
            document.querySelector('html').classList.add('dark')
        }
        this.icon = localStorage.getItem('darkMode') == 'true' ? 'icon-moon.svg' : 'icon-sun.svg'
    }
}
</script>
<style lang="scss" scoped>
@import '@/styles/layouts/_navbar.scss';
</style>