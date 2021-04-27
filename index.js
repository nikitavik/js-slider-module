import "/slider/slider.scss"
import {Slider} from "./slider/slider"

const slider = new Slider("#slider", {
        min: 10,
        max: 500,
        step: 10,
        handleText: true,

        range: true,
        scale: true,
        progressBar: true,

    }
)

window.s = slider

const slider2 = new Slider("#slider2", {
        min: 200,
        max: 500,
        step: 20,
        handleText: true,

        range: false,
        scale: false,
        progressBar: true,
    }
)
window.s2 = slider2
