// Minigame - Color Click Challenge

class ColorClickGame {
    constructor() {
        this.score = 0;
        this.timeLeft = 30;
        this.level = 1;
        this.gameActive = false;
        this.gameStarted = false;
        this.squareSize = 4;
        this.squareCount = this.squareSize * this.squareSize;
        this.clickDelay = 800;
        this.timerInterval = null;
        
        this.colors = [
            '#9d4edd',
            '#00d9ff',
            '#ffd60a',
            '#ff006e',
            '#3a86ff',
            '#06ffa5'
        ];
        
        this.initializeGame();
    }
    
    initializeGame() {
        this.startBtn = document.getElementById('startGameBtn');
        this.restartBtn = document.getElementById('restartGameBtn');
        this.gameBoard = document.getElementById('gameBoard');
        this.scoreDisplay = document.getElementById('gameScore');
        this.timeDisplay = document.getElementById('gameTime');
        this.levelDisplay = document.getElementById('gameLevel');
        this.gameMessage = document.getElementById('gameMessage');
        
        this.startBtn.addEventListener('click', () => this.startGame());
        this.restartBtn.addEventListener('click', () => this.startGame());
        
        this.createBoard();
    }
    
    createBoard() {
        this.gameBoard.innerHTML = '';
        this.gameBoard.style.gridTemplateColumns = `repeat(${this.squareSize}, 1fr)`;
        
        for (let i = 0; i < this.squareCount; i++) {
            const square = document.createElement('div');
            square.className = 'game-square';
            square.dataset.index = i;
            square.style.backgroundColor = this.colors[Math.floor(Math.random() * this.colors.length)];
            
            square.addEventListener('click', () => this.handleSquareClick(square));
            
            this.gameBoard.appendChild(square);
        }
    }
    
    startGame() {
        this.score = 0;
        this.timeLeft = 30;
        this.level = 1;
        this.gameActive = true;
        this.gameStarted = true;
        this.clickDelay = 800;
        this.squareSize = 4;
        this.squareCount = 16;
        
        this.startBtn.style.display = 'none';
        this.restartBtn.style.display = 'none';
        this.gameMessage.textContent = '';
        
        this.updateDisplay();
        this.createBoard();
        this.shuffleBoard();
        
        // Start timer
        this.timerInterval = setInterval(() => this.updateTimer(), 1000);
    }
    
    handleSquareClick(square) {
        if (!this.gameActive) return;
        
        // Add click animation
        square.classList.add('clicked');
        setTimeout(() => square.classList.remove('clicked'), 150);
        
        // Increase score
        this.score += (10 * this.level);
        this.updateDisplay();
        
        // Check level progression
        if (this.score % 200 === 0 && this.score > 0) {
            this.levelUp();
        }
        
        // Shuffle and respawn
        setTimeout(() => this.shuffleBoard(), this.clickDelay);
    }
    
    shuffleBoard() {
        if (!this.gameActive) return;
        
        const squares = Array.from(this.gameBoard.children);
        
        // Shuffle array
        for (let i = squares.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [squares[i], squares[j]] = [squares[j], squares[i]];
        }
        
        // Reassign colors randomly
        squares.forEach(square => {
            square.style.backgroundColor = this.colors[Math.floor(Math.random() * this.colors.length)];
            square.classList.remove('active');
            void square.offsetWidth; // Trigger reflow
            square.classList.add('active');
        });
    }
    
    levelUp() {
        this.level++;
        this.clickDelay = Math.max(400, this.clickDelay - 100);
        this.updateDisplay();
        
        // Add level up effect
        const message = document.createElement('div');
        message.className = 'level-up-message';
        message.textContent = `LEVEL ${this.level}!`;
        this.gameBoard.parentElement.appendChild(message);
        
        setTimeout(() => message.remove(), 1500);
    }
    
    updateTimer() {
        this.timeLeft--;
        this.updateDisplay();
        
        if (this.timeLeft <= 0) {
            this.endGame();
        }
    }
    
    endGame() {
        this.gameActive = false;
        clearInterval(this.timerInterval);
        
        this.restartBtn.style.display = 'inline-block';
        
        // Show final message
        const finalScore = this.score;
        const finalLevel = this.level;
        this.gameMessage.innerHTML = `
            <div class="game-over-message">
                <h3>Game Over!</h3>
                <p>Final Score: <strong>${finalScore}</strong></p>
                <p>Final Level: <strong>${finalLevel}</strong></p>
            </div>
        `;
        
        // Disable board
        this.gameBoard.style.pointerEvents = 'none';
        this.gameBoard.style.opacity = '0.5';
    }
    
    updateDisplay() {
        this.scoreDisplay.textContent = this.score;
        this.timeDisplay.textContent = Math.max(0, this.timeLeft);
        this.levelDisplay.textContent = this.level;
    }
}

// Initialize game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ColorClickGame();
});