<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'

const route = useRoute();
const router = useRouter();
const totalPrice = route.query.value;
const payMethod = ref("cash");
const months = ref(Array.from({ length: 12 }, (_, i) => i+1));
const years = ref(Array.from({ length: 10 }, (_, i) => i+2026));
const formInfo_name = ref('');

const clickSubmit = (() => {
    router.push({name: 'ThankYou', state: {name: formInfo_name.value}})
})
</script>

<template>
<div class="container">
    <form @submit.prevent="clickSubmit">
        <!--使用@submit會提交表單 加上.prevent阻止提交表單並執行自己定義的function-->
        <div class="input-wrap">
            <label for="name">name</label><br>
            <input type="text" id="name" v-model="formInfo_name" required />
        </div>
        <div class="input-wrap">
            <label for="address">address</label><br>
            <input type="text" id="address" name="address" required />
        </div>
        <div class="input-wrap">
            <label for="phone">phone number</label><br>
            <input type="tel" id="phone" name="phone" pattern="\d{10}" title="Please enter 10 digits only" required />
        </div>
        <div class="input-wrap">
            <label for="email">e-mail</label><br>
            <input type="email" id="email" name="email" />
        </div>    
        <div class="pay-wrap">
            <legend>Please select a payment method:</legend>
            <div class="radio-wrap">
                <input type="radio" id="cash" name="payMoney" v-model="payMethod" value="cash" checked />
                <label for="cash">Cash on Delivery</label><br>
            </div>
            <div class="radio-wrap">
                <input type="radio" id="card" name="payMoney" v-model="payMethod" value="card" />
                <label for="card">Online Credit Card Payment</label><br>
                <div class="card-info" v-if="payMethod === 'card'">
                    <label for="card-number">Card Number: </label>
                    <input type="text" id="card-number" name="card-number" pattern="\d{16}" title="Please enter 16 digits only" required/><br>
                    <label for="cvv">Security Code(CVV): </label>
                    <input type="text" id="cvv" name="cvv" pattern="\d{3}" title="Please enter 3 digits only" required/><br>
                    <label for="card-month">month: </label>
                    <select name="card-month" id="card-month">
                        <option v-for="month in months" :key="month" value="month">{{ month }}</option>
                    </select>
                    <label for="card-year">year: </label>
                    <select name="card-year" id="card-year">
                        <option v-for="year in years" :key="year" value="year">{{ year }}</option>
                    </select>
                </div>
            </div>
        </div>   
        <div class="input-wrap">
            <label for="note">Order Notes</label><br>
            <textarea id="note" name="note" rows="4"></textarea>
        </div>       
        <input type="submit" value="submit">
    </form>

</div>
</template>

<style scoped>
.container {
    width: 400px;
    border: 1px solid black;
    padding: 15px;
}

.container form {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}

.container .input-wrap {
    width: 95%;
    margin-top: 10px;
}

.container .pay-wrap {
    width: 95%;
    margin-top: 10px;
}

.container .input-wrap input {
    width: 100%;
    height: 30px;
    margin-top: 2px;
}

.container form > input {
    margin-top: 15px;
    width: 55px;
}

.pay-wrap .radio-wrap .card-info > * {
    margin-bottom: 5px;
}

.pay-wrap .radio-wrap .card-info label {
    margin-left: 20px;
}

.container .input-wrap textarea {
    width: 100%;
}

@media (max-width: 480px) {
    .container {
        width: 90%;
    }
}
</style>