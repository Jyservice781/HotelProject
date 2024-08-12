import './App.css';
import {Route, Routes} from "react-router-dom";
import ReplyList from "./reply/ReplyList";
import Write from "./reply/Write";
import Update from "./reply/Update";
import Main from "./main/Main";

function App() {
  return (
    <Routes>
        <Route path={"*"} element={<Main />}/>

        {/* hotel 의 id 값을 받아와야 함 */}

        <Route path={"/reply/selectList/"} element={<ReplyList/>}/>
        <Route path={"/reply/write"} element={<Write/>}/>
        <Route path={"/reply/update/:id"} element={<Update/>}/>
    </Routes>
  );
}

export default App;
