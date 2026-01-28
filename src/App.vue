<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted, reactive, watchEffect } from 'vue'

const STORAGE_KEY = 'cartItem'

const myCartCount = ref(0)

const storeData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
let jsonData = reactive(storeData);
if(Object.keys(jsonData).length !== 0) {
  myCartCount.value = Object.keys(jsonData).length
}

onMounted(() => {
  window.addEventListener('localStorageUpdated', () => {
    jsonData = reactive(JSON.parse(localStorage.getItem(STORAGE_KEY)) || {})
    myCartCount.value = Object.keys(jsonData).length
  });
});

</script>

<template>
  <h1>SHOPPING SHOPPING</h1>
  <nav>
    <RouterLink to="/" class="router-link"><i class="fa-solid fa-house"></i></RouterLink><br>
    <RouterLink to="/Cart" class="router-link">
      <i class="fa-solid fa-cart-shopping"></i>
      <div class="cart-count">
        <p>{{ myCartCount }}</p>
      </div>
    </RouterLink><br>
  </nav>

  <RouterView />
</template>

<style scoped>

nav {
  display: flex;
  gap: 8px;
  margin: 10px;
}

.router-link {
  text-decoration: none;
  color: black;
  position: relative;
}

.router-link i {
  width: 24px;
  height: 24px;
}

.cart-count {
  width: 12px;
  height: 12px;
  background-color: red;
  border: 1px solid red;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  top: -7px;
}

.cart-count p {
  font-size: 10px;
  color: white;
}

@media (max-width: 480px) {
  h1 {
    font-size: 22px;
  }
}
</style>
