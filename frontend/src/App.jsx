import { useState, useEffect } from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home.jsx'
import CreateReview from './pages/CreateReview.jsx'
import Reviews from './pages/Reviews.jsx'
import Header from './components/Header.jsx';
import LoginModal from './components/LoginModal.jsx';

function App() {
  const [username, setUsername] = useState('')
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
          try {
              const res = await axios.get('/api/me', { withCredentials: true });
              setUsername(res.data.username);
          } catch {
              setUsername('');
          }
      };
      fetchUser();
  }, []);

  return (
    <>
      <Header username={username} onShowModal={() => setShowModal(true)}/>
      {showModal && (
        <LoginModal
          onClose={() => setShowModal(false)}
          onLoginSuccess={(username) => {
            console.log('[onLoginSuccess] got username:', username);
            setUsername(username);
            setShowModal(false);
          }}
        />
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateReview />} />
        <Route path="/reviews" element={<Reviews />} />
      </Routes>
    </>
  )
}

export default App


