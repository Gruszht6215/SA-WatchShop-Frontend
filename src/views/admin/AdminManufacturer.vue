<template>
    <div>
        <footer class="site-footer">
            <div class="footer-inside">
                <h1 class="text"> Admin Manufacturer Board</h1>
            </div>
        </footer>
        <admin-card-manufacturer></admin-card-manufacturer>
    </div>
</template>

<script>
import AdminCardManufacturer from '../../components/adminTable/AdminCardManufacturer.vue'
export default {
    components:{
        AdminCardManufacturer
    }
    
}
</script>

<style lang="scss" scoped>
.text{
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    display: block;
    font-family: inherit;
    font-size: 45px;
    color: #ffffff;
    margin-top: 0%;
}

.site-footer {
    background-color: rgb(0, 0, 0);
    height: 100;
    width: 100%;
}

</style>