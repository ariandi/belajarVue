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

      <!-- <hr />

      <h3>Basic CRUD (create / read / update / delete)</h3>

      <div class="product-test">
        <div class="form-group">
          <input type="text" placeholder="Product Name" v-model="product.name" class="form-control">
        </div>

        <div class="form-group">
          <input type="text" placeholder="Price" v-model="product.price" class="form-control" @keyup.enter="saveData">
        </div>

        <div class="form-group">
          <button type="button" @click="saveData" class="btn btn-primary">Save Data</button>
        </div>
      </div> -->

      <hr />

      <h3 class="d-inline-block">Product List</h3>
      <div class="btn btn-primary float-right btn-sm" @click="addNew">Add Product</div>
      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>No</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Modify</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, key) in products" v-bind:key="key">
              <td>{{ key + 1 }}</td>
              <td>{{ product.data().name }}</td>
              <td>{{ product.data().price }}</td>
              <td>
                <button type="button" class="btn btn-primary btn-sm" @click="editProduct(product)">Edit</button> || 
                <button type="button" class="btn btn-danger btn-sm" @click="deleteProduct(product.id)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>

    <!-- Modal -->
      <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="productModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="productModalLabel">Edit Product</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">

                <div class="row">
                  <!-- main product -->
                  <div class="col-md-8">
                    <div class="form-group">
                      <input type="text" placeholder="Product Name" v-model="product.name" class="form-control">
                    </div>

                    <div class="form-group">
                      <vue-editor v-model="product.description"></vue-editor>
                    </div>
                  </div>
                  <!-- product sidebar -->
                  <div class="col-md-4">
                    <h4 class="display-6">Product Details</h4>
                    <hr>

                    <div class="form-group">
                      <input type="text" placeholder="Product price" v-model="product.price" class="form-control">
                    </div>

                    <div class="form-group">
                      <input type="text" @keyup.188="addTag" placeholder="Product tags" v-model="tag" class="form-control">
                      
                      <div  class="d-flex">
                        <!-- <p v-for="tag in product.tags">
                            <span class="p-1">{{tag}}</span>
                        </p> -->

                      </div>
                    </div>


                    <div class="form-group">
                      <label for="product_image">Product Images</label>
                      <input type="file" @change="uploadImage" class="form-control">
                    </div>

                    <div class="form-group d-flex">
                      <!-- <div class="p-1" v-for="(image, index) in product.images">
                          <div class="img-wrapp">
                              <img :src="image" alt="" width="80px">
                              <span class="delete-img" @click="deleteImage(image,index)">X</span>
                          </div>
                      </div> -->
                    </div>

                  </div>
                </div>




            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button @click="addProduct()" type="button" class="btn btn-primary" v-if="modal">Save changes</button>
              <button @click="updateProduct()" type="button" class="btn btn-primary" v-if="!modal">Apply changes</button>
            </div>
          </div>
        </div>
      </div>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { VueEditor } from "vue2-editor";
//const { fb, db } = require("../firebase");
import { fb, db } from '../firebase';
declare var $ :any;
declare var Swal:any;

@Component({
  components : { VueEditor }
})
export default class Products extends Vue {

  @Prop() private msg!: string;
  public product:any = {};
  public products:any = [];
  public activeItem:any = null;
  public tag:any;
  public modal:boolean;
  public Toast:any;

  constructor() { 
    super()
    this.product = {
                      name:null,
                      description:null,
                      price:null,
                      tags:[],
                      images:[]
                    },
    this.products = [];
    this.tag = null;
    this.modal = true;
    // this.showProduct();
  }

  firestore ():any {
    return {
        products: db.collection('products')
    }
  }

  data(){
    return {
      product : {name:'', price:'', description:'', tags:[], images:[]}
    }
  }

  // Lifecycle hook
  mounted () {
    db.collection("products")
    .onSnapshot((querySnapshot:any) => {
        this.products = [];
        querySnapshot.forEach((doc:any) => {
            this.products.push(doc);
        });
        console.log("Current cities in CA: ", this.products.join(", "));
    });
  }

  addNew(){
    this.modal = true
    $("#productModal").modal('show');
  }
  
  
  addProduct(){
    this.firestore().products.add(this.product)
    .then((docRef:any) => {
        console.log("Document written with ID: ", docRef.id);
        $("#productModal").modal('hide');
        this.reset()
    })
    .catch(function(error:any) {
        console.error("Error adding document: ", error);
    });
    // db.collection("products").add(this.product)
    // .then((docRef:any) => {
    //     console.log("Document written with ID: ", docRef.id);
    //     this.product.name = ''
    //     this.product.price = ''
    // })
    // .catch(function(error) {
    //     console.error("Error adding document: ", error);
    // });
  }

  editProduct(product:any){
    this.modal = false
    this.product = product.data()
    $("#productModal").modal('show');
    this.activeItem = product.id
  }

  updateProduct(){
    db.collection("products").doc(this.activeItem)
    .update(this.product)
    .then(() => {
        console.log("Document successfully updated!");
        $("#productModal").modal('hide');
        this.toast().fire({
          type: 'success',
          title: 'Your file has been updated.'
        })
        this.reset()
        // this.showProduct();
    })
    .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
  }

  // showProduct(){
  //   db.collection("products").get()
  //   .then((querySnapshot) => {
  //       this.products = [];
  //       querySnapshot.forEach((doc) => {
  //           // doc.data() is never undefined for query doc snapshots
  //           console.log(doc.id, " => ", doc.data());
  //           this.products.push(doc)
  //       });

  //       console.log("products", this.products);
  //   });
  // }

  deleteProduct(key:any){

    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    })

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result:any) => {
      if (result.value) {
        
        this.firestore().products.doc(key).delete().then(() => {
            // console.log("Document successfully deleted!");
            this.reset()
            this.toast().fire({
              type: 'success',
              title: 'Your file has been deleted.'
            })
            // Swal.fire(
            //   'Deleted!',
            //   'Your file has been deleted.',
            //   'success'
            // )
        }).catch((error:any) => {
            console.error("Error removing document: ", error);
            alert('Error delete data');
        });

      }
    })
    
  }

  reset(){
    this.product = {
                      name:null,
                      description:null,
                      price:null,
                      tags:[],
                      images:[]
                    };
  }

  uploadImage(){

  }

  toast(){
    return this.Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"></style>