/**
 * @fileoverview
 * This is our custom A-Frame component.
 * It is responsible for adding the outer wireframe mesh
 * and nodes to its vertices.
 */

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

// Single audio context.
var context;
var utils = AFRAME.utils;


/**
 * Audio visualizer system for A-Frame. Share AnalyserNodes between components that share the
 * the `src`.
 */
AFRAME.registerSystem('customizedaudioanalyser', {
  init: function () {
    this.analysers = {};
  },

  getOrCreateAnalyser: function (data) {
    if (!context) { context = new AudioContext(); }
    var analysers = this.analysers;
    var analyser = context.createAnalyser();
    var audioEl = data.src;
    var src = audioEl.getAttribute('src');

    if (analysers[src]) { return analysers[src]; }

    var source = context.createMediaElementSource(audioEl)
    source.connect(analyser);
    analyser.connect(context.destination);
    analyser.smoothingTimeConstant = data.smoothingTimeConstant;
    analyser.fftSize = data.fftSize;

    // Store.
    analysers[src] = analyser;
    return analysers[src];
  }
});

/**
 * Audio visualizer component for A-Frame using AnalyserNode.
 */
AFRAME.registerComponent('customizedaudioanalyser', {
  schema: {
    enableBeatDetection: {default: true},
    enableLevels: {default: true},
    enableWaveform: {default: true},
    enableVolume: {default: true},
    fftSize: {default: 2048},
    smoothingTimeConstant: {default: 0.8},
    src: {type: 'selector'},
    unique: {default: false}
  },

  init: function () {
    this.analyser = null;
    this.levels = null;
    this.waveform = null;
    this.volume = 0;
  },

  update: function () {
    var data = this.data;
    var self = this;
    var system = this.system;

    if (!data.src) { return; }

    // Get or create AnalyserNode.
    if (data.unique) {
      init(system.createAnalyser(data));
    } else {
      init(system.getOrCreateAnalyser(data));
    }

    function init (analyser) {
      self.analyser = analyser;
      self.levels = new Uint8Array(self.analyser.frequencyBinCount);
      self.waveform = new Uint8Array(self.analyser.fftSize);
      self.el.emit('audioanalyser-ready', {analyser: analyser});
    }
  },

  /**
   * Update spectrum on each frame.
   */
  tick: function () {
    var data = this.data;
    if (!this.analyser) { return; }

    // Levels (frequency).
    if (data.enableLevels || data.enableVolume) {
      this.analyser.getByteFrequencyData(this.levels);
    }

    // Waveform.
    if (data.enableWaveform) {
      this.analyser.getByteTimeDomainData(this.waveform);
    }

    // Average volume.
    if (data.enableVolume || data.enableBeatDetection) {
      var sum = 0;
      for (var i = 0; i < this.levels.length; i++) {
        sum += this.levels[i];;
      }
      this.volume = sum / this.levels.length;
    }

    // Beat detection.
    if (data.enableBeatDetection) {
      var BEAT_DECAY_RATE = 0.99;
      var BEAT_HOLD = 60;
      var BEAT_MIN = 0.15;  // Volume less than this is no beat.

      volume = this.volume;
      if (!this.beatCutOff) { this.beatCutOff = volume; }
      if (volume > this.beatCutOff && volume > BEAT_MIN) {
        console.log('[audioanalyser] Beat detected.');
        this.el.emit('audioanalyser-beat');
        this.beatCutOff = volume * 1.5;
        this.beatTime = 0;
      } else {
        if (this.beatTime <= BEAT_HOLD) {
          this.beatTime++;
        } else {
          this.beatCutOff *= BEAT_DECAY_RATE;
          this.beatCutOff = Math.max(this.beatCutOff, BEAT_MIN);
        }
      }
    }
  }
});

/**
   * Polygon mesh
   */
AFRAME.registerComponent('lowpoly', {
  schema: {
    // Here we define our properties, their types and default values
    color: { type: 'string', default: '#FFF' },
    nodes: { type: 'boolean', default: false },
    opacity: { type: 'number', default: 1.0 },
    wireframe: { type: 'boolean', default: false }
  },

  init: function() {
    // Get the ref of the object to which the component is attached
    const obj = this.el.getObject3D('mesh')

    // Grab the reference to the main WebGL scene
    const scene = document.querySelector('a-scene').object3D

    // Modify the color of the material
    obj.material = new THREE.MeshPhongMaterial({
      // color: this.data.color,
      shading: THREE.FlatShading
    })

    // Define the geometry for the outer wireframe
    const frameGeom = new THREE.OctahedronGeometry(2.5, 2)

    // Define the material for it
    const frameMat = new THREE.MeshPhongMaterial({
      color: '#FFFFFF',
      opacity: this.data.opacity,
      transparent: true,
      wireframe: true
    })

    // The final mesh is a composition of the geometry and the material
    const icosFrame = new THREE.Mesh(frameGeom, frameMat)

    // Set the position of the mesh to the position of the sphere
    const { x, y, z } = obj.position
    icosFrame.position.set(0.0, 4, -10.0)

    // If the wireframe prop is set to true, then we attach the new object
    if (this.data.wireframe) {
      scene.add(icosFrame)
    }

    // If the nodes attribute is set to true
    if (this.data.nodes) {
      let spheres = new THREE.Group()
      let vertices = icosFrame.geometry.vertices

      // Traverse the vertices of the wireframe and attach small spheres
      for (var i in vertices) {
        // Create a basic sphere
        let geometry = new THREE.SphereGeometry(0.045, 16, 16)
        let material = new THREE.MeshBasicMaterial({
          color: '#FFFFFF',
          opacity: this.data.opacity,
          shading: THREE.FlatShading,
          transparent: true
        })

        let sphere = new THREE.Mesh(geometry, material)
        // Reposition them correctly
        sphere.position.set(
          vertices[i].x,
          vertices[i].y + 4,
          vertices[i].z + -10.0
        )

        spheres.add(sphere)
      }
      scene.add(spheres)
    }

    // If the nodes attribute is set to true
    if (this.data.nodes) {
      let sphere = new THREE.Group()
    }

    // This block gets executed when the component gets initialized.
    // Then we can use our properties like so:
    console.log('The color of our component is ', this.data.color)
  },

  update: function() {
    // Get the ref of the object to which the component is attached
    const obj = this.el.getObject3D('mesh')

    // Modify the color of the material during runtime
    obj.material.color = new THREE.Color(this.data.color)
  }
})


/**
 * Set properties if headset is not connected by checking getVRDisplays().
 */
AFRAME.registerComponent('if-no-vr-headset', {
  schema: {
    default: {},
    parse: utils.styleParser.parse
  },

  update: function () {
    var self = this;

    // Don't count mobile as VR.
    if (this.el.sceneEl.isMobile) {
      this.setProperties();
      return;
    }

    // Check VRDisplays to determine if headset is connected.
    navigator.getVRDisplays().then(function (displays) {
      // Special case for WebVR emulator.
      if (displays.length && displays[0].displayName !== 'Emulated HTC Vive DVT') { return; }
      self.setProperties();
    });
  },

  setProperties: function () {
    var data = this.data;
    var el = this.el;
    Object.keys(data).forEach(function set (component) {
      el.setAttribute(component, data[component]);
    });
  }
});
