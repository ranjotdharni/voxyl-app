import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./pages/Layout"
import Create from "./pages/Create"
import Login from "./pages/Login"
import './index.css'
import Teams from "./pages/teams/Teams"
import Settings from "./pages/settings/Settings"
import Landing from "./pages/landing/Landing"
import Project from "./pages/projects/Project"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Landing />} />

        <Route path="teams" element={<Layout><Teams /></Layout>}></Route>
        <Route path="project/:id?" element={<Layout><Project /></Layout>}></Route>
        <Route path="settings" element={<Layout><Settings/></Layout>}></Route>

        <Route path="entry/:next?">
          <Route index element={<Create />} />

          <Route path="login/:next?" element={<Login />} />

        </Route>

      </Routes>

    </BrowserRouter>
  )
}

export default App