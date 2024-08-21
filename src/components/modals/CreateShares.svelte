<script>
  import modal from "../../stores/modals";
  import { closeModal, createSharesModal } from "../../constants/modals";
  import { onDestroy } from "svelte";
  import { createShares } from "../../handlers/modal";

  const minShares = 2;
  const maxShares = 1000;
  let modalDiv;
  let sharesValue = minShares;
  const clickOutside = (event) => {
    if (!modalDiv.contains(event.target)) {
      $modal = closeModal;
    }
  };
  const enterHandler = () => {
    if (minShares <= sharesValue && sharesValue <= maxShares) {
      createShares(sharesValue); 
      $modal = closeModal;
    }
  }

  $: if ($modal === createSharesModal) {
    setTimeout(() => {document.addEventListener('click', clickOutside)}, 1)
  } else {
    document.removeEventListener('click', clickOutside);
  }

  onDestroy(() => {
    document.removeEventListener('click', clickOutside);
  });
</script>

<div class='{$modal === createSharesModal ? '' : 'hidden'} fixed z-10 left-0 top-0 w-full h-full overflow-auto bg-opacity-40 bg-black modal' id='create-canvas-modal'>
  <div bind:this={modalDiv} class='absolute bg-blueGray-light inset-0 m-auto p-8 w-96 h-40 text-center'>
    <span class='text-white'>Write the number of shares</span>
    <input bind:value={sharesValue} type="number" max={ maxShares } min={ minShares } pattern={'d'} class='invalid:bg-red-500 m-2' id='layer-count' /><br />
    <span class='text-xs text-red-400'>min={ minShares } max={ maxShares }</span><br />
    <button class='hover:bg-blueGray-medium-light active:bg-blueGray-medium-dark p-1 text-white' on:click={enterHandler}>Enter</button>
  </div>
</div>