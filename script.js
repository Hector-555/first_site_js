const getRandomNumInRange = (min, max) => {
    const randomNum = (Math.random() * (max - min) + min).toFixed(0)
    return randomNum
}

const getTask = () => {
    const symbol = (Math.random() > 0.5) ? "+" : "-"
    const task = `${getRandomNumInRange(0, 100)} ${symbol} ${getRandomNumInRange(0, 100)}`
    gameState.rightAnswer = eval(task)
    return task
}

const toggleGameState = () => {
    gameState.taskInProcess = !gameState.taskInProcess
}

const gameElement = document.getElementById('my_game').children
const title = gameElement[0]
const userTask = gameElement[1]
const userAnswer = gameElement[2]
const btnGame = gameElement[3]

const gameState = {
    taskInProcess: false,
    rightAnswer: null, 
}

const startGameFunc = () => {
    if (!gameState.taskInProcess) {
        title.innerText = "Игра началась"
        userAnswer.value = null
        userTask.innerText = getTask()
        userAnswer.hidden = false
        btnGame.innerText = "Проверить"
        toggleGameState()
    } else {
        const isRight = gameState.rightAnswer == userAnswer.value
        userTask.innerText = userTask.innerText + " = " + gameState.rightAnswer
        title.innerText = (isRight) ? "Правильно!" : "Вы ошиблись!"
        btnGame.innerText = "Начать"
        toggleGameState()
    }
}

btnGame.addEventListener("click", startGameFunc)
userAnswer.addEventListener("keydown", (e) => {
    // console.log(e)
    if (e.key === "Enter") {
        startGameFunc ()
    }
    else if (e.key === "Escape") {
        userAnswer.blur()
    }
})


// console.dir(document)

const chooseEl = document.querySelectorAll(".choosed_block-container > div")
const counterEl = document.querySelector(".choosed_block-piece")

// const choosedState = {
//     countElements: 0,
// }

// const changeCount = (value) => {
//     choosedState.countElements += value
//     // то же самое, что и:
//     // choosedState.countElements = choosedState.countElements + value
//     counterEl.innerText = choosedState.countElements
// }

const choosedState = {
    countElements: 0,
    setCountValue (value) {
        this.countElements += value
        counterEl.innerText = this.countElements
    }
}

const eventFunc = (e) => {
    // chooseEl[i].className = "choosed_element"
    if (e.target.className === "") {
        e.target.className = "choosed_element"
        choosedState.setCountValue(1)
    } else {
        e.target.className = ""
        choosedState.setCountValue(-1)
    }
}

for (let i = 0; i < chooseEl.length; i++) {
    chooseEl[i].addEventListener("click", eventFunc)
}

// отключаем обработчик для выбранного элемента:
// chooseEl[2].removeEventListener("click", eventFunc)

// -----------------------------------------------

// const timeIsOver = () => {
//     alert("Время вышло")
// }
// setTimeout(timeIsOver, 2000)

// const alarm = setInterval(timeIsOver, 3000)
// clearInterval(alarm)


// const alarm = setInterval(() => {
//     let wantToSleep = confirm('Хотите ли Вы спать?')
//     if (wantToSleep) {
//         console.log('tic')
//     } else {
//         clearInterval(alarm)
//     }
// }, 3000)

// -----------------------------------------------

// console.log("1")
// setTimeout(() => {
//     console.log("2")
// }, 0)
// console.log("3")

// -----------------------------------------------

const postsBlock = document.querySelector(".posts_block-container")
const showPostsBtn= document.querySelector(".posts_block button")

// fetch('https://jsonplaceholder.typicode.com/posts')
// .then(res => res.json())
// .then(data => {
//     for(el of data) {
//         addPost(el.title, el.body)
//     }
//     // addPost(data[7].title, data[7].body)
// })
// .catch( err => console.log(err.message))

function addPost(title, body) {
    const postTitle = document.createElement("h3")
    const postBody = document.createElement("span")
    const postItem = document.createElement("p")

    postTitle.innerText = title
    postBody.innerText = body

    postItem.append(postTitle, postBody)
    postsBlock.append(postItem)
}

function getPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(data => {
    for(el of data) {
        addPost(el.title, el.body)
    }
    // addPost(data[7].title, data[7].body)
})
    .catch( err => console.log(err.message))
}


// function createPost(title, body, userId) {
//     fetch('https://jsonplaceholder.typicode.com/posts', {
//         method: 'POST',
//         body: JSON.stringify({
//             title,
//             body,
//             userId,
//         }),
//         headers: {
//             'Content-type': 'application/json; charset=UTF-8',
//           },
//     })
//     .then(res => {
//         console.log(res)
//     })
//     .catch( err => console.log(err.message))
//     }

// createPost("title", "body", 15)

showPostsBtn.onclick = () => {getPosts()}