import { BrowserRouter, Routes, Route } from "react-router-dom"
import Landing from "./pages/Landing"
import Create from "./pages/Create"
import Login from "./pages/Login"
import './index.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Landing />} />

        <Route path="entry">
          <Route index element={<Create />} />

          <Route path="login" element={<Login />} />

        </Route>

      </Routes>

    </BrowserRouter>
  )
}

export default App