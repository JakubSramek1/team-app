import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Teams from './pages/Teams'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/teams" element={<Teams />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
