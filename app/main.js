/**
 * @fileoverview
 * This is our main A-Frame application.
 * It defines the main A-Frame Scene which gets mounted root div.
 */

import { h, Component } from 'preact'
import { Entity, Scene } from 'aframe-react'

const COLORS = ['#D92B6A', '#9564F2', '#FFCF59']

class Main extends Component {
  constructor() {
    super()
    this.state = {
      colorIndex: 0,
      spherePosition: { x: 0.0, y: 4, z: -10.0 },
      color: 'red'
    }
  }

  changeColor() {
    const colors = ['red', 'orange', 'yellow', 'green', 'blue']
    this.setState({
      color: colors[Math.floor(Math.random() * colors.length)]
    })
  }

  _handleClick() {
    this.setState({
      colorIndex: (this.state.colorIndex + 1) % COLORS.length
    })
  }

  render() {
    return (
      <Scene
        effects="bloom, film, fxaa"
        bloom={{ radius: 0.99 }}
        film={{
          sIntensity: 0.15,
          nIntensity: 0.25
        }}
        fxaa
        environment={{
          preset: 'japan',
          seed: 1,
          lightPosition: { x: 200.0, y: 1.0, z: -50.0 },
          fog: 0.8,
          ground: 'canyon',
          groundYScale: 5.0,
          groundTexture: 'none',
          groundColor: '#003462', // 755b5c
          grid: 'none'
        }}
        particle-system={{preset: 'snow', particleCount: 2000}}
      >
        <a-assets>
          <a-asset-item id="mtl" src="3d-objects/pikachu-ball/materials.mtl" />
          <a-asset-item id="pikachu" src="3d-objects/pikachu-ball/model.obj" />
          {/* <audio id="song" src="wave/lightitup.wav" autoplay loop /> */}
        </a-assets>

        {/* <Entity primitive="a-sound" src="#song" />

        <Entity
          audioanalyser={{
            enableBeatDetection: true,
            enableLevels: true,
            enableWaveform: true,
            enableVolume: true,
            fftSize: 2048,
            smoothingTimeConstant: 0.8,
            src: 'selector',
            unique: {default: false}
          }}
          audioanalyser="src: #song"
          audioanalyser-waveform="radius: 0.5"
          rotation="90 0 0"
          position="0 50 0"
        /> */}

          {/* <Entity primitive="a-light" type="ambient" color="#222" /> */}

        {/* <Entity
          primitive="a-light"
          audioanalyser-volume-bind="analyserEl: #analyser; component: light; property: intensity; max: 2.2; multiplier: .018"
          type="point"
          position="1 2 1"
        /> */}

        {/* <Entity primitive="a-light" type="point" position="-2 2 1" /> */}

        <Entity
          class="clickable"
          // lowpoly={{
          //   color: COLORS[this.state.colorIndex],
          //   nodes: true,
          //   opacity: 0.15,
          //   wireframe: true
          // }}
          // primitive="a-octahedron"
          obj-model="obj: #pikachu; mtl: #mtl;"
          scale="5 5 5"
          detail={2}
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

        <Entity primitive="a-camera" look-controls>
          <Entity
            primitive="a-cursor"
            cursor={{ fuse: false }}
            material={{ color: 'white', shader: 'flat', opacity: 0.75 }}
            geometry={{ radiusInner: 0.005, radiusOuter: 0.007 }}
            event-set__1={{
              _event: 'mouseenter',
              scale: { x: 1.4, y: 1.4, z: 1.4 }
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

        {/* <Entity
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
          }} */}
        />
      </Scene>
    )
  }
}

export default Main
