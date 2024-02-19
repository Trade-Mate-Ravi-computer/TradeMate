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
import Invoice from './Components/Invoice';
import Remaining from './Components/Remaining';
import UsersDashboard from './Components/UsersDashboard';
import CreateCOmpany from './Components/CreateCOmpany';



function App() {
  let stores = JSON.parse(localStorage.getItem('login'))
  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route exact path="/" element={stores?<UsersDashboard/>:<Home/>}></Route>
          <Route exact path="/dashboard/:id" element={<Dashboard />}></Route>
          <Route exact path="/addsale/:companyName" element={<AddSale/>} />
          <Route exact path="/addemployee/:companyName" element={<Signup/>} />
          <Route exact path="/addcustomer/:companyName" element={<AddCustomer/>} />
          <Route exact path="/addpurchase/:companyName" element={<AddPurchase/>} />
          <Route exact path="/addexpense/:companyName" element={<AddExpence/>} />
          <Route exact path="/addproduct/:companyName" element={<AddProduct/>} />
          <Route exact path="/signup" element={<Signup/>} />
          <Route exact path="/saledetails/:companyName" element={<SaleDetails/>} />
          <Route exact path="/updatesale/:id" element={<UpdateSale/>} />
          <Route exact path="/profits/:companyName" element={<Profits/>} />
          <Route exact path="/stocks/:companyName" element={<ProductLists/>} />
          <Route exact path="/invoice/:id" element={<Invoice/>} />
          <Route exact path="/test" element={<Test/>} />
          <Route exact path="/usersDashboard" element={<UsersDashboard/>}/>
          <Route exact path="/remaining/:companyName" element={<Remaining/>}/>
          <Route exact path="/createCompany" element={<CreateCOmpany/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
