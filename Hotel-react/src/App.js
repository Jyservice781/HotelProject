import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./main/Main";
import Details from "./main/Details";

import Login from "./user/Login";
import Register from "./user/Register";
import ScrollToTop from "./ScrollToTop";
import MyBasket from "./user/MyBasket";
import BasketByUser from "./basket/BasketByUser";
import AdminshowUserOne from "./admin/AdminshowUserOne";
import AdminShowUserList from "./admin/AdminShowUserList";
import Auth from "./user/Auth";
import Logout from "./user/Logout";

import ReplyList from "./reply/ReplyList";
import ReplyUpdate from "./reply/ReplyUpdate";
import ReplyWrite from "./reply/ReplyWrite";

function App() {
    return (
        <BrowserRouter>
           <ScrollToTop>
               <Routes>
                   {/* Main페이지 "*"로 지정하면 로그인 시 userInfo전달이 안됨*/}
                   <Route path={"/"} element={<Main/>}/>
                   <Route path={"/details"} element={<Details/>}/>
                   <Route path={"/login"} element={<Auth/>}/>
                   <Route path="/logout" element={<Logout />} /> {/* 로그아웃 */}
                   <Route path={"/register"} element={<Register/>}/>

                   <Route path="/admin/users" element={<AdminShowUserList />} />
                   <Route path="/admin/user/:id" element={<AdminshowUserOne />} />
                   <Route path="/user/basket/:userid" element={<BasketByUser />} />
                   <Route path="/user/mypage/:userid" element={<MyBasket/>} />

                   <Route path={"/reply/write/:hotelId"} element={<ReplyWrite/>}/>
                   <Route path={"/reply/update/:id"} element={<ReplyUpdate/>}/>
                   <Route path={"/reply/replyList/:hotelId"} element={<ReplyList/>}/>
               </Routes>
           </ScrollToTop>
        </BrowserRouter>
    );
}

export default App;
