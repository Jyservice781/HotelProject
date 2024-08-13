import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ReplyList from "./reply/ReplyList";
import Write from "./reply/Write";
import Update from "./reply/Update";
import Main from "./main/Main";
import Details from "./main/Details";
import Login from "./component/Login";
import Register from "./component/Register";
import Test from "./component/Test";
import ScrollToTop from "./ScrollToTop";

function App() {
    return (
        <BrowserRouter>
           <ScrollToTop>
               <Routes>
                   <Route path={"*"} element={<Main/>}/>
                   <Route path={"/details"} element={<Details/>}/>
                   <Route path={"/login"} element={<Login/>}/>
                   <Route path={"/register"} element={<Register/>}/>

                   <Route path={"/test"} element={<Test/>}/>
                   <Route path={"/reply/selectList/"} element={<ReplyList/>}/>
                   <Route path={"/reply/write"} element={<Write/>}/>
                   <Route path={"/reply/update/:id"} element={<Update/>}/>
               </Routes>
           </ScrollToTop>
        </BrowserRouter>
    );
}

export default App;
