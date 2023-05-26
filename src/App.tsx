import Layout from "./components/layout/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import TodoPage from "./pages/TodoPage";
import WeatherPage from "./pages/WeatherPage";
import ProfilePage from "./pages/ProfilePage";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="todo" element={<TodoPage />} />
          <Route path="weather" element={<WeatherPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}
export default App;
