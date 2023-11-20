import { Route, Routes } from "react-router-dom";
import { Search } from "./Pages/Search";
import { Results } from "./Pages/Results";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Search />}></Route>
      <Route path="/results/:params" element={<Results />}></Route>
    </Routes>
  );
}

export default App;
