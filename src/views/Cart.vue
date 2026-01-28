<script setup>
import { useRouter } from 'vue-router'
import { computed, watch, onBeforeMount, ref, reactive } from 'vue'

const router = useRouter()
let jsonData = reactive({})
const STORAGE_KEY = 'cartItem'

onBeforeMount(() => {
    const storeData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    //jsonData = (JSON.parse(localStorage.getItem(STORAGE_KEY))) || {};
    jsonData = reactive(storeData)
    //console.log(jsonData)
})

const addProduct = ((id) => {
    jsonData[id].count++;
    saveJson();
})

const reduceProduct = ((id) => {
    if(jsonData[id].count > 1)
        jsonData[id].count--;
    saveJson();
})

const saveJson = (() => { 
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jsonData))
})

const deleteProduct = ((id) => {
    delete jsonData[id];
    saveJson();
    window.dispatchEvent(new Event('localStorageUpdated'));
})

const toCheckout = (() => {
    saveJson();
    router.push({ name: 'Checkout', query: { value : totalPrice.value.toFixed(2)}})
})

const toShopping = (() => {
    router.push({ name: 'Home'})
})

const totalPrice = computed(() => {
    return Object.values(jsonData).reduce((sum, item) => sum + item.count * item.price, 0)
})

/*watch(jsonData, (newValue) => {
    console.log(jsonData)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newValue));
}, { deep: true })*/

</script>

<template>
    <div class="container">
        <div class="item-wrap" v-for="(item, id) in jsonData" :key="id">
            <!--v-for="(value(值), key(鍵)) in obj" :key="key"-->
            <div class="img-wrap">
                <img :src="item.image" :alt="item.title">
            </div>
            <div class="item-info">
                <p>{{ item.title }}</p>
                <div class="count-wrap">
                    <button @click="reduceProduct(id)" :class="[item.count < 2 ? 'dont-press' :'button-count']">-</button>
                    <input v-model.number="item.count" type="number" @input="item.count = Math.max(1, Math.floor(item.count)); saveJson()" />
                    <button @click="addProduct(id)" class="button-count">+</button>
                </div>
                <p>${{ item.price }}</p>
            </div>   
            <div class="total-price">
                <p>${{ (item.price*item.count).toFixed(2) }}</p>
            </div>     
            <div class="trash-wrap">
                <i class="fa-solid fa-xmark" @click="deleteProduct(id)"></i>
            </div>   
        </div>
        <div class="total-wrap" v-if="totalPrice !== 0">
            <p>total : ${{ totalPrice.toFixed(2) }}</p>
        </div>
        <div class="empty-wrap" v-if="totalPrice === 0">
            <p>Your cart is empty.</p>
        </div>
    </div>
    <div class="next-step-wrap" v-if="totalPrice !== 0">
        <button @click="toCheckout" class="router-btn">Proceed to checkout</button>
    </div>
    <div class="next-step-wrap" v-if="totalPrice === 0">
        <button @click="toShopping" class="router-btn">Start shopping now!</button>
    </div>
    <RouterView />
</template>

<style scoped>
.container {
    width: 80%;
}

.item-wrap {
    height: 150px;
    width: 100%;
    border: 1px solid rgb(192, 187, 187);
    border-top: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    /*gap: 5px;*/
}

.item-wrap:first-child {
    border-top: 1px solid rgb(192, 187, 187);
}

.item-wrap .img-wrap {
    /*width: 100px;*/
    width: 30%;
    height: 90%;
    margin: 5px;
    padding: 5px;
}

.item-wrap .img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: contain; /*讓圖片長寬比維持 不會變形*/
}

.item-wrap .item-info {
    width: 45%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;;
}

.item-wrap .item-info p {
    font-size: 14px;
    margin: 5px;
}

/* 隱藏 Chrome 和 Safari 的上下箭頭 */
.count-wrap input[type="number"]::-webkit-outer-spin-button, 
.count-wrap input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* 隱藏 forefox 的上下箭頭 */
.count-wrap input[type="number"] {
    appearance: none;
    -moz-appearance: none;
    width: 30px;
    border: 1px solid black;
    border-radius: 2px;
}

.count-wrap .button-count {
    width: 20px;
    background-color: white;
    border: 1px solid black;
    border-radius: 2px;
}

.count-wrap .dont-press {
    background-color: white;
    border: 1px solid rgb(201, 195, 195);
    color: rgb(201, 195, 195);
    border-radius: 2px;
}

.item-wrap .total-price {
    width: 16%;
}

.item-wrap .trash-wrap {
    position: absolute;
    right: 2%;
    top: 65px;
}

.item-wrap .trash-wrap i {
    color: red;
}

.total-wrap p {
    font-size: 20px;
    text-align: right;
}

.empty-wrap p {
    font-size: 20px;
    text-align: center;
}

.next-step-wrap {
    width: 100%;
    height: 75px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.next-step-wrap .router-btn {
    height: 40px;
    border: 1px solid rgb(221, 120, 120);
    border-radius: 5px;
    background-color: rgb(221, 120, 120);
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 20px;
}

.next-step-wrap .router-btn:hover {
    border: 1px solid rgb(232, 76, 76);
    background-color: rgb(232, 76, 76);
}

@media (max-width: 480px) {

    .container {
        width: 100%;
    }

    .item-wrap {
        height: auto;
        position: relative;
    }

    .item-wrap .item-info p {
        /*margin: 5px;*/
        font-size: 12px;
    }

    .item-wrap .item-info {
        width: 50%;
    }

    .item-wrap .total-price {
        position: absolute;
        bottom: 5px;
        right: 15px;
    }

    .item-wrap .trash-wrap {
        position: absolute;
        top: 5px;
        right: 5px;
    }

    .item-wrap .total-price p {
        font-size: 12px;
        width: 45px;;
        text-align: right;
        white-space: nowrap;
    }
}
</style>