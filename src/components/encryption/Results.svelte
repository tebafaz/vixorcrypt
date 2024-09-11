<script>
  import encryptionInput from "../../stores/encrypt/encryption"
import images from "../../stores/encrypt/images"
  import results from "../../stores/encrypt/results"
  // import shares from "../../stores/encrypt/shares"

  const onClick = (key) => {
    if (!$encryptionInput.stateEncrypting) {
      let val = $results.get(key)
      val.picked = !val.picked
      $results.set(key, val)
      results.set($results)
    }
  }
  const onRemove = () => {
    let newMap = new Map($results)
    if (!$encryptionInput.stateEncrypting) {
      for (let [key, val] of newMap.entries()) {
        if (val.picked) {
          newMap.delete(key)
        }
      }
      results.set(newMap)
    }
  }
</script>

<div class='flex flex-1 flex-col h-1/3 bg-blueGray-light'>
  <span class='flex-none pl-2 pointer-events-none text-white'>
    Results
  </span>
  <div class='flex-auto'>
    <!-- start inner overflow item -->
    <div class="relative w-full h-full bg-blueGray-medium-light">
      <div class='absolute inset-0 overflow-auto'>
        {#each $results as [key, val] (key)}
          <div class='m-1 grid grid-cols-1 place-content-start'>
            <div role="cell" tabindex="0" class=" h-28 w-full bg-blueGray-light flex flex-row hover:cursor-pointer border {val.picked ? 'border-gray-300' : 'border-gray-600'}" on:click={() => {onClick(key)}}  on:keypress={() => {onClick(key)}}>
            <span class="w-20 inline-flex">
              <div role="cell" tabindex="0" class="flex justify-center max-w-20 max-h-32 my-1">
                <div class="bg-blueGray-light">
                  <div class='min-h-14 min-w-20'>
                    <img class='max-h-16 max-w-16 m-auto' alt={$images.get(val.imgHash).filename} id={`img-${val.imgHash}`} src={$images.get(val.imgHash).base64}/>
                  </div>
                  <div class="p-2 max-w-20 max-h-12">
                    <p class="text-gray-100 text-xs overflow-ellipsis overflow-hidden h-8 break-words">{$images.get(val.imgHash).filename}</p>
                  </div>
                </div>
              </div>
            </span>
            <div class="inset-0 overflow-auto w-full ">
              <div class='ml-1 grid grid-cols-8  border-l border-gray-600'>
                {#each val.shares as share}
                  <div role="cell" tabindex="0" class="my-1 text-center bg-blueGray-light text-white">
                    {share}
                  </div>
                {/each}
              </div>
            </div>
            </div>
          </div>
        {/each}
        

      </div>
    </div>
    <!-- end inner overflow item -->
  </div>
  <div class='flex h-7 items-center'>
    <button class=' mx-1 bg-blueGray-light hover:bg-blueGray-medium-light active:bg-blueGray-medium-dark px-2' on:click={onRemove}>
      <span class='text-white text-sm'>Remove</span>
    </button>
  </div>
</div>