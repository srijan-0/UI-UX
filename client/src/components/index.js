import React from "react";
import { Categories, DashboardAdmin, Orders, Products, } from "./admin";
import { Notices } from "./admin/notices";
import PetVisitAppointment from "./shop/petVisit/PetVisitAppointment";
import AppointmentHistory from "./shop/petVisit/AppointmentHistory"; 
import AllAppointments from "./admin/appointment/AllAppointments";
import AdminLogin from "./shop/dashboardUser/AdminLogin";


import {
  AdminProtectedRoute,
  CheckoutPage,
  Home,
  PageNotFound,
  ProductByCategory,
  ProductDetails,
  ProtectedRoute,
  WishList,
} from "./shop";

import AuthProtectedRoute from "./shop/auth/CartProtectedRoute"

import { SettingUser, UserOrders, UserProfile } from "./shop/dashboardUser";
import { Noticeshop } from "./shop/notice/notice";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

const Routes = (props) => {
  return (
    <Router>
      <Switch>
        {/* Shop & Public Routes */}
        <Route exact path="/" component={Home} />
        <Route exact path="/wish-list" component={WishList} />
        <Route exact path="/products/:id" component={ProductDetails} />
        <Route exact path="/blog" component={Noticeshop} />
        <Route exact path="/appointment" component={PetVisitAppointment} />
        <Route path="/admin-login" exact component={AdminLogin} />
        
        <Route
          exact
          path="/products/category/:catId"
          component={ProductByCategory}
        />
       <AuthProtectedRoute
  exact={true}
  path="/checkout"
  component={CheckoutPage}
/>

        {/* Shop & Public Routes End */}

        {/* Admin Routes */}
        <AdminProtectedRoute
          exact={true}
          path="/admin/dashboard"
          component={DashboardAdmin}
        />
        <AdminProtectedRoute
          exact={true}
          path="/admin/dashboard/categories"
          component={Categories}
        />
        <AdminProtectedRoute
          exact={true}
          path="/admin/dashboard/products"
          component={Products}
        />
        <AdminProtectedRoute
          exact={true}
          path="/admin/dashboard/orders"
          component={Orders}
        />
        <AdminProtectedRoute
          exact={true}
          path="/admin/dashboard/notices"
          component={Notices}
        />
        <AdminProtectedRoute
          exact
          path="/admin/dashboard/appointments"
          component={AllAppointments}
        />

        <ProtectedRoute
          exact={true}
          path="/user/profile"
          component={UserProfile}
        />
        <ProtectedRoute
          exact={true}
          path="/user/orders"
          component={UserOrders}
        />
        <ProtectedRoute
          exact={true}
          path="/user/setting"
          component={SettingUser}
        />
        {/* User Dashboard End */}
       
        <ProtectedRoute
          exact={true}
          path="/user/appointments"
          component={AppointmentHistory}
        />
        


        {/* 404 Page */}
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  );
};

export default Routes;

