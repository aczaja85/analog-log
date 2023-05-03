import React, { useEffect, useState } from 'react';
import MainContainer from './MainContainer';

const CLIENT_ID = '38ef7ce6023b4c1e8b6057767a412e0c';
const CLIENT_SECRET = 'd5ea58227a2e4ac281ddf010163f8d05';

const App: React.FC = () => {
  const [token, setToken] = useState('');

  useEffect(() => {
    const authParams = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body:
        'grant_type=client_credentials&client_id=' +
        CLIENT_ID +
        '&client_secret=' +
        CLIENT_SECRET,
    };

    fetch('https://accounts.spotify.com/api/token', authParams)
      .then((res) => res.json())
      .then((res) => setToken(res.access_token));
  }, []);
  return (
    <div>
      <MainContainer token={token}/>
    </div>
  );
};

export default App;
