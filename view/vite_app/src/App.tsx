import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./pages/Layout"
import Create from "./pages/Create"
import Login from "./pages/Login"
import './index.css'
import Teams from "./pages/teams/Teams"
import FloatingBackground from "./components/FloatingBackground"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<><FloatingBackground /><p style={{color: 'white', position: 'relative', zIndex: 1}}>This is the Landing Page and does not require login!</p></>} />

        <Route path="teams" element={<Layout><Teams /></Layout>}></Route>

        <Route path="entry/:next?">
          <Route index element={<Create />} />

          <Route path="login/:next?" element={<Login />} />

        </Route>

      </Routes>

    </BrowserRouter>
  )
}

export default App