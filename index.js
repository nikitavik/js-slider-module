import "/slider/slider.scss"
import {Slider} from "./slider/slider"

const slider = new Slider("#slider", {
        min: 1,
        max: 100,

    }
)

window.s = slider
