import React, { useEffect, useState } from 'react';

const TopTracks = () => {
  const [topTracks, setTopTracks] = useState([]);
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
      setError('Access token not found. Please login.');
      setLoading(false);
      return;
    }

    const fetchTopTracks = async () => {
      try {
        const response = await fetch('https://yuge.com.tr/top-tracks', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setTopTracks(data.topTracks);
          setPlaylist(data.playlist);
        } else {
          setError('Failed to fetch top tracks');
        }
      } catch (error) {
        setError('Error fetching top tracks');
      } finally {
        setLoading(false);
      }
    };

    fetchTopTracks();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black text-white">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black text-white">
        <div className="text-lg">{error}</div>
      </div>
    );
  }

  return (
    <>
    <p className="text-2xl font-bold mb-6">Hoşgeldin {playlist.user}!</p>
     <div className="bg-gradient-to-b from-green-500 to-black text-white p-6 md:p-8 rounded-lg shadow-xl">
      {playlist && (
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-2">{playlist.name}</h2>
          <p className="text-lg text-gray-300 mb-4">{playlist.description}</p>
          {playlist.imageUrl && (
            <img
              src={playlist.imageUrl}
              alt={playlist.name}
              className="w-full max-w-[350px] h-auto rounded-lg shadow-md"
            />
          )}
          <a
            href={playlist.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg text-green-400 mt-4 block hover:underline"
          >
            Open in Spotify
          </a>
        </div>
      )}

      <h3 className="text-2xl font-semibold mb-6">Top Tracks</h3>
      <div className="space-y-4">
        {topTracks.map((track, index) => (
          <div
            key={index}
            className="flex items-center bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition duration-300"
          >
            <span className="text-xl font-bold text-gray-100 mr-4">{index + 1}</span>

            <img
              src={track.imageUrl ? track.imageUrl : 'https://via.placeholder.com/150'}
              alt={track.album}
              className="w-16 h-16 rounded-lg object-cover shadow-lg"
            />

            <div className="ml-4 flex flex-col">
              <a href={track.url} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold hover:underline text-green-400">
                <p className="text-xl">{track.name}</p>
                <p className="text-sm text-gray-400">{track.artist}</p>
              </a>
              <p className="text-xs text-gray-500 mt-2">{track.album}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
   
  );
};

export default TopTracks;
