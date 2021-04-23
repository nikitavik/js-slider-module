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

        this.step = options.step
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

        this.$handle.style.right = `${100}%` // default position

        this.$bar.addEventListener("mousedown", ()=>{
            window.onmousemove = this.dragHandler
            window.onmouseup = ()=> {window.onmousemove = null}
        }, false)
        // this.$bar.addEventListener("mouseup", ()=>{
        //     window.onmousemove = null
        // }, false)

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
                this.$handle.style.right = `${(this.$bar.offsetWidth - xPosition) * 100 / this.$bar.offsetWidth}%`
            }

            this.calc()
    }
    calc(){
        const position = this.$handle.style.right.replace("%", '')

        const step = this.step
        const min = this.min
        const max = this.max

        let value = Math.round((max - min) * (+position / 100)) + min

        let result = Math.round(value / step) * step

        document.getElementById("value").textContent = result
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