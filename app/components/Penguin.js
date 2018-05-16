import { h } from 'preact'
import { Entity } from 'aframe-react'

/**
* Place individual penguins on scene
*/
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

export default Penguin
