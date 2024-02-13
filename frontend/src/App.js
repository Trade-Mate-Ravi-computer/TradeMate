import './App.css';
import AddCustomer from './Components/AddCustomer';
import AddEmployee from './Components/AddEmployee';
import AddExpence from './Components/AddExpence';
import AddProduct from './Components/AddProduct';
import AddPurchase from './Components/AddPurchase';
import AddSale from './Components/AddSale';
import Dashboard from './Components/Dashboard';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './Components/Signup';
import Footer from './Components/Footer';
import SaleDetails from './Components/SaleDetails';
import UpdateSale from './Components/UpdateSale';
import Test from './Components/Test';
import Profits from './Components/Profits';
import ProductLists from './Components/ProductLists';
import UpdateProduct from './Components/UpdateProduct';



function App() {
  let stores = JSON.parse(localStorage.getItem('login'))
  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route exact path="/" element={stores?<Dashboard/>:<Home/>}></Route>
          <Route exact path="/dashboard" element={<Dashboard />}></Route>
          <Route exact path="/addsale" element={<AddSale/>} />
          <Route exact path="/addemployee" element={<Signup/>} />
          <Route exact path="/addcustomer" element={<AddCustomer/>} />
          <Route exact path="/addpurchase" element={<AddPurchase/>} />
          <Route exact path="/addexpense" element={<AddExpence/>} />
          <Route exact path="/addproduct" element={<AddProduct/>} />
          <Route exact path="/signup" element={<Signup/>} />
          <Route exact path="/saledetails" element={<SaleDetails/>} />
          <Route exact path="/updatesale/:id" element={<UpdateSale/>} />
          <Route exact path="/profits" element={<Profits/>} />
          <Route exact path="/stocks" element={<ProductLists/>} />
          
          <Route exact path="/updateproduct/:id" element={<UpdateProduct/>} />
          <Route exact path="/test" element={<Test/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
