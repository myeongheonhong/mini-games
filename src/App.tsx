import { Routes, Route, HashRouter } from 'react-router-dom';
import Memory from '@/pages/Memory';
import Home from '@/pages/Home';

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/memory" element={<Memory />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
