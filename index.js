import "/slider/slider.scss"
import {Slider} from "./slider/slider"

const slider = new Slider("#slider", {
        min: 10,
        max: 500,
        step: 10,
        progressBar: true,
        handleText: true,


    }
)

window.s = slider

const slider2 = new Slider("#slider2", {
        min: 10,
        max: 500,
        step: 10,
        progressBar: true,
        handleText: false,

    }
)
window.s2 = slider2
