import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './real_layout_page/Home';
import HistoryDetection from './real_layout_page/HistoryDetection';
import ResultDetection from './real_layout_page/ResultDetection';
import NotFound from './real_layout_page/NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" index element={<Home />} />
                <Route path="/history" element={<HistoryDetection />} />
                <Route path="/result" element={<ResultDetection />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
