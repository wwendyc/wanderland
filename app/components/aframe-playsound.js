/**
 * Plays sound when component is clicked on
 */
AFRAME.registerComponent('playsound', {
  init:function() {
    let playing = false
    let audio = document.querySelector("#pikachu-sound")
    this.el.addEventListener('click', () => {
      audio.play()
    })
 }
})
