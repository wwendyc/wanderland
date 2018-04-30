/**
 * @fileoverview
 * This is our main A-Frame application.
 * It defines the main A-Frame Scene which gets mounted root div.
 */

import { h, Component } from 'preact'
import { Entity, Scene } from 'aframe-react'
import Penguin from './components/Penguin'

const COLORS = ['#D92B6A', '#9564F2', '#FFCF59']
const penguinData = [{id: 1, fromPos: "-15 0.5 -7", toPos: "0 0.5 -2", duration: "15000", easing: "linear"}, {id: 2, fromPos: "10 0.5 -2", toPos: "-15 0.5 -3", duration: "30000", easing: "ease-in-out"}, {id: 3, fromPos: "8 0.5 -5", toPos: "15 0.5 -7", duration: "30000", easing: "ease-in-out"}]

class Main extends Component {
  constructor() {
    super()
    this.state = {
      spherePosition: { x: 0.0, y: 7, z: -10.0 },
      colorIndex: 0,
      color: 'red'
    }
  }

  _handleClick() {
    this.setState({
      colorIndex: (this.state.colorIndex + 1) % COLORS.length
    })
  }

  render() {
    return (
      <a-scene
        raycaster-refresh
        environment={{
          preset: 'japan',
          seed: 1,
          skyType: 'gradient',
          skyColor: '#A5F2F3',
          shadow: true,
          lightPosition: { x: 200.0, y: 1.0, z: -50.0 },
          fog: 0.8,
          ground: 'canyon',
          groundYScale: 5.0,
          groundTexture: 'none',
          groundColor: '#003462', // land: 755b5c, ocean: 003462, ice: A5F2F3
          grid: 'none'
        }}
        rain={{
          color: '#ffffff',
          vector: { x: -1.0, y: -2.0, z: 0.0 },
          count: 5000,
          opacity: 1,
          splash: false,
          width: 60,
          dropHeight: 0.2
        }}
        // effects="bloom, film, fxaa"
        // bloom={{ radius: 0.99 }}
        // film={{
        //   sIntensity: 0.15,
        //   nIntensity: 0.25
        // }}
        // fxaa
        particle-system={{preset: 'snow', particleCount: 2000}}
      >
        <a-assets>
          <a-asset-item id="mtl" src="3d-objects/pikachu-ball/materials.mtl" />
          <a-asset-item
            id="pikachu-ball"
            src="3d-objects/pikachu-ball/model.obj"
          />
          <a-asset-item id="pug-mtl" src="3d-objects/pug/pug.mtl" />
          <a-asset-item id="pug" src="3d-objects/pug/pug.obj" />
          <a-asset-item
            id="penguin-mtl"
            src="3d-objects/penguin-poly/penguin.mtl"
          />
          <a-asset-item
            id="penguin"
            src="3d-objects/penguin-poly/penguin.obj"
          />
          <a-asset-item
            id="polarbear-mtl"
            src="3d-objects/polar-bear/bear_animation.mtl"
          />
          <a-asset-item
            id="polarbear"
            src="3d-objects/polar-bear/bear_animation.obj"
          />
          <a-asset-item
            id="arctic-fox-mtl"
            src="3d-objects/arctic-fox/ArcticFox_Posed.mtl"
          />
          <a-asset-item
            id="arctic-fox"
            src="3d-objects/arctic-fox/ArcticFox_Posed.obj"
          />
          <a-asset-item
            id="cat-tubs-mtl"
            src="3d-objects/cat-tubs/cat-tubs.mtl"
          />
          <a-asset-item
            id="cat-tubs"
            src="3d-objects/cat-tubs/cat-tubs.obj"
          />
          <a-asset-item
            id="igloo-mtl"
            src="3d-objects/igloo/igloo.mtl"
          />
          <a-asset-item
            id="igloo"
            src="3d-objects/igloo/igloo.obj"
          />
          <audio id="pikachu-sound" src="sound/pikachu-sound.mp3" />
          <audio id="song" src="sound/yourhandinmine.mp3" autoplay loop />
        </a-assets>

        <Entity
          customizedaudioanalyser={{
            enableBeatDetection: true,
            enableLevels: true,
            enableWaveform: true,
            enableVolume: true,
            fftSize: 2048,
            smoothingTimeConstant: 0.8,
            src: 'selector',
            unique: { default: false }
          }}
          audioanalyser="src: #song"
          audioanalyser-waveform="radius: 0.5"
          rotation="90 0 0"
          position="0 0.5 -10"
        />

        <Entity
          obj-model="obj: #pikachu-ball; mtl: #mtl;"
          class="clickable"
          playSound
          scale="5 5 5"
          radius={2}
          position={this.state.spherePosition}
          events={{
            click: this._handleClick.bind(this)
          }}
          animation__rotate={{
            property: 'rotation',
            dur: 30000,
            easing: 'linear',
            loop: true,
            to: { x: 0, y: 360, z: 0 }
          }}
          animation__oscillate={{
            property: 'position',
            dur: 2000,
            dir: 'alternate',
            easing: 'linear',
            loop: true,
            from: this.state.spherePosition,
            to: {
              x: this.state.spherePosition.x,
              y: this.state.spherePosition.y + 0.25,
              z: this.state.spherePosition.z
            }
          }}
        />

        <Entity
          obj-model="obj: #pug; mtl: #pug-mtl;"
          rotation="0 -60 0"
          scale="0.3 0.3 0.3"
          follow={{
            target: "#player",
            distance: { x: 2, y: -1, z: -2 }
          }}
          animation__rotate={{
            property: 'rotation',
            dir: 'alternate',
            delay: 1000,
            dur: 3000,
            easing: 'linear',
            loop: true,
            from: { x: 0, y: -70, z: 0 },
            to: { x: 0, y: -90, z: 0 },
          }}
        />

        <Entity
          obj-model="obj: #polarbear; mtl: #polarbear-mtl;"
          scale="0.3 0.3 0.3"
          animation__rotate={{
            property: 'position',
            dir: 'alternate',
            dur: 40000,
            easing: 'linear',
            loop: true,
            from: { x: -25, y: 0.5, z: -5 },
            to: { x: -5, y: 0.5, z: 10 },
          }}
        />

        {
          penguinData.map(penguin => <Penguin key={penguin.id} data={penguin} />)
        }

        {/* <Entity
            obj-model="obj: #penguin-baby; mtl: #penguin-baby-mtl;"
            // scale="2 2 2"
            position="0 3.5 -3"
          /> */}

        <Entity
          primitive="a-light"
          type="directional"
          color="#FFF"
          intensity={1}
          position={{ x: 2.5, y: 0.0, z: 0.0 }}
          animation__oscillate={{
            property: 'position',
            dur: 2000,
            dir: 'alternate',
            easing: 'linear',
            loop: true,
            from: { x: 2.5, y: 0.0, z: 0.0 },
            to: { x: 3.0, y: 0.25, z: 0.0 }
          }}
        />

        <Entity id="player" primitive="a-camera" wasd-controls look-controls>
          <Entity
            primitive="a-cursor"
            cursor={{ fuse: false }}
            material={{ color: 'white', shader: 'flat', opacity: 0.75 }}
            geometry={{ radiusInner: 0.005, radiusOuter: 0.007 }}
            event-set__1={{
              _event: 'mouseenter',
              scale: { x: 3.4, y: 3.4, z: 3.4 }
            }}
            event-set__1={{
              _event: 'mouseleave',
              scale: { x: 1, y: 1, z: 1 }
            }}
            raycaster={{
              objects: '.clickable'
            }}
          />
        </Entity>
      </a-scene>
    )
  }
}

export default Main

// additional lights
/*
 <Entity primitive="a-light" type="ambient" color="#222" />

<Entity
  primitive="a-light"
  audioanalyser-volume-bind="analyserEl: #analyser; component: light; property: intensity; max: 2.2; multiplier: .018"
  type="point"
  position="1 2 1"
/>

<Entity primitive="a-light" type="point" position="-2 2 1" />
*/

// testing out renders using aframe instead of aframe-react
/* <a-entity
  geometry="primitive: octahedron"
  detail={2}
  radius={5}
  position={this.state.spherePosition}
  color="#FAFAF1"
/> */

/* <a-entity id="customizedaudioanalyser"
  audioanalyser="src: #song"
  audioanalyser-waveform="radius: 0.5"
  rotation="90 0 0"
  position="0 50 0"
></a-entity> */

// polygon
/*
  <Entity
    class="clickable"
    lowpoly={{
      color: COLORS[this.state.colorIndex],
      nodes: true,
      opacity: 0.15,
      wireframe: true
    }}
    primitive="a-octahedron"
    detail={2}
    radius={2}
    position={this.state.spherePosition}
    color="#FAFAF1"
    events={{
      click: this._handleClick.bind(this)
    }}
    animation__rotate={{
      property: 'rotation',
      dur: 60000,
      easing: 'linear',
      loop: true,
      to: { x: 0, y: 360, z: 0 }
    }}
    animation__oscillate={{
      property: 'position',
      dur: 2000,
      dir: 'alternate',
      easing: 'linear',
      loop: true,
      from: this.state.spherePosition,
      to: {
        x: this.state.spherePosition.x,
        y: this.state.spherePosition.y + 0.25,
        z: this.state.spherePosition.z
      }
    }}
  />
*/

/*
sound={{
  src: '#pikachu-sound',
  on: 'click'
}}
*/

// movements
/*
<a-entity position="-5 0.5 -7">
  <Entity primitive="a-box" color="red" position="0 -1 0" />
  <a-animation
    attribute="rotation"
    dur="4000"
    fill="forwards"
    to="0 360 360"
    repeat="indefinite"
  />
</a-entity>
*/
