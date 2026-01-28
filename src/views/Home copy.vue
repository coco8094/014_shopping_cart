<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router'

const productList = ref([])

onMounted (() => {
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {
            productList.value = data;
        })
})

</script>

<template>
<div class="container">
    <div class="allProducts">
        <div class="eachProduct" v-for="product in productList" :key="product" >            
            <!--<RouterLink to="/ProductDetail/product.id">-->
            <RouterLink :to="`/ProductDetail/${product.id}`" class="router-link">
                <div class="img-wrap">
                    <img :src="product.image" :alt="product.title">
                </div>
                <div class="name-wrap">
                    <p>{{ product.title }}</p>
                </div>
                <div class="price-wrap">
                    <p>${{ product.price.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 2}) }}</p>
                </div>
                <!--.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 2}) 讓小數點最多顯示2位 最少顯示0位
                undefined會根據用戶的瀏覽器設置或默認的地區來自動選擇語言地區 也可指定語言區-->
            </RouterLink>
            
        </div>
    </div>
</div>
</template>

<style scoped>
.allProducts {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
}

.allProducts .eachProduct {
    height: 250px;
    width: 200px;
    border: 1px solid gray;
    border-radius: 20px;
    box-shadow: 0 2px 5px gray; /*水平位移 垂直位移 模糊程度 顏色*/
    background: linear-gradient(145deg, transparent 75%,#7bf 100%);
}

.allProducts .eachProduct:hover {
    transform: scale(1.02);
    background-color: white;
}

.allProducts .eachProduct .router-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    text-decoration: none;
    color: black;
}

.allProducts .eachProduct .img-wrap {
    width: 90%;
    height: 50%;
    overflow: hidden;/*超過元素容器範圍的內容就隱藏*/
    margin: 5% 0;
}

.allProducts .eachProduct .img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: contain;/*讓圖片長寬比維持 不會變形*/
}

.allProducts .eachProduct .name-wrap {
    width: 90%;
    height: 30%;
}

.allProducts .eachProduct .price-wrap {
    width: 90%;
    height: 10%;
    display: flex;
    flex-direction: row-reverse;
}

.allProducts .eachProduct p {
    margin: 0;
}

.allProducts .eachProduct .name-wrap p {
    font-size: 14px;
}

.allProducts .eachProduct .price-wrap p {
    font-size: 22px;
}

@media (max-width: 480px) {
   .allProducts .eachProduct {
        height: 150px;
        width: 120px;
        border: 1px solid gray;
        border-radius: 15px;
        box-shadow: 0 2px 5px gray; /*水平位移 垂直位移 模糊程度 顏色*/
        background: linear-gradient(145deg, transparent 75%,#7bf 100%);
    }

    .router-link {
        position: relative;
    }

    .allProducts .eachProduct .name-wrap {
        display: -webkit-box; /* 讓容器成為彈性盒子 可以處理子元素的自動換行  */
        -webkit-box-orient: vertical; /* 子元素沿著垂直方向排列 */
        -webkit-line-clamp: 3; /* 限制顯示行數 */
        overflow: hidden; /* 隱藏超出容器範圍的內容 */
        text-overflow: ellipsis; /* 如果文字內容超出容器 則顯示... */
        height: 24%;
    }

    .allProducts .eachProduct .name-wrap p {
        font-size: 10px;
    }

    .allProducts .eachProduct .price-wrap {
        position: absolute;
        right: 8px;
        bottom: 3px;;
    }

    .allProducts .eachProduct .price-wrap p {
        font-size: 12px;
    }
}
</style>