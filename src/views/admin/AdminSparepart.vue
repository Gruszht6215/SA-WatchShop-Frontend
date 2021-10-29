<template>
    <div>
        <footer class="site-footer">
            <div class="footer-inside">
                <h1 class="text"> Admin Spare parts Board</h1>
            </div>
        </footer>
        <div class="bg">
        <!-- <br>
        <pop-up-create-item></pop-up-create-item> -->
        <br>
        <admin-table-sparepart></admin-table-sparepart>
        </div>
    </div>
</template>

<script>
import AdminTableSparepart from '../../components/adminTable/AdminTableSparepart.vue'
export default {
    components:{
        AdminTableSparepart
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

.bg{
    background-image: url(https://cdn-icons-png.flaticon.com/512/3063/3063782.png);
    background-repeat: no-repeat;
    background-size: 15%;
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 95%;
    background-size: 15%;
}
</style>