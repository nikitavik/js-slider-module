import "/slider/slider.scss"
import {Slider} from "./slider/slider"

const slider = new Slider("#slider", {
        min: 10,
        max: 500,
        step: 10,

    }
)

window.s = slider
