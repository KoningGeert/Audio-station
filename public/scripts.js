// Geluiden laden
const kickSound = new Audio('sounds/drum/909_KICK.wav');
const snareSound = new Audio('sounds/drum/909SNARE.wav');
const hatSound = new Audio('sounds/drum/909CLHAT.wav');
const clapSound = new Audio('sounds/drum/909_CLAP.wav');

let currentStep = 0;
let isPlaying = false;
let intervalId;

// Deze functie speelt het geluid af op basis van het geselecteerde instrument
function playSound(instrument) {
    switch (instrument) {
        case 'kick':
            kickSound.currentTime = 0; // Reset het geluid
            kickSound.play();
            break;
        case 'snare':
            snareSound.currentTime = 0;
            snareSound.play();
            break;
        case 'hat':
            hatSound.currentTime = 0;
            hatSound.play();
            break;
        case 'clap':
            clapSound.currentTime = 0;
            clapSound.play();
            break;
    }
}

// Event listeners voor cellen
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.cell').forEach(cell => {
        cell.addEventListener('click', () => {
            cell.classList.toggle('active'); // Toggle active class
        });
    });
});

// Startknop event listener
document.getElementById('startBtn').addEventListener('click', () => {
    if (!isPlaying) {
        isPlaying = true;
        currentStep = 0;
        intervalId = setInterval(playStep, 500); // 500 ms interval voor BPM (120 BPM)
    }
});

// Stopknop event listener
document.getElementById('stopBtn').addEventListener('click', () => {
    clearInterval(intervalId);
    isPlaying = false;
});

// Resetknop event listener
document.getElementById('resetBtn').addEventListener('click', () => {
    clearInterval(intervalId);
    isPlaying = false;
    currentStep = 0;
    document.querySelectorAll('.cell').forEach(cell => {
        cell.classList.remove('active');
    });
});

// Functie om een stap af te spelen
function playStep() {
    const rows = document.querySelectorAll('.row');

    rows.forEach((row, rowIndex) => {
        const cells = row.querySelectorAll('.cell');
        const currentCell = cells[currentStep];

        if (currentCell.classList.contains('active')) {
            const instrument = row.querySelector('.instrument-type').dataset.instrument;
            playSound(instrument);
        }
    });

    currentStep = (currentStep + 1) % 8; // Ga terug naar stap 0 na 8 stappen
}
