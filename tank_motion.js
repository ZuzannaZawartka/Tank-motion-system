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
    container.appendChild(tankElement)
}

function init() {
    const container = document.getElementsByClassName('container')[0]

    const tank = {
        size: new Coords(100, 100),
        position: new Coords(300, 600),
        rotation: 45,
        src: 'tank_model.jpg'
    }

    showTank(container, tank)
}

init()