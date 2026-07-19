const stations = [
    {
        id: 1,
        name: "Caracol Radio",
        frequency: "100.9 FM",
        city: "Bogotá",
        url: "https://playerservices.streamtheworld.com/api/livestream-redirect/CARACOL_RADIOAAC.aac",
        logo: "https://www.google.com/s2/favicons?domain=caracol.com.co&sz=256",
        color: "text-yellow-400"
    },
    {
        id: 2,
        name: "Blu Radio",
        frequency: "89.9 FM",
        city: "Nacional",
        url: "https://playerservices.streamtheworld.com/api/livestream-redirect/BLURADIO_SC",
        logo: "./blu-radio-logo.png",
        color: "text-blue-500"
    },
    {
        id: 3,
        name: "Olímpica Stereo",
        frequency: "105.9 FM",
        city: "Bogotá",
        url: "https://playerservices.streamtheworld.com/api/livestream-redirect/OLP_BOGOTAAAC.aac",
        logo: "https://www.google.com/s2/favicons?domain=olimpicastereo.com.co&sz=256",
        color: "text-blue-700"
    },
    {
        id: 4,
        name: "Radioacktiva",
        frequency: "97.9 FM",
        city: "Bogotá",
        url: "https://playerservices.streamtheworld.com/api/livestream-redirect/RADIO_ACTIVAAAC.aac",
        logo: "https://www.google.com/s2/favicons?domain=radioacktiva.com&sz=256",
        color: "text-red-600"
    },
    {
        id: 5,
        name: "W Radio",
        frequency: "99.9 FM",
        city: "Bogotá",
        url: "https://playerservices.streamtheworld.com/api/livestream-redirect/WRADIOAAC.aac",
        logo: "https://www.google.com/s2/favicons?domain=wradio.com.co&sz=256",
        color: "text-purple-600"
    },
    {
        id: 6,
        name: "La X",
        frequency: "103.9 FM",
        city: "Medellín",
        url: "https://tupanel.info:8000/stream",
        logo: "https://www.google.com/s2/favicons?domain=laxmasmusica.com&sz=256",
        color: "text-white"
    },
    {
        id: 7,
        name: "Candela Estéreo",
        frequency: "101.9 FM",
        city: "Bogotá",
        url: "https://playerservices.streamtheworld.com/api/livestream-redirect/CANDELAESTEREO_SC",
        logo: "https://www.google.com/s2/favicons?domain=candelaestereo.com&sz=256",
        color: "text-orange-500"
    },
    {
        id: 8,
        name: "Radio Nacional",
        frequency: "95.9 FM",
        city: "Bogotá",
        url: "https://shoutcast.rtvc.gov.co:8000/;",
        logo: "https://www.google.com/s2/favicons?domain=radionacional.co&sz=256",
        color: "text-green-500"
    },
    {
        id: 9,
        name: "El Sol",
        frequency: "107.9 FM",
        city: "Medellín",
        url: "https://us-b4-p-e-qg12-audio.cdn.mdstrm.com/live-audio-aw/632c9d30aa9ace684913b853",
        logo: "https://www.google.com/s2/favicons?domain=elsol.com.co&sz=256",
        color: "text-yellow-600"
    },
    {
        id: 10,
        name: "Tropicana",
        frequency: "102.9 FM",
        city: "Bogotá",
        url: "https://playerservices.streamtheworld.com/api/livestream-redirect/TROPICANA_BOGOTAAAC.aac",
        logo: "https://www.google.com/s2/favicons?domain=tropicanafm.com&sz=256",
        color: "text-yellow-400"
    }
];

// State
let currentStationIndex = 0;
let isPlaying = false;

// DOM Elements
const audioPlayer = document.getElementById('audio-player');
const playBtn = document.getElementById('btn-play-pause');
const playIcon = document.getElementById('play-icon');
const prevBtn = document.getElementById('btn-prev');
const nextBtn = document.getElementById('btn-next');
const volumeSlider = document.getElementById('volume-slider');
const volumeIcon = document.getElementById('volume-icon');

const stationNameEl = document.getElementById('current-station-name');
const stationFreqEl = document.getElementById('current-station-freq');
const stationImgEl = document.getElementById('station-img');
const defaultLogoEl = document.getElementById('default-logo');
const equalizer = document.getElementById('equalizer');
const statusMessage = document.getElementById('status-message');
const stationListEl = document.getElementById('station-list');

// Initialize App
function initApp() {
    renderStationList();
    loadStation(currentStationIndex);

    // Set initial volume
    audioPlayer.volume = volumeSlider.value;
    updateVolumeIcon(audioPlayer.volume);

    // Event Listeners
    playBtn.addEventListener('click', togglePlay);
    prevBtn.addEventListener('click', playPrev);
    nextBtn.addEventListener('click', playNext);

    volumeSlider.addEventListener('input', (e) => {
        const vol = parseFloat(e.target.value);
        audioPlayer.volume = vol;
        updateVolumeIcon(vol);
    });

    audioPlayer.addEventListener('playing', () => {
        isPlaying = true;
        updatePlayStateUI();
        statusMessage.textContent = 'En vivo';
        statusMessage.classList.add('text-green-500');
    });

    audioPlayer.addEventListener('waiting', () => {
        statusMessage.textContent = 'Cargando...';
        statusMessage.classList.remove('text-green-500');
        statusMessage.classList.add('text-brand-500');
    });

    audioPlayer.addEventListener('error', (e) => {
        console.error("Error playing audio", e);
        isPlaying = false;
        updatePlayStateUI();
        statusMessage.textContent = 'Error al conectar con la emisora';
        statusMessage.classList.remove('text-green-500', 'text-brand-500');
        statusMessage.classList.add('text-red-500');
    });

    audioPlayer.addEventListener('pause', () => {
        if(!isPlaying) return; // Keep loading state if waiting
        isPlaying = false;
        updatePlayStateUI();
        statusMessage.textContent = 'Pausado';
        statusMessage.classList.remove('text-green-500', 'text-brand-500');
    });
}

function renderStationList() {
    stationListEl.innerHTML = '';

    stations.forEach((station, index) => {
        const li = document.createElement('div');
        li.className = `station-item flex items-center justify-between p-4 rounded-xl cursor-pointer bg-gray-800 border border-gray-700`;
        li.dataset.index = index;

        li.innerHTML = `
            <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-full bg-white flex items-center justify-center p-1 overflow-hidden shadow-sm">
                    ${station.logo
                        ? `<img src="${station.logo}" alt="${station.name}" class="w-full h-full object-contain">`
                        : `<i class="fa-solid fa-radio text-gray-400 text-xl"></i>`
                    }
                </div>
                <div>
                    <h4 class="font-bold text-white">${index + 1}. ${station.name}</h4>
                    <p class="text-xs text-gray-400">${station.frequency} &bull; ${station.city}</p>
                </div>
            </div>
            <div class="station-play-indicator hidden w-8 h-8 rounded-full bg-brand-500/20 flex items-center justify-center">
                <i class="fa-solid fa-volume-high text-brand-500 text-sm"></i>
            </div>
        `;

        li.addEventListener('click', () => {
            if (currentStationIndex === index) {
                togglePlay();
            } else {
                currentStationIndex = index;
                loadStation(currentStationIndex);
                playAudio();
            }
        });

        stationListEl.appendChild(li);
    });
}

function loadStation(index) {
    const station = stations[index];

    // Update Audio source
    audioPlayer.src = station.url;

    // Update Player UI
    stationNameEl.textContent = station.name;
    stationFreqEl.textContent = `${station.frequency} - ${station.city}`;

    if (station.logo) {
        stationImgEl.src = station.logo;
        stationImgEl.classList.remove('hidden');
        defaultLogoEl.classList.add('hidden');
    } else {
        stationImgEl.src = '';
        stationImgEl.classList.add('hidden');
        defaultLogoEl.classList.remove('hidden');
    }

    // Reset status
    statusMessage.textContent = 'Lista para reproducir';
    statusMessage.className = 'text-center text-xs mt-4 h-4 text-gray-400';

    updateListHighlight();
}

function updateListHighlight() {
    const items = document.querySelectorAll('.station-item');
    items.forEach((item, idx) => {
        const indicator = item.querySelector('.station-play-indicator');
        if (idx === currentStationIndex) {
            item.classList.add('station-active');
            indicator.classList.remove('hidden');
        } else {
            item.classList.remove('station-active');
            indicator.classList.add('hidden');
        }
    });
}

function togglePlay() {
    if (isPlaying) {
        pauseAudio();
    } else {
        playAudio();
    }
}

function playAudio() {
    // Attempt to play
    audioPlayer.play().catch(e => {
        console.error("Playback failed:", e);
        statusMessage.textContent = 'Error: Bloqueado por navegador (haz clic de nuevo)';
        statusMessage.classList.add('text-red-500');
    });
}

function pauseAudio() {
    audioPlayer.pause();
    isPlaying = false;
    updatePlayStateUI();
}

function playNext() {
    currentStationIndex = (currentStationIndex + 1) % stations.length;
    loadStation(currentStationIndex);
    if (isPlaying) playAudio();
}

function playPrev() {
    currentStationIndex = (currentStationIndex - 1 + stations.length) % stations.length;
    loadStation(currentStationIndex);
    if (isPlaying) playAudio();
}

function updatePlayStateUI() {
    if (isPlaying) {
        playIcon.classList.remove('fa-play');
        playIcon.classList.add('fa-pause');
        playIcon.classList.remove('ml-1'); // adjust centering for pause icon
        equalizer.classList.remove('opacity-0');

        // Update list indicator
        const activeItem = document.querySelector('.station-item.station-active .station-play-indicator i');
        if (activeItem) {
            activeItem.classList.remove('fa-play');
            activeItem.classList.add('fa-volume-high');
        }

    } else {
        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-play');
        playIcon.classList.add('ml-1');
        equalizer.classList.add('opacity-0');

        // Update list indicator
        const activeItem = document.querySelector('.station-item.station-active .station-play-indicator i');
        if (activeItem) {
            activeItem.classList.remove('fa-volume-high');
            activeItem.classList.add('fa-play');
        }
    }
}

function updateVolumeIcon(vol) {
    volumeIcon.className = '';
    if (vol === 0) {
        volumeIcon.className = 'fa-solid fa-volume-xmark text-gray-500 text-sm w-5 text-center';
    } else if (vol < 0.5) {
        volumeIcon.className = 'fa-solid fa-volume-low text-gray-400 text-sm w-5 text-center';
    } else {
        volumeIcon.className = 'fa-solid fa-volume-high text-gray-300 text-sm w-5 text-center';
    }
}

// Start
document.addEventListener('DOMContentLoaded', initApp);
