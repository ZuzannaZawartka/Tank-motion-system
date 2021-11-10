class Coords {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

function showTank(container, tank) {
    const tankElement = document.createElement('img')
    tankElement.style.position = 'absolute'
    tankElement.style.left = tank.position.x + 'px'
    tankElement.style.top = tank.position.y + 'px'

    tankElement.style.transform = `rotate(${tank.rotation}deg)`

    tankElement.style.width = tank.size.x + 'px'
    tankElement.style.height = tank.size.y + 'px'

    tankElement.src = tank.src

    container.innerHTML = ''
    container.appendChild(tankElement)
}

function handleEvents(keymap, tank) {
    window.addEventListener('keydown', event => tank.moves.add(Object.keys(keymap).find(key => keymap[key].includes(event.key))))
    window.addEventListener('keyup', event => tank.moves.delete(Object.keys(keymap).find(key => keymap[key].includes(event.key))))
}

function moveTank(tank, moveBy) {
    const rad = tank.rotation * ( Math.PI / 180 )

    tank.position = new Coords(
        tank.position.x - moveBy * Math.sin(rad),
        tank.position.y + moveBy * Math.cos(rad)
    )
}

function init() {
    const container = document.getElementsByClassName('container')[0]
    const keymap = {
        UP: [ 'ArrowUp', 'w', 'W' ],
        DOWN: [ 'ArrowDown', 's', 'S' ],
        RIGHT: [ 'ArrowRight', 'd', 'D' ],
        LEFT: [ 'ArrowLeft', 'a', 'A' ],
    }

    const tank = {
        size: new Coords(100, 100),
        position: new Coords(300, 600),
        speed: 5,
        rotation: 0,
        rotationSpeed: 5,
        moves: new Set(),
        src: 'tank_model.jpg'
    }

    let FPS = 60
    
    showTank(container, tank)
    handleEvents(keymap, tank)

    setInterval(() => {
        if(tank.moves.has('RIGHT')) tank.rotation += tank.rotationSpeed
        if(tank.moves.has('LEFT')) tank.rotation -= tank.rotationSpeed
        if(tank.moves.has('UP')) moveTank(tank, -tank.speed)
        if(tank.moves.has('DOWN')) moveTank(tank, tank.speed)

        showTank(container, tank)
    }, 1000 / FPS);
}

init()