/**
 * @fileoverview
 * This is our custom A-Frame component.
 * It is responsible for adding the outer wireframe mesh
 * and nodes to its vertices.
 */

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.')
}

var utils = AFRAME.utils

/**
 * Set properties if headset is not connected by checking getVRDisplays().
 */
AFRAME.registerComponent('if-no-vr-headset', {
  schema: {
    default: {},
    parse: utils.styleParser.parse
  },

  update: function () {
    var self = this

    // Don't count mobile as VR.
    if (this.el.sceneEl.isMobile) {
      this.setProperties()
      return
    }

    // Check VRDisplays to determine if headset is connected.
    navigator.getVRDisplays().then(function (displays) {
      // Special case for WebVR emulator.
      if (displays.length && displays[0].displayName !== 'Emulated HTC Vive DVT') { return }
      self.setProperties()
    })
  },

  setProperties: function () {
    var data = this.data
    var el = this.el
    Object.keys(data).forEach(function set (component) {
      el.setAttribute(component, data[component])
    })
  }
})

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
