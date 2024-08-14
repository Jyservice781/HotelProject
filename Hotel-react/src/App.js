import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./main/Main";
import Details from "./main/Details"; // 수정된 컴포넌트
import Login from "./user/Login";
import Register from "./user/Register";
import ScrollToTop from "./ScrollToTop";
import MyBasket from "./user/MyBasket";
import BasketByUser from "./basket/BasketByUser";
import AdminshowUserOne from "./admin/AdminshowUserOne";
import AdminShowUserList from "./admin/AdminShowUserList";
import Auth from "./user/Auth";
import Logout from "./user/Logout";
import Update from "./hotel/Update";
import ShowList from "./hotel/ShowList";
import Write from "./hotel/Write";

function App() {
    return (
        <BrowserRouter>
            <ScrollToTop>
                <Routes>
                    {/* Main 페이지는 홈 페이지로 "/"로 설정 */}
                    <Route path="/" element={<Main />} />

                    {/* 사용자 관련 페이지 */}
                    <Route path="/login" element={<Auth />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/user/basket/:userid" element={<BasketByUser />} />
                    <Route path="/user/mypage/:userid" element={<MyBasket />} />

                    {/* 호텔 관련 페이지 */}
                    <Route path="/hotel/showOne/:id" element={<Details />} /> {/* 수정된 컴포넌트 */}
                    <Route path="/hotel/showList/:pageNo" element={<ShowList />} />
                    <Route path="/hotel/write" element={<Write />} />
                    <Route path="/hotel/update/:id" element={<Update />} />

                    {/* 관리자 관련 페이지 */}
                    <Route path="/admin/users" element={<AdminShowUserList />} />
                    <Route path="/admin/user/:id" element={<AdminshowUserOne />} />

                    {/* 기타 페이지 */}
                    {/* <Route path="/test" element={<Test />} /> */}
                    {/* <Route path="/reply/selectList/" element={<ReplyList />} /> */}
                    {/* <Route path="/reply/write" element={<Write />} /> */}
                    {/* <Route path="/reply/update/:id" element={<Update />} /> */}
                </Routes>
            </ScrollToTop>
        </BrowserRouter>
    );
}

export default App;
