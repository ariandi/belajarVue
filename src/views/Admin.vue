<template>
  <div class="admin">
    <div class="page-wrapper default-theme sidebar-bg bg1 toggled">
        <nav id="sidebar" class="sidebar-wrapper">
            <div class="sidebar-content">
                <!-- sidebar-brand  -->
                <div class="sidebar-item sidebar-brand">
                    <a href="#">pro sidebar</a>
                    <div id="close-sidebar" @click="closeMenu">
                        <i class="fas fa-times"></i>
                    </div>
                </div>
                <!-- sidebar-header  -->
                <div class="sidebar-item sidebar-header d-flex flex-nowrap">
                    <div class="user-pic">
                        <img class="img-responsive img-rounded" src="/img/user.png" alt="User picture">
                    </div>
                    <div class="user-info">
                        <span class="user-name">Jhon
                            <strong>Smith</strong>
                        </span>
                        <span class="user-role">Administrator</span>
                        <span class="user-status">
                            <i class="fa fa-circle"></i>
                            <span>Online</span>
                        </span>
                    </div>
                </div>
                <!-- sidebar-search  -->
                <div class="sidebar-item sidebar-search">
                    <div>
                        <div class="input-group">
                            <input type="text" class="form-control search-menu" placeholder="Search...">
                            <div class="input-group-append">
                                <span class="input-group-text">
                                    <i class="fa fa-search" aria-hidden="true"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- sidebar-menu  -->
                <div class=" sidebar-item sidebar-menu">
                    <ul>
                        <!-- <li class="header-menu">
                            <span>General</span>
                        </li> -->
                        <!-- <li class="sidebar-dropdown">
                            <a href="#">
                                <i class="fa fa-tachometer-alt"></i>
                                <span class="menu-text">Dashboard</span>
                                <span class="badge badge-pill badge-warning">New</span>
                            </a>
                            <div class="sidebar-submenu">
                                <ul>
                                    <li>
                                        <a href="#">Dashboard 1
                                            <span class="badge badge-pill badge-success">Pro</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">Dashboard 2</a>
                                    </li>
                                    <li>
                                        <a href="#">Dashboard 3</a>
                                    </li>
                                </ul>
                            </div>
                        </li> -->
                        <li class="header-menu">
                            <span>Menu</span>
                        </li>
                        <li>
                            <router-link to="/admin/overview">
                                <i class="fa fa-chart-line"></i>
                                <span>Overview</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/admin/products">
                                <i class="fab fa-amazon"></i>
                                <span>Products</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/admin/orders">
                                <i class="fa fa-shopping-cart"></i>
                                <span>Orders</span>
                            </router-link>
                        </li>

                        <li>
                            <router-link to="/admin/profile">
                                <i class="fa fa-user"></i>
                                <span>Profile</span>
                            </router-link>
                        </li>
                        <li>
                            <a href="#" @click="logout()">
                                <i class="fa fa-power-off"></i>
                                <span>Logout</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <!-- sidebar-menu  -->
            </div>
        </nav>
        <!-- page-content  -->
        <main class="page-content pt-2">
            <div id="overlay" class="overlay"></div>
            <div class="container-fluid p-5">
                <div class="row">
                    <div class="form-group col-md-12">
                        <router-view></router-view>
                    </div>
                </div>
            </div>
        </main>
        <!-- page-content" -->
    </div>
    <!-- page-wrapper -->
  </div>
</template>

<script>
// @ is an alias to /src
import Hero from "@/components/Hero.vue";
import {fb} from '../firebase';
export default {
  name: "admin",
  data(){
      return{
          name:null,
          email:null,
      }
  },
  components: {
    Hero
  },
  methods:{
      closeMenu(){
        // $(".page-wrapper").toggleClass("toggled");
        $("#close-sidebar").click(function () {
            if ($(".page-wrapper").hasClass("pinned")) {
                // unpin sidebar when hovered
                $(".page-wrapper").removeClass("pinned");
                $("#sidebar").unbind( "hover");
            } else {
                $(".page-wrapper").addClass("pinned");
                $("#sidebar").hover(
                    function () {
                        console.log("mouseenter");
                        $(".page-wrapper").addClass("sidebar-hovered");
                    },
                    function () {
                        console.log("mouseout");
                        $(".page-wrapper").removeClass("sidebar-hovered");
                    }
                )

            }
        });
      },
      logout(){
          fb.auth().signOut()
          .then(() => {
              this.$router.replace('/');
          })
          .catch((err) =>{
              console.log(err);
          });
      }
  },
  created(){
      let user = fb.auth().currentUser;
      this.email = user.email;
  }
};
</script>