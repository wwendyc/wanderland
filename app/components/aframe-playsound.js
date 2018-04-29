/**
 * Plays sound when component is clicked on
 */
AFRAME.registerComponent('playSound', {
  init:function() {
    let playing = false
    let audio = document.querySelector("#pikachu-sound")
    this.el.addEventListener('click', () => {
      audio.play()
        //  if(!playing) {
        //      audio.play()
        //   } else {
        //      audio.pause()
        //      audio.currentTime = 0
        //   }
        //   playing = !playing
    })
 }
})
