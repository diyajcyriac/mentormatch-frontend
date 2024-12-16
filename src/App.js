import './App.css';
import Post from "./Post";
import Header from "./Header";
import {Route, Routes} from "react-router-dom";
import Layout from "./Layout";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import {UserContextProvider} from "./UserContext";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import EditPost from "./pages/EditPost";
import Register1Page from "./pages/Register1Page";
import Register2Page from "./pages/Register2Page";
import ProfilesDisplay from './pages/ProfilesDisplayPage';
import EditProfile from './pages/EditProfile';
import Matchmaking from './pages/MatchMaking';
import UserPage from './pages/UserPage';
import DeleteProfile from './pages/DeleteProfile';
import RequestPage from './pages/Requests';

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register1Page />} /> 
          <Route path="/register-step-2" element={<Register2Page />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="/profiles" element={<ProfilesDisplay />} />
          <Route path="/edit/profile" element={<EditProfile />} />
          <Route path="/match-making" element={<Matchmaking />} />
          <Route path="/profile/:id" element={<UserPage />} />
          <Route path="/delete/profile" element={<DeleteProfile />} />
          <Route path="/requests" element={<RequestPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
