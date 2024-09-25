<script>
  import shares from "../../stores/encrypt/shares"
  import { shareState, defaultState, usedState } from "../../constants/shareState"
  import encryptionInput from "../../stores/encrypt/encryption"
  import modal from "../../stores/modals"
  import { createSharesModal } from "../../constants/modals"
  import results from "../../stores/encrypt/results"
  import canvasProps from "../../stores/encrypt/canvas";

  $: changeState($results, $shares)

  const changeState = (res, shrs) => {
    for (let [key, val] of shrs.entries()) {
      val.state = defaultState
      shrs.set(key, val)
    }
    for (let [_, val] of res.entries()) {
      const len = val.shares.length

      for (let i = 0; i < len; i++) {
        let val1 = shrs.get(val.shares[i])
        val1.state = usedState
        shrs.set(val.shares[i], val1)
      }
    }
    shares.set(shrs)
  }

  export const openCreateShares = () => {
    modal.set(createSharesModal)
  }

  const pickHandler = (key, val) => {
    let valProps = shareState.get(val.state)
    if ($encryptionInput.stateEncrypting === true && val.reusable) {
      let newMap = new Map($shares)
      let val = $shares.get(key)
      val.picked = !val.picked
      newMap.set(key, val)
      shares.set(newMap)
    } else if (valProps.removable) {
      let newMap = new Map($shares)
      let val = $shares.get(key)
      val.picked = !val.picked
      newMap.set(key, val)
      shares.set(newMap)
    }
  }

  const removeHandler = () => {
    if ($encryptionInput.stateEncrypting === true) {
      return 
    }
    let newMap = new Map($shares)
    for (let [key, val] of newMap.entries()) {
      if (val.state === defaultState && val.picked) {
        newMap.delete(key)
      }
    }
    shares.set(newMap)
  }

</script>

<div class='flex flex-col h-1/3 bg-blueGray-light'>
  <span class='flex-none pl-2 pointer-events-none text-white'>
    Shares
  </span>
  <div class='flex-auto'>
    <!-- start inner overflow item -->
    <div class="relative w-full h-full bg-blueGray-medium-light">
      <div class='absolute inset-0 overflow-auto'>
        <div class='ml-1 grid grid-cols-10 place-content-start gap-1'>
          <!-- images -->
          {#each $shares as [key, val] (key) }
            <div role="cell" tabindex="0" class="my-1 text-center hover:cursor-pointer bg-blueGray-light text-white border {$encryptionInput.stateEncrypting && val.picked ? 'border-cyan-300' : val.state === usedState ? 'border-cyan-600' : !$encryptionInput.stateEncrypting && val.picked ? 'border-gray-300' : 'border-gray-600'}" on:click={() => {pickHandler(key, val)}} on:keypress={() => {pickHandler(key, val)}}>
              {key}
            </div>
          {/each}
        </div>
      </div>
    </div>
    <!-- end inner overflow item -->
  </div>
  <div class='flex h-7 items-center'>
    {#if $canvasProps.initialized}
      <button class='mx-1 bg-blueGray-light hover:bg-blueGray-medium-light active:bg-blueGray-medium-dark px-2' on:click={openCreateShares}>
        <span class='text-white text-sm'>Fill</span>
      </button>
      <button class='mx-1 bg-blueGray-light hover:bg-blueGray-medium-light active:bg-blueGray-medium-dark px-2' on:click={removeHandler}>
        <span class='text-white text-sm'>Remove</span>
      </button>
    {/if}
  </div>
</div>