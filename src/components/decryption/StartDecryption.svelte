
<script>
  import { sha224 } from "js-sha256"
  import decryptionInput from "../../stores/decrypt/decryption"
  import results from "../../stores/decrypt/results";
  import images from "../../stores/decrypt/images";

  const unpickAllDec = () => {
    for (let [key, val] of $images.entries()) {
      val.picked = false
      $images.set(key, val)
      images.set($images)
    }
    for (let [key, val] of $results.entries()) {
      val.picked = false
      $results.set(key, val)
      results.set($results)
    }
  }

  const createDecResult = () => {}

  const changeStateDecrypting = () => {
    unpickAllDec()
    $decryptionInput.stateDecrypting = true
  }
  const changeStateNotDecrypting = () => {
    unpickAllDec()
    $decryptionInput.stateDecrypting = false
  }

</script>


{#if $decryptionInput.stateDecrypting}
    {#if $decryptionInput.canCreate}
      <button class='absolute left-0 bottom-0 h-8 w-8 bg-cyan-500 hover:bg-cyan-300' on:click={createDecResult}>
        <span class='text-white'>&#10003;</span>
      </button>
    {/if}
    {#if !$decryptionInput.canCreate}
      <button class='absolute left-0 bottom-0 h-8 w-8 bg-red-500 hover:bg-red-800' on:click={changeStateNotDecrypting}>
        <span class='text-white'>&#10005;</span>
      </button>
    {/if}
  {/if}
  {#if !$decryptionInput.stateDecrypting}  
    <button class='absolute left-0 bottom-0 h-8 w-8 bg-emerald-800 hover:bg-emerald-900' on:click={changeStateDecrypting}>
      <span class='text-white'>&#11208;</span>
    </button>
  {/if}