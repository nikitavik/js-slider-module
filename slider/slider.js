export class Slider {
    constructor(selector, options) {
        this.$el = document.querySelector(selector)

        this.options = options

        this.step = options.step
        this.max = options.max
        this.min = options.min


        this.#render()
        this.#setup()
        this.#calc()
    }

    #render() {
        this.$el.classList.add("slider")
        const {progressBar, handleText,} = this.options
        this.$el.innerHTML = this.getTemplate({
            haveProgressBar: progressBar,
            haveHandleText: handleText,
        })
    }

    #setup() {
        this.$bar = this.$el.querySelector('[data-type="bar"]')
        this.$handle = this.$el.querySelector('[data-type="handle"]')
        this.$header = this.$el.querySelector('[data-type="header"]')

        this.dragHandler = this.dragHandler.bind(this)

        this.$bar.addEventListener("mousedown", ()=>{ // Переделай!!!
            window.onmousemove = this.dragHandler
            window.onmouseup = ()=> {window.onmousemove = null}
        }, false)

        // this.$bar.addEventListener("mouseup", ()=>{
        //     window.onmousemove = null
        // }, false)

    }

    dragHandler(event){
        const parentPosition = getPosition(this.$el)
        const xPosition = event.clientX - parentPosition.x
            if (xPosition <= 0){
                this.$handle.style.left = "0%"
                this.$header.style.width = "0%"
            }
            else if (xPosition >= this.$bar.offsetWidth){
                this.$handle.style.left = "100%"
                this.$header.style.width = "100%"
            }
            else {
                this.$handle.style.left = `${100 - (this.$bar.offsetWidth - xPosition) * 100 / this.$bar.offsetWidth}%`
                this.$header.style.width = this.$handle.style.left
            }

        this.handleTextHandler()
        this.#calc()

    }
    handleTextHandler(){
        if (this.options.handleText){
            this.$handleText = this.$el.querySelector('[data-type="handle-text"]')
            this.$handleText.textContent = this.getCurrent
        }
    }

    #calc(){
        const position = this.$handle.style.left.replace("%", '')
        const step = this.step
        const min = this.min
        const max = this.max
        const value = Math.round((max - min) * (+position / 100)) + min

        this.dragHandler = this.dragHandler.bind(this)

        this.current = Math.round(value / step) * step

        return Math.round(value / step) * step
    }


    get getCurrent(){
        return this.current
    }

    set setCurrent(current) {
        if (current >= this.min && current <= this.max) {
            const fraction = current * 100 / this.max
            this.$handle.style.left = `${fraction}%`
            this.$header.style.width = this.$handle.style.left
            this.current = current
            this.handleTextHandler()
        }
        else {
            console.error("Incorrect Value")
        }
    }

    getTemplate(templateOptions) {
        return `
            <div class="slider-bar" data-type="bar" data->
                <div class="slider-header" data-type="header"></div>
                <div class="slider-handle" data-type="handle">
                    ${templateOptions.haveHandleText ? 
                        `<div class="slider-handle-text" data-type="handle-text">${this.min}</div>`
                        : ""}
                </div>
            </div>
        `
    }
}

function getPosition(el) {
    let xPosition = 0;
    let yPosition = 0;

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