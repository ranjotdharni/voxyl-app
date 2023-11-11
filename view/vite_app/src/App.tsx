import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./components/Login"
import Landing from "./components/Landing"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Landing />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App