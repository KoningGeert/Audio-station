// Drum geluiden
const drumSounds = {
    kick: new Audio('sounds/drum/909_KICK.wav'),
    snare: new Audio('sounds/drum/909SNARE.wav'),
    hat: new Audio('sounds/drum/909CLHAT.wav'),
    clap: new Audio('sounds/drum/909_CLAP.wav')
};

// Piano geluiden
const pianoSounds = {
    C4: new Audio('sounds/piano/Toy_Piano_C4_piano_BANDLAB.wav'),
    D: new Audio('sounds/piano/Toy_Piano_D4_piano_BANDLAB.wav'),
    E: new Audio('sounds/piano/Toy_Piano_E4_piano_BANDLAB.wav'),
    F: new Audio('sounds/piano/Toy_Piano_F4_piano_BANDLAB.wav'),
    G: new Audio('sounds/piano/Toy_Piano_G4_piano_BANDLAB.wav'),
    A: new Audio('sounds/piano/Toy_Piano_A5_piano_BANDLAB.wav'),
    B: new Audio('sounds/piano/Toy_Piano_B5_piano_BANDLAB.wav'),
    C5: new Audio('sounds/piano/Toy_Piano_C5_piano_BANDLAB.wav')
};

let currentStep = 0, isPlaying = false, intervalId;

// Functie om geluid af te spelen op basis van het type instrument (piano of drum)
function playSound(instrument, type) {
    let sound;
    if (type === 'piano') {
        sound = pianoSounds[instrument];
    } else if (type === 'drum') {
        sound = drumSounds[instrument];
    }
    if (sound) {
        sound.currentTime = 0;
        sound.play();
    }
}

// Event listeners voor cellen
document.addEventListener('DOMContentLoaded', () => {
    // Bepaal of de gebruiker op de pianopagina of de drumpagina is
    const isPiano = document.getElementById('piano') !== null;
    const type = isPiano ? 'piano' : 'drum';

    // Voeg event listeners toe aan de cellen
    document.querySelectorAll('.cell').forEach(cell => {
        cell.addEventListener('click', () => {
            cell.classList.toggle('active');
        });
    });

    // Startknop event listener
    document.getElementById('startBtn').addEventListener('click', () => {
        if (!isPlaying) {
            isPlaying = true;
            currentStep = 0;
            intervalId = setInterval(() => playStep(type), 500); // 120 BPM
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
        document.querySelectorAll('.cell').forEach(cell => cell.classList.remove('active'));
    });
});

// Functie om elke stap in de sequencer af te spelen
function playStep(type) {
    document.querySelectorAll('.row').forEach(row => {
        const currentCell = row.querySelectorAll('.cell')[currentStep];
        if (currentCell.classList.contains('active')) {
            const instrument = row.querySelector('.instrument-type').textContent.trim();
            playSound(instrument, type);
        }
    });
    currentStep = (currentStep + 1) % 8; // Reset naar stap 0 na 8 stappen
}
