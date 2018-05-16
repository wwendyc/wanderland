/**
 * @fileoverview
 * This file imports all our required packages.
 * It also includes 3rd party A-Frame components.
 * Finally, it mounts the app to the root node.
 */

import 'aframe'
import 'aframe-animation-component'
import 'aframe-event-set-component'
import 'aframe-particle-system-component'
import 'aframe-audioanalyser-component'
import 'aframe-rain'

import './components/aframe-custom'
import './components/aframe-environment'
import './components/aframe-raycaster-refresh'
import './components/aframe-playsound'
import './components/aframe-soundanalyzer'
import './components/aframe-effects'
import './components/audioanalyser-volume-bind'
import './components/audioanalyser-waveform'

import { h, render } from 'preact'
import Main from './main'

document.addEventListener('DOMContentLoaded', () => {
  render(<Main />, document.querySelector('#app'))
})
