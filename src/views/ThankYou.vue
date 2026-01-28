<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const consumerName = ref('');
const numberString = '0123456789';
let randomNumber = ref('');
const STORAGE_KEY = 'cartItem'
const router = useRouter();

onMounted(() => {
    const state = history.state;
    consumerName.value = state.name;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({}))
    window.dispatchEvent(new Event('localStorageUpdated'));
})

for (let i = 0; i < 10; i++) {
    randomNumber.value += numberString.charAt(Math.floor(Math.random() * numberString.length))
    //Math.random() 回傳0~1的浮點數
    //String.charAt(index) 回傳字串第index個字元
}

const returnHome = () => {
    router.push({name: 'Home'});
}
</script>

<template>
<div class="container">
    <div class="orderNumber-wrap">
        <p>Order Number: {{ randomNumber }}</p>
    </div>
    <p>
        Dear {{ consumerName }}, <br>
        your order has been successfully completed!
        Thank you for your support, and we look forward to providing you with more high-quality products and services.
        We welcome you to visit us again anytime!
    </p>
</div>
<button class="back-button" @click="returnHome">Back to Home</button>
</template>

<style scoped>
.container {
    border: 1px solid black;
    width: 480px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.container .orderNumber-wrap {
    width: 90%;
    border-bottom: 1px solid rgb(188, 179, 179);
}

.container > p {
    width: 90%;
}

.container p {
    text-align: center;
}

.back-button {
    margin-top: 15px;
    padding: 5px 10px;
    border: 1px solid rgb(221, 120, 120);
    border-radius: 10px;
    background-color: rgb(221, 120, 120);
    color: white;
}

.back-button:hover {
    border: 1px solid rgb(232, 76, 76);
    background-color: rgb(232, 76, 76);
}

@media (max-width: 480px) {
    .container {
        width: 90%;
    }
}
</style>