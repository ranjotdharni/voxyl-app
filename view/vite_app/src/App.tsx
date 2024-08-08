import { BrowserRouter, Routes, Route } from "react-router-dom"
import CreatePage from "./pages/CreatePage"
import LoginPage from "./pages/LoginPage"
import './index.css'
import TeamsPage from "./pages/teams/Page"
import SettingsPage from "./pages/settings/Page"
import LandingPage from "./pages/landing/Page"
import ProjectPage from "./pages/projects/Page"
import { LaunchProjectPage } from "./pages/projects/Page"
// import MetricsPage from "./pages/metrics/Page"
import WIP from "./components/misc/WIP"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LandingPage />} />

        <Route path="teams" element={<TeamsPage />}></Route>
        <Route path="metrics" element={<WIP />}></Route>
        <Route path="settings" element={<SettingsPage />}></Route>

        <Route path="project/:id?">
          <Route index element={<ProjectPage />} />
          <Route path="launch" element={<LaunchProjectPage />} />
        </Route>

        <Route path="entry/:next?">
          <Route index element={<CreatePage />} />

          <Route path="login/:next?" element={<LoginPage />} />

        </Route>

      </Routes>

    </BrowserRouter>
  )
}

export default App