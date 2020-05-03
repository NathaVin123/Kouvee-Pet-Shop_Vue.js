<template>
  <div id="app">
    <div class="cart">
      <h1 class="title">
        Order Pengadaan Produk
      </h1>
      <ul class="items">
        <li :key="item.id" v-for="item in data.items" class="item">
          <div class="item-preview">
            <img :src="item.thumbnail" :alt="item.title" class="item-thumbnail">
            <div>
              <h2 class="item-title">{{ item.title }}</h2>
              <p class="item-description">{{ item.description }}</p>
            </div>
          </div>
          <div>
            <input type="text" class="item-quantity" v-model="item.quantity">
            <span class="item-price">{{ toPrice(item.price).toFormat() }}</span>
          </div>
        </li>
      </ul>
      <h3 class="cart-line">
        Subtotal
        <span class="cart-price">{{ getSubtotal.toFormat() }}</span>
      </h3>
      <h3 class="cart-line">
        VAT ({{ data.vatRate }}%)
        <span class="cart-price">{{ getTaxAmount.toFormat() }}</span>
      </h3>
      <h3 class="cart-line">
        Shipping
        <span class="cart-price">{{ getShippingPrice.isZero() ? 'Free' : getShippingPrice.setLocale(getLocale).toFormat() }}</span>
      </h3>
      <h3 class="cart-line">
        Total
        <span class="cart-price cart-total">{{ getTotal.toFormat() }}</span>
      </h3>
    </div>
  </div>
</template>

<script>
import Dinero from "dinero.js";

export default {
  name: "app",
  data() {
    return {
      data: {
        items: [],
        shippingPrice: 0,
        vatRate: 0
      },
      language: "en-US"
    };
  },
  methods: {
    toPrice(amount, factor = Math.pow(10, 2)) {
      return Dinero({ amount: Math.round(amount * factor) }).setLocale(
        this.language
      );
    }
  },
  computed: {
    getShippingPrice() {
      return this.toPrice(this.data.shippingPrice);
    },
    getTaxAmount() {
      return this.getSubtotal.percentage(this.data.vatRate);
    },
    getSubtotal() {
      return this.data.items.reduce(
        (a, b) => a.add(this.toPrice(b.price).multiply(b.quantity)),
        Dinero().setLocale(this.language)
      );
    },
    getTotal() {
      return this.getSubtotal.add(this.getTaxAmount).add(this.getShippingPrice);
    }
  },
  created() {
    fetch("./src/assets/products.json")
      .then(response => response.json())
      .then(json => (this.data = json));
  }
};
</script>

<style>
body {
  margin: 0;
  background: #fdca40;
  padding: 30px;
}

.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  text-transform: uppercase;
  font-size: 110%;
  font-weight: normal;
}

.language {
  margin: 0 2px;
  font-size: 60%;
  color: rgba(#333a45, 0.6);
  text-decoration: underline;
  cursor: pointer;
}

.items {
  margin: 0;
  padding: 0;
  list-style: none;
}

.cart {
  background: #fff;
  font-family: "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  color: #333a45;
  border-radius: 3px;
  padding: 30px;
}
.cart-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0 0 0;
  font-size: inherit;
  font-weight: normal;
  color: rgba(51, 58, 69, 0.8);
}
.cart-price {
  color: #333a45;
}
.cart-total {
  font-size: 130%;
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 2px solid rgba(51, 58, 69, 0.1);
}
.item-preview {
  display: flex;
  align-items: center;
}
.item-thumbnail {
  margin-right: 20px;
  border-radius: 3px;
}
.item-title {
  margin: 0 0 10px 0;
  font-size: inherit;
}
.item-description {
  margin: 0;
  color: rgba(51, 58, 69, 0.6);
}
.item-quantity {
  max-width: 30px;
  padding: 8px 12px;
  font-size: inherit;
  color: rgba(51, 58, 69, 0.8);
  border: 2px solid rgba(51, 58, 69, 0.1);
  border-radius: 3px;
  text-align: center;
}
.item-price {
  margin-left: 20px;
}
</style>