document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const user = urlParams.get('user'); // Получаем имя пользователя из URL
    const token = urlParams.get('token'); // Получаем API токен из URL

    if (user && token) {
        // Функция для запроса текущего трека
        const fetchNowPlaying = () => {
            fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${user}&api_key=${token}&format=json&limit=1`)
                .then(response => response.json())
                .then(data => {
                    const track = data.recenttracks.track[0];
                    if (track && track['@attr'] && track['@attr'].nowplaying === "true") {
                        // Если трек играет, выводим информацию
                        document.getElementById('track-info').textContent = `${track.artist['#text']} - ${track.name}`;
                        document.body.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
                    } else {
                        // Если ничего не играет, делаем фон прозрачным
                        document.body.style.backgroundColor = 'transparent';
                        document.getElementById('track-info').textContent = '';
                    }
                })
                .catch(error => console.error('Error fetching data:', error));
        };

        // Запрашиваем текущий трек сразу после загрузки страницы
        fetchNowPlaying();

        // Обновляем данные каждые 10 секунд
        setInterval(fetchNowPlaying, 10000);
    } else {
        console.error('No user or token specified');
        document.body.style.backgroundColor = 'transparent';
    }
});