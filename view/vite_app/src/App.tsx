import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./pages/Layout"
import Create from "./pages/Create"
import Login from "./pages/Login"
import './index.css'
import Teams from "./pages/teams/Teams"
import FloatingBackground from "./components/FloatingBackground"
import ThemeContext from "./components/context/ThemeContext"

function App() {

  return (
    <ThemeContext>
      <BrowserRouter>
        <Routes>
          <Route index element={<><FloatingBackground /><p style={{color: 'white', position: 'relative', zIndex: 1}}>This is the Landing Page and does not require login!</p></>} />

          <Route path="crews" element={<Layout><Teams /></Layout>}></Route>

          <Route path="entry/:next?">
            <Route index element={<Create />} />

            <Route path="login/:next?" element={<Login />} />

          </Route>

        </Routes>

      </BrowserRouter>
    </ThemeContext>
  )
}

export default App