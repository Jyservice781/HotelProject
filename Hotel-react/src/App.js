import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./main/Main";
import Details from "./main/Details";
import Login from "./user/Login";
import Register from "./user/Register";
import ScrollToTop from "./ScrollToTop";
import BasketByUser from "./basket/BasketByUser";
import BasketCheckedByUser from "./basket/BasketCheckedByUser";
import UserInfo from "./admin/UserInfo";
import AdminShowUserList from "./admin/AdminShowUserList";
import Auth from "./user/Auth";
import Logout from "./user/Logout";
import MyHotelBySeller from "./seller/MyHotelBySeller";
import AdminUserInfo from "./admin/AdminUserInfo";

function App() {
    return (
        <BrowserRouter>
           <ScrollToTop>
               <Routes>
                   {/* Main페이지 "*"로 지정하면 로그인 시 userInfo전달이 안됨*/}
                   <Route path={"/"} element={<Main/>}/>
                   <Route path={"/details"} element={<Details/>}/>
                   <Route path={"/login"} element={<Auth/>}/>
                   <Route path="/logout" element={<Logout />} />
                   <Route path={"/register"} element={<Register/>}/>

                   <Route path="/admin/users" element={<AdminShowUserList />} />
                   <Route path="/user/myhotel/:sellerid" element={<MyHotelBySeller />}/>
                   <Route path="/user/basket/:userid" element={<BasketByUser />} />
                   <Route path="/user/basketChecked/:userid" element={<BasketCheckedByUser />} />
                   <Route path="/user/mypage/:userid" element={<UserInfo />} />
                   <Route path="/admin/userpage/:userid" element={<AdminUserInfo />} />

               </Routes>
           </ScrollToTop>
        </BrowserRouter>
    );
}

export default App;
