<script>
  import modal from "../../stores/modals"
  import { createCanvasModal, closeModal } from "../../constants/modals"
  import canvas from "../../stores/encrypt/canvas"
  import { onMount } from "svelte";

  let modalDiv
  let width
  let heigth

  let min = 1
  let max = 1920

  const clickOutside = (event) => {
    if (!modalDiv.contains(event.target)) {
      $modal = closeModal
    }
  }

  const createCanvas = (width, height) => {
    if (width >= min && width <= max && height >= min && height <= max) {
      let tempCanvas = {
      initialized: true,
      sizeX: width,
      sizeY: height,
    }
    canvas.set(tempCanvas)
    $modal = closeModal
    } else {
      alert('width or height is not in allowed range')
    }
    
  }

  onMount(() => {
    
    setTimeout(() => {document.addEventListener('click', clickOutside)}, 1)
    return () => {
      document.removeEventListener('click', clickOutside)
    }
  })

</script>

<div class='fixed z-10 left-0 top-0 w-full h-full overflow-auto bg-opacity-40 bg-black modal' id='create-canvas-modal'>
  <div bind:this={modalDiv} class='absolute bg-blueGray-light inset-0 m-auto p-8 w-96 h-40 text-center'>

    <input bind:value={width} min={min} max={max} type="number" pattern={'d'} id='canvas-width' placeholder=" width" class="invalid:bg-red-400 w-52" /><span class='text-white'>px</span><br /><br />
    <input bind:value={heigth} min={min} max={max} type="number" pattern={'d'} id='canvas-height' placeholder=" height" class="invalid:bg-red-400 w-52" /><span class='text-white'>px</span><br />
    <span class='text-xs text-red-400'>min={ min } max={ max }</span><br />

    <button class='hover:bg-blueGray-medium-light active:bg-blueGray-medium-dark p-1 text-white' on:click={() => {createCanvas(width, heigth)}}>Enter</button>
  </div>
</div>
