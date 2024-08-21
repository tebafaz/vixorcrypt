<script>
  import modal from "../../stores/modals";
  import { createCanvasModal, closeModal } from "../../constants/modals";
  import { onDestroy } from "svelte";
  import { createCanvas } from "../../handlers/modal";

  let modalDiv;
  let width;
  let heigth;
  const clickOutside = (event) => {
    if (!modalDiv.contains(event.target)) {
      $modal = closeModal;
    }
  };

  $: if ($modal === createCanvasModal) {
    setTimeout(() => {document.addEventListener('click', clickOutside)}, 1)
  } else {
    document.removeEventListener('click', clickOutside);
  }

  onDestroy(() => {
    document.removeEventListener('click', clickOutside);
  });
</script>

<div class='{$modal === createCanvasModal ? '' : 'hidden'} fixed z-10 left-0 top-0 w-full h-full overflow-auto bg-opacity-40 bg-black modal' id='create-canvas-modal'>
  <div bind:this={modalDiv} class='absolute bg-blueGray-light inset-0 m-auto p-8 w-96 h-40 text-center'>
    <span class='text-white'>Width: </span>
    <input bind:value={width} type="number" pattern={'d'} id='canvas-width' /><span class='text-white'>px</span><br /><br />
    <span class='text-white'>Height: </span>
    <input bind:value={heigth} type="number" pattern={'d'} id='canvas-height' /><span class='text-white'>px</span><br />
    <button class='hover:bg-blueGray-medium-light active:bg-blueGray-medium-dark p-1 text-white' on:click={() => {createCanvas(width, heigth); $modal = closeModal}}>Enter</button>
  </div>
</div>