AFRAME.registerComponent('follow', {
  schema: {
    distance: {type: 'vec3'},
    target: {type: 'selector'}
  },
  tick() {
    const targetItem = this.data.target
    var distance = this.data.distance
    var targetPosition = targetItem.getAttribute('position')
    this.el.setAttribute('position',{
      x: targetPosition.x + distance.x,
      y: targetPosition.y + distance.y,
      z: targetPosition.z + distance.z
    })
  }
})
