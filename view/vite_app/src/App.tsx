import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./pages/Layout"
import Create from "./pages/Create"
import Login from "./pages/Login"
import './index.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Layout><p style={{color: 'white', position: 'relative', zIndex: 1}}>This is the Logged in Home Page!</p></Layout>} />

        <Route path="entry/:next?">
          <Route index element={<Create />} />

          <Route path="login/:next?" element={<Login />} />

        </Route>

      </Routes>

    </BrowserRouter>
  )
}

export default App