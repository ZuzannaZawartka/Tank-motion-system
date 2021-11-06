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

function handleEvents(keymap, container, tank) {
    window.addEventListener('keydown', event => {
        switch(Object.keys(keymap).find(key => keymap[key].includes(event.key))) {
            case 'RIGHT':
                tank.rotation += tank.rotationSpeed
            break
            case 'LEFT':
                tank.rotation -= tank.rotationSpeed
            break
            case 'UP':
                moveTank(tank, -tank.speed)
            break
            case 'DOWN':
                moveTank(tank, tank.speed)
            break
        }

        showTank(container, tank)
    })
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
        src: 'tank_model.jpg'
    }
    
    showTank(container, tank)
    handleEvents(keymap, container, tank)
}

init()