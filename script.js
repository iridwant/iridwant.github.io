let body = document.getElementById('body')
let gameTitle = document.getElementById('gameTitle')
let title = document.getElementById('title')
let scoreText = document.getElementById('score')
let btnStart = document.getElementById('btnStart')

let level = 0
let score = 0
let element = ['pyro', 'hydro', 'anemo', 'cryo', 'dendro', 'electro', 'geo']
let color = ['red', 'blue', 'teal', 'lightblue', 'green', 'purple', 'burlywood']

let gamePattern = []
let userPattern = []
let gameStart = false

function sequence() {
    level += 1

    title.innerText = `Level ${level}`

    userPattern = []

    let index = Math.floor(Math.random() * 7)
    let randomElement = element[index]
    let flash = document.getElementById(randomElement)

    setTimeout(() => {
        flash.style.backgroundColor = 'white'

        setTimeout(() => {
            flash.style.backgroundColor = color[index]
        }, 500);
    }, 500);

    gamePattern.push(randomElement)
}

function onClick(currentColor) {
    let pressed = document.getElementById(currentColor)
    let audio = new Audio('sound/click.mp3')

    pressed.classList.add('pressed')

    setTimeout(() => {
        pressed.classList.remove('pressed')
    }, 100);

    audio.play()
}

function checkPattern(currentLevel) {
    if (gamePattern[currentLevel] === userPattern[currentLevel]) {
        console.log('Correct');

        if (gamePattern.length === userPattern.length) {
            setTimeout(() => {
                score += 100 * gamePattern.length
                scoreText.innerText = `Score: ${score}`
                sequence()
            }, 1000);
        }
    } else {
        console.log('Wrong');
        gameOver()
    }
}

function gameOver() {
    body.classList.add('game-over')
    title.innerHTML = `Press <span style="color: red;">'Start'</span> to Begin!`
    gameTitle.classList.add('text-over')
    gameTitle.innerText = `Game Over!`
    scoreText.innerText = `Score: ${score}`

    let audio = new Audio('sound/wrong.mp3')

    setTimeout(() => {
        audio.play()
        body.classList.remove('game-over')
    }, 200);

    btnStart.style.visibility = 'visible'
    btnInstructions.style.visibility = 'visible'
    gameStart = false
}

btnStart.addEventListener("click", function (e) {
    gameStart = true
    btnStart.style.visibility = 'hidden'
    btnInstructions.style.visibility = 'hidden'
    let audio = new Audio('sound/start.mp3')
    audio.play()

    gamePattern = []
    gameTitle.classList.remove('text-over')
    gameTitle.innerText = `Can You Remember the Sequences?`
    level = 0
    score = 0

    setTimeout(() => {
        title.innerText = `Level ${level}`
        scoreText.innerText = `Score: ${score}`
        sequence()
    }, 3000);
})

document.querySelectorAll('.btn').forEach(item => {

    item.addEventListener('click', event => {
        if (gameStart) {
            let elementChosen = item.id
    
            userPattern.push(elementChosen)
            onClick(elementChosen)
            checkPattern(userPattern.length - 1)
        } else {
            alert(`Press 'Start' to begin the game!`)
        }
    })
})