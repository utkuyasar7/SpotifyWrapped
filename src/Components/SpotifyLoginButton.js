import React, { useEffect } from "react";

const SpotifyAuthButton = () => {
  const redirect_uri = "https://spotify-wrapped-theta.vercel.app/"; // Spotify geliştirici panelindeki geri dönüş URL

  const handleLogin = () => {
    window.location.href = "https://yuge.com.tr/auth";
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code"); // Spotify'dan gelen 'code' parametresi

    if (code) {
      const fetchTokens = async () => {
        try {
          // Backend'e token almak için istek gönderiyoruz
          const response = await fetch(`https://yuge.com.tr/callback?code=${code}`);
          const data = await response.json();

          if (data.access_token && data.refresh_token) {
            console.log("Access Token:", data.access_token);
            console.log("Refresh Token:", data.refresh_token);

            // Tokenları yerel depoda saklama
            localStorage.setItem("access_token", data.access_token);
            localStorage.setItem("refresh_token", data.refresh_token);

            // 1 saniye bekledikten sonra ana sayfaya yönlendir
            setTimeout(() => {
              window.location.href = redirect_uri;
            }, 1000);
          } else {
            console.error("Token alma sırasında bir hata oluştu:", data);
          }
        } catch (error) {
          console.error("Token isteği sırasında hata oluştu:", error);
        }
      };

      fetchTokens();
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center bg-black text-white py-12 px-6 rounded-lg shadow-xl max-w-md mx-auto space-y-6">
      <button
        onClick={handleLogin}
        className="bg-green-600 text-white py-3 px-6 rounded-full shadow-lg hover:bg-green-700 transition duration-300 flex items-center justify-center space-x-3 w-full"
      >
        <span className="font-semibold text-lg">Spotify ile Giriş Yap</span>
      </button>

      {/* Buton altındaki açıklama */}
      <div className="text-center text-sm text-gray-400 space-y-4">
        <p>
          Sizin için daha uygun ve güncel olduğunu düşündüğümüz bir wrapped hazırlamak istiyoruz spotify ile bağlanarak listeyi inceleyebilirsiniz..
        </p>
      </div>
    </div>
  );
};

export default SpotifyAuthButton;
