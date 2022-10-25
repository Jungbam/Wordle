const answer = [
  'which',
  'there',
  'their',
  'about',
  'would',
  'green',
  'stand',
  'birds',
  'start',
  'river',
  'tried',
  'least',
  'field',
  'whose',
  'girls',
  'leave',
  'added',
  'color',
  'third',
  'hours',
  'moved',
  'plant',
  'doing',
  'names',
  'forms',
  'heavy',
  'ideas',
  'cried',
  'check',
  'floor',
  'uncle',
  'bears',
  'royal',
  'kings',
  'forty',
  'trial',
  'cards',
  'brass',
  'assed',
  'spumy',
  'osier',
  'roble',
]

const checkedfile = () => {
  const checkedfileBox = document.getElementById('check')
  for (i of answer) {
    const file = document.createElement('li')
    file.textContent = i
    checkedfileBox.appendChild(file)
  }
}

const checkArray = {
  //답들중에 랜덤하게 문제 출제
  secret: answer[Math.floor(Math.random() * answer.length)],
  grid: Array(6)
    .fill() // 값을 넣어주려면 fill을 해야함.
    .map(() => Array(5).fill('')),
  currentRow: 0,
  currentCol: 0,
}
const updateGrid = () => {
  for (let i = 0; i < checkArray.grid.length; i++) {
    for (let j = 0; j < checkArray.grid[i].length; j++) {
      const box = document.getElementById(`box${i}${j}`)
      box.textContent = checkArray.grid[i][j]
    }
  }
}

//--------------------------------------------------------------------
const getCurrentWord = () => {
  const checking = checkArray.grid[checkArray.currentRow].reduce(
    (prev, curr) => prev + curr,
  )
  return checking
  // reduce(x,y) : 배열의 값을 점진적으로 줄이면서 계산하는 함수
}
const isWordValid = (word) => {
  console.log(word)
  return answer.includes(word)
}
const revealWord = (word) => {
  const row = checkArray.currentRow
  const animation_duration = 500 // ms

  for (let i = 0; i < 5; i++) {
    const box = document.getElementById(`box${row}${i}`)
    const letter = box.textContent

    setTimeout(() => {
      if (letter === checkArray.secret[i]) {
        box.classList.add('right')
      } else if (checkArray.secret.includes(letter)) {
        box.classList.add('wrong')
      } else {
        box.classList.add('empty')
      }
    }, ((i + 1) * animation_duration) / 2)
    box.classList.add('animated')
    box.style.animationDelay = `${(i * animation_duration) / 2}ms`
  }
  const isWinner = checkArray.secret === word
  const isGameOver = checkArray.currentRow === 5
  setTimeout(() => {
    if (isWinner) {
      alert('축하')
    } else if (isGameOver) {
      alert('아쉽')
    }
  }, 3 * animation_duration)
}
const isLetter = (key) => {
  return key.length === 1 && key.match(/[a-z]/i)
}
const addLetter = (letter) => {
  if (checkArray.currentCol === 5) return
  checkArray.grid[checkArray.currentRow][checkArray.currentCol] = letter
  checkArray.currentCol++
}
const removeLetter = () => {
  if (checkArray.currentCol === 0) return
  checkArray.grid[checkArray.currentRow][checkArray.currentCol - 1] = ''
  checkArray.currentCol--
}

//--------------------------------------------------------------------
// 키보드 입력에 대한 이벤트
const keyboardEventFunc = () => {
  document.body.onkeydown = (e) => {
    const key = e.key
    console.log('hi')
    if (key === 'Enter') {
      //엔터를 눌렀을 때 그 값을 word로 저장
      if (checkArray.currentCol === 5) {
        const word = getCurrentWord() // 현재 눌려진 값으로 저장되는 함수 필요
        if (isWordValid(word)) {
          revealWord(word)
          checkArray.currentRow++
          checkArray.currentCol = 0
        } else {
          alert('다른 단어를 입력하세요.')
        }
      }
    } else if (key === 'Backspace') {
      removeLetter()
    } else if (isLetter(key)) {
      addLetter(key)
    }
    updateGrid()
  }
}
//--------------------------------------------------------------------
// 5x5를 만든다. => 함수로
const drawBasic = (container, row, col, letter = '') => {
  const box = document.createElement('div')
  box.className = 'wordleBox'
  box.id = `box${row}${col}`
  box.textContent = letter
  container.appendChild(box)
}

const drawGame = (container) => {
  const grid = document.createElement('div')
  grid.className = 'grid'
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 5; j++) {
      drawBasic(grid, i, j)
    }
  }
  container.appendChild(grid)
}

const startGame = () => {
  const game = document.getElementById('game')
  drawGame(game)

  keyboardEventFunc()
  checkedfile()
}

startGame()

//--------------------------------------------------------------------
