import { h } from 'preact'
import { Entity } from 'aframe-react'

const Penguin = props => {
  return (
    <Entity position={props.data.fromPos}>
      <Entity
        obj-model="obj: #penguin; mtl: #penguin-mtl;"
        position={props.data.toPos}
      />
      <a-animation
        attribute="rotation"
        dur={props.data.duration}
        fill="forwards"
        to="0 360 0"
        easing={props.data.easing}
        repeat="indefinite"
      />
    </Entity>
  )
}

// console.log('penguin props.data ', props.data)
// {id: 1, fromPos: "-15 0.5 -7", toPos: "0 0.5 -2", duration: "15000", easing: "linear"}

export default Penguin
