import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { fetchAuthMe } from './redux/slices/auth';
import useCurrentUser from "./hooks/useCurrentUser";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Conversation from "./pages/Conversation/Conversation";
import People from "./pages/People/People";
import ChatList from "./pages/Chat/ChatList";
import ModalContext from "./context/ModalContext";
import Sidebar from "./components/Sidebar";

function App() {
  const currentUser = useCurrentUser();
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(fetchAuthMe());
  },[])

  if(!currentUser){
    return (
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    )
  }

  return (
    <>
      <Sidebar currentUser={currentUser}>
        <Routes>
          <Route path="/conversation/:id" element={<Conversation/>}/>
          <Route path="/" element={<ChatList/>}/>
          <Route path="/people" element={<People/>}/>
        </Routes>
      </Sidebar>
      <ModalContext/>
    </>
  );
}

export default App;
