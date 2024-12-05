import React from 'react';
import SpotifyLoginButton from './Components/SpotifyLoginButton';
import TopTracks from './Components/TopTracks';

const App = () => {
  const accessToken = localStorage.getItem('access_token');  // LocalStorage'dan token al

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
    
      {accessToken ? (
        <div className="w-full max-w-4xl p-6">
          
          <TopTracks />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
          <SpotifyLoginButton />
        </div>
      )}
    </div>
  );
};

export default App;
