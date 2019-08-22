<template>
  <div class="products">
    <div class="container">
      <div class="intro h-100">
        <div class="row h-100 justify-content-center align-items-center">
          <div class="col-md-6">
            <h3>Products Page</h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam accusantium sed sequi
            </p>
          </div>

          <div class="col-md-6">
            <img src="/img/svg/products.svg" alt="" class="img-fluid" />
          </div>
        </div>
      </div>

      <hr />

      <h3>Basic CRUD (create / read / update / delete)</h3>

      <div class="product-test">
        <div class="form-group">
          <input type="text" placeholder="Product Name" v-model="product.name" class="form-control">
        </div>

        <div class="form-group">
          <input type="text" placeholder="Price" v-model="product.price" class="form-control">
        </div>

        <div class="form-group">
          <button type="button" @click="saveData" class="btn btn-primary">Save Data</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
//const { fb, db } = require("../firebase");
import { fb, db } from '../firebase';

@Component
export default class Products extends Vue {

  @Prop() private msg!: string;
  public product:any = {};

  constructor() { 
    super()
    this.product = {'name':'', 'price':''};
  }

  data(){
    return {
      product : {name:'', price:''}
    }
  }
  
  
  saveData(){
    // alert(JSON.stringify(this.product));
    db.collection("products").add(this.product)
    .then((docRef:any) => {
        console.log("Document written with ID: ", docRef.id);
        this.product.name = ''
        this.product.price = ''
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
