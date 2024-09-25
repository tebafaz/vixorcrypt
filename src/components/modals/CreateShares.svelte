<script>
  import modal from "../../stores/modals"
  import { closeModal, createSharesModal } from "../../constants/modals"
  import { onDestroy, onMount, tick } from "svelte"
  import shares from "../../stores/encrypt/shares"
  import { defaultState } from "../../constants/shareState"

  const minShares = 2
  const maxShares = 1000
  let modalDiv
  let sharesValue = minShares
  
  const clickOutside = async (event) => {
    if (!modalDiv.contains(event.target)) {
      $modal = closeModal
    }
  }
  const enterHandler = () => {
    if (minShares <= sharesValue && sharesValue <= maxShares) {
      createShares($shares, sharesValue) 
      $modal = closeModal
    } else {
      alert('shares are not in allowed range')
    }
  }

  const createShares = (oldShares, shareNumber) => {
    let tempShares = new Map()
    for (let i = 0; i < shareNumber; i++) {
      if (oldShares.has(i)) {
        tempShares.set(i, oldShares.get(i))
      } else {
        tempShares.set(i, {state: defaultState, picked: false})
      }
    }
    for (let [key, val] of oldShares.entries()) {
      if (key < shareNumber) {
        continue
      }
      tempShares.set(key, val)
    }
    
    shares.set(tempShares)
  }

  onMount(() => {
    
    setTimeout(() => {document.addEventListener('click', clickOutside)}, 1)
    return () => {
      document.removeEventListener('click', clickOutside)
    }
  })

</script>

<div class='fixed z-10 left-0 top-0 w-full h-full overflow-auto bg-opacity-40 bg-black modal' id='create-canvas-modal'>
  <div bind:this={modalDiv} class='absolute bg-blueGray-light inset-0 m-auto p-8 w-96 h-40 text-center' on:loadstart={() => {document.addEventListener('click', clickOutside)}}>
    <span class='text-white'>Write the number of shares</span>
    <input bind:value={sharesValue} type="number" max={ maxShares } min={ minShares } pattern={'d'} class='invalid:bg-red-400 m-2' id='layer-count' /><br />
    <span class='text-xs text-red-400'>min={ minShares } max={ maxShares }</span><br />
    <button class='hover:bg-blueGray-medium-light active:bg-blueGray-medium-dark p-1 text-white' on:click={enterHandler}>Enter</button>
  </div>
</div>