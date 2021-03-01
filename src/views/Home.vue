<template>
<!--    <link rel="icon" href="./img/favicon.ico"/>-->
    <div class="home">
        <Header/>
        <Banner/>
        <div>
            <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
        </div>
        <Footer/>
    </div>
</template>

<script>
    import Header from '../components/Header.vue'
    import Footer from '../components/Footer.vue'
    import Banner from '../components/Banner.vue'


    export default {
        name: 'Home',
        data() {
            return {}
        },
        created() {

        },
        components: {
            Header,
            Footer,
            Banner,
        },
    }
</script>
