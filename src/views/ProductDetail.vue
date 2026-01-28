<script setup>
import { useRoute } from 'vue-router'
import { onMounted, ref, reactive } from 'vue'

const route = useRoute();
const productID = route.params.id;
const productInfo = ref([]); //把商品資訊先存到這
const productCount = ref(1); //我要購買的商品數量
const STORAGE_KEY = 'cartItem'
let jsonData = reactive({})

onMounted(async () => {
    const response = await fetch(`https://fakestoreapi.com/products/${productID}`)
    const data = await response.json()
    productInfo.value = data;
    jsonData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
})

/*const exceedMessage = computed(() => {
    if (!productInfo.value.rating)
        return '';
    return productCount.value >= productInfo.value.rating.count ? 'see' : 'hidden'
})*/

const addProduct = (() => {
    productCount.value++;
})

const reduceProduct = (() => {
    if(productCount.value > 1)
        productCount.value--;
})

const addInCart = ((id) => {
    if(!jsonData[id]) {
        jsonData[id] =  { title: productInfo.value.title, 
                            price: productInfo.value.price, 
                            image: productInfo.value.image, 
                            count: productCount.value }
    } else {
        jsonData[id].count = productCount.value  + jsonData[id].count
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jsonData))
    window.dispatchEvent(new Event('localStorageUpdated'));
    alert('Added to Cart')
})

</script>

<template>
    <div class="container">
        <div class="img-wrap">
            <img :src="productInfo.image" alt="productInfo.title">
        </div>
        <div class="other-detail">
            <div class="name-wrap">
                <p>{{ productInfo.title }}</p>
            </div>
            <div class="description-wrap">
                <p>{{ productInfo.description }}</p>
            </div>
            <div class="price-wrap">
                <p>${{ productInfo.price }}</p>
            </div>
            <div class="count-wrap">
                <button @click="reduceProduct" :class="[productCount < 2 ? 'dont-press' :'button-count']">-</button>
                <input v-model.number="productCount" type="number" @input="productCount = Math.max(1, Math.floor(productCount))" min="1" />
                <button @click="addProduct" class="button-count">+</button>
                <!--<p :class="exceedMessage">Inventory limit reached</p>-->
            </div>
            <div class="add-cart-wrap">
                <button @click="addInCart(productInfo.id)">add to the cart</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 5%;
}

.container .img-wrap {
    width: 400px;
    height: 400px;
    padding: 20px;
    border: 1px solid black;
    overflow: hidden; /*超過元素容器範圍的內容就隱藏*/ 
}

.container .img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: contain; /*讓圖片長寬比維持 不會變形*/
}

.container .other-detail {
    width: 400px;
}

.name-wrap p {
    font-size: 28px;
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

.add-cart-wrap {
    margin-top: 10px;
}

@media (max-width:480px) {
    .container .img-wrap {
        width: 80vw;
        height: 80vw;
        padding: 5%;
        margin: 5%;
        border: 1px solid black;
        overflow: hidden; /*超過元素容器範圍的內容就隱藏*/ 
    }

    .container .other-detail {
        width: 80vw;
    }

    .other-detail .name-wrap p {
        font-size: 22px;
    }
}

@media (min-width: 1024px) {
    /* 當螢幕寬度>1024px */
    .container {
        display:flex;
        flex-direction: row;
        gap: 10px;
    }

    .container .other-detail {
        max-width: 50%;
    }
}

</style>