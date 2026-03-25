import { Route, Routes } from "react-router-dom"
import Home from "./components/Home"

const App = () => {
  return (
    <div className="bg-red-300">
       <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App