document.addEventListener('DOMContentLoaded', () => {
    const screens = document.querySelectorAll('.screen');
    const startButton = document.getElementById('start');
    const restartButtons = document.querySelectorAll('.restart');
    const backButtons = document.querySelectorAll('#back, #back-result');
    const textDisplay = document.getElementById('text-display');
    const textInput = document.getElementById('text-input');
    const timeDisplay = document.getElementById('time');
    const wpmDisplay = document.getElementById('wpm');
    const finalWpmDisplay = document.getElementById('final-wpm');

    let time = 0;
    let wpm = 0;
    let interval;
    let isRunning = false;
    let firstKeyPress = false;

    const texts = [
        "The quick brown fox jumps over the lazy dog.",
        "A journey of a thousand miles begins with a single step.",
        "To be or not to be, that is the question.",
        "All that glitters is not gold.",
        "The pen is mightier than the sword.",
        "A picture is worth a thousand words.",
        "Actions speak louder than words.",
        "The early bird catches the worm.",
        "Better late than never.",
        "Birds of a feather flock together.",
        "A watched pot never boils.",
        "You can't judge a book by its cover.",
        "When in Rome, do as the Romans do.",
        "The grass is always greener on the other side.",
        "Don't count your chickens before they hatch.",
        "A penny saved is a penny earned.",
        "Two wrongs don't make a right.",
        "When the going gets tough, the tough get going.",
        "No man is an island.",
        "The squeaky wheel gets the grease."
    ];

    function getRandomText() {
        return texts[Math.floor(Math.random() * texts.length)];
    }

    function startTest() {
        textDisplay.textContent = getRandomText(); // Display the random sentence in the test screen
        textInput.value = '';
        screens[0].classList.add('up');
        setTimeout(() => {
            screens[0].classList.remove('active');
            screens[1].classList.add('active');
        }, 500);
        resetTestState();
        textInput.focus();
    }

    function resetTestState() {
        time = 0;
        wpm = 0;
        firstKeyPress = false;
        timeDisplay.textContent = '00:00';
        wpmDisplay.textContent = '0';
        clearInterval(interval);
        isRunning = false;
    }

    function startTimer() {
        interval = setInterval(updateTime, 1000);
        isRunning = true; // Ensure isRunning is set to true when the timer starts
    }

    function updateTime() {
        time++;
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        timeDisplay.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        const words = textInput.value.trim().split(/\s+/).length;
        wpm = Math.floor((words / time) * 60);
        wpmDisplay.textContent = wpm;
    }

    function endTest() {
        isRunning = false;
        clearInterval(interval);
        finalWpmDisplay.textContent = wpm;
        hideBackButton(); // Hide the back button on the challenge completion screen
        screens[1].classList.add('up');
        setTimeout(() => {
            screens[1].classList.remove('active');
            screens[2].classList.add('active');
        }, 500);
    }

    function hideBackButton() {
        backButtons.forEach(button => {
            button.style.display = 'none';
        });
    }

    function showBackButton() {
        backButtons.forEach(button => {
            button.style.display = 'inline-block';
        });
    }

    startButton.addEventListener('click', () => {
        startTest();
        showBackButton(); // Show the back button when starting a new test
    });

    restartButtons.forEach(button => {
        button.addEventListener('click', () => {
            screens[2].classList.remove('active'); // Hide the result screen
            screens[1].classList.remove('up'); // Make sure the test screen is in place
            screens[1].classList.add('active'); // Show the test screen again
            startTest(); // Restart the test
            showBackButton(); // Show the back button when restarting the test
        });
    });

    backButtons.forEach(button => {
        button.addEventListener('click', () => {
            textDisplay.textContent = getRandomText(); // Pick another random sentence
            textInput.value = ''; // Clear the input field
            resetTestState(); // Reset the test state without breaking typing functionality
            textInput.focus(); // Focus on the input field
        });
    });

    textInput.addEventListener('input', () => {
        if (!firstKeyPress) {
            firstKeyPress = true;
            startTimer();
        }
        if (isRunning && textInput.value.trim() === textDisplay.textContent.trim()) {
            endTest();
        }
    });
});
