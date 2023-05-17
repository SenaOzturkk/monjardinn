import { BrowserRouter as Router, Routes, Route, Redirect } from 'react-router-dom';
import React, { useState } from 'react';
import './index.css';

import AdminPanel from './Admin/AdminPanel';
import ProductList from './ECommerce/ProductList';
import Home from './Home';
import List from './ECommerce/List';
import ProductInfo from './ECommerce/ProductInfo';
import Basket from './ECommerce/Basket';
import LogIn from './ECommerce/LogIn';
import SignUp from './ECommerce/SignUp';
import NewPassword from './ECommerce/NewPassword';
import Profile from './ECommerce/Profile';
import Search from './ECommerce/Search';
import Favorite from './ECommerce/Favorite';
import Blog from './ECommerce/Blog';
import AdminSearch from './Admin/AdminSearch';
import AdminProductList from './Admin/AdminProductList'
import AdminAddProduct from './Admin/AdminAddProduct'

import CreateYourself from './ECommerce/CreateYourself' 
import Stock from './Admin/Stock';
import BlogDetail from './ECommerce/BlogDetail';
import EditProduct from './Admin/EditProduct';
import EditBlog from './Admin/EditBlog';
import EditCategory from './Admin/EditCategory';
import ProductListByCategory from './Admin/ProductListByCategory';

function App() {
  

  return (
    
    <Router> 
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/AdminPanel" element={<AdminPanel />} />
        <Route path="/ProductList" element={<ProductList/>} />
        <Route path="/List" element={<List/>} />
        <Route path="/ProductInfo" element={<ProductInfo/>} />
        <Route path="/Basket" element={<Basket/>} />
        <Route path="/LogIn" element={<LogIn/>} />
        <Route path="/SignUp" element={<SignUp/>} />
        <Route path="/NewPassword" element={<NewPassword/>} />
        <Route path="/Profile" element={<Profile/>} />
        <Route path="/Search" element={<Search/>} />
        <Route path="/Favorite" element={<Favorite/>} />
        <Route path="/Blog" element={<Blog/>} />
        <Route path="/AdminSearch" element={<AdminSearch/>} />
        <Route path="/AdminProductList" element={<AdminProductList/>} />
        <Route path="/AdminAddProduct" element={<AdminAddProduct/>} />

        <Route path="/CreateYourself" element={<CreateYourself/>} />
        <Route path="/Stock" element={<Stock/>} />
        <Route path="/BlogDetail" element={<BlogDetail/>} />
        <Route path="/EditProduct" element={<EditProduct/>} />
        <Route path="/EditBlog" element={<EditBlog/>} />
        <Route path="/EditCategory" element={<EditCategory/>} /> 
        <Route path="/EditProduct/:product" element={<EditProduct />} />
        <Route path="/ProductListByCategory"  element={<ProductListByCategory />} />

      </Routes>
    </Router>
  );
} 

export default App;

