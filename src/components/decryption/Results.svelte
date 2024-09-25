<script>
  import canvasProps from "../../stores/decrypt/canvas";
  import results from "../../stores/decrypt/results";
  import decryptionInput from "../../stores/decrypt/decryption";
  import decResSvc from "../../db/decResultService";

  const pickHandler = async (key, val) => {
    if (!$decryptionInput.stateDecrypting) {
      val.picked = !val.picked
      $results.set(key, val)
      results.set($results)
    }
  }

  const removeHandler = () => {
    let newMap = new Map($results)
    for (let [key, val] of newMap.entries()) {
      if (!$decryptionInput.stateDecrypting && val.picked) {
        newMap.delete(key)
        decResSvc.removeDecResultByHash(key)
      }
    }
    results.set(newMap)
  }
</script>
<div class='flex flex-1 flex-col h-1/3 bg-blueGray-light'>
  <span class='flex-none pl-2 pointer-events-none text-white'>
    Results
  </span>
  <div class='flex-auto'>
    <div class="relative w-full h-full bg-blueGray-medium-light">
      <div class='absolute inset-0 overflow-auto'>
        <div class='ml-2 grid grid-cols-4 place-content-start gap-2'>
          {#each $results as [key, val] (key)}
            <div role="cell" tabindex="0" class="flex justify-center max-w-20 max-h-32 my-1" on:click={() => {pickHandler(key, val)}} on:keypress={() => {pickHandler(key, val)}}>
              <div class="bg-blueGray-light hover:cursor-pointer border {val.picked ? 'border-gray-300' : 'border-gray-600'} ">
                <div class='min-h-16 min-w-20 grid place-content-center'>
                  <img class='max-h-16 max-w-16 m-auto' alt={val.filename} id={`img-${val.hash}`} src={val.base64}/>
                </div>
                <div class="p-2 max-w-20 max-h-12">
                  <p class="text-gray-100 text-xs overflow-ellipsis overflow-hidden h-8 break-words">{val.filename}</p>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
  <div class='flex h-7 items-center'>
    {#if $canvasProps.initialized}
      <button class=' mx-1 bg-blueGray-light hover:bg-blueGray-medium-light active:bg-blueGray-medium-dark px-2' on:click={removeHandler}>
        <span class='text-white text-sm'>Remove</span>
      </button>
    {/if}
  </div>
</div>
