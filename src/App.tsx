import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Memory from '@/pages/Memory';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/mini-games/memory" element={<Memory />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
