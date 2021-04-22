const getTemplate = () => {
    return `
    <div class="slider-bar" data-type="bar" data->
        <span class="slider-handle" data-type="handle"></span>
    </div>
    `
}

export class Slider {
    constructor(selector, options) {
        this.$el = document.querySelector(selector)

        this.max = options.max
        this.min = options.min

        this.#render()
        this.#setup()
    }
    #render() {
        this.$el.classList.add("slider")
        this.$el.innerHTML = getTemplate()
    }
    #setup() {
        this.$bar = this.$el.querySelector('[data-type="bar"]')
        this.$handle = this.$el.querySelector('[data-type="handle"]')

        this.dragHandler = this.dragHandler.bind(this)

        this.$bar.addEventListener("mousedown", ()=>{
            window.onmousemove = this.dragHandler
        }, false)
        this.$bar.addEventListener("mouseup", ()=>{
            window.onmousemove = null
        }, false)

    }
    dragHandler(event){
        const parentPosition = getPosition(this.$el)
        let xPosition = event.clientX - parentPosition.x
            if (xPosition <= 0){
                this.$handle.style.right = `${100}%`

            }
            else if (xPosition >= this.$bar.offsetWidth){
                this.$handle.style.right = `${0}%`
            }
            else {
                this.$handle.style.right = `${Math.abs((xPosition - this.$bar.offsetWidth)) * 100 / this.$bar.offsetWidth}%`
            }

    }


}

function getPosition(el) {
    var xPosition = 0;
    var yPosition = 0;

    while (el) {
        xPosition += (el.offsetLeft - el.scrollLeft + el.clientLeft);
        yPosition += (el.offsetTop - el.scrollTop + el.clientTop);
        el = el.offsetParent;
    }
    return {
        x: xPosition,
        y: yPosition
    };
}