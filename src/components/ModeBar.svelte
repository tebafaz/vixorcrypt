<script>
  import encryptionInput from "../stores/encrypt/encryption";
  import images from "../stores/encrypt/images";
  import shares from "../stores/encrypt/shares";
  import encrypt from "../stores/mode";
  import results from "../stores/encrypt/results";
  import { sha224 } from "js-sha256";
  import { usedState } from "../constants/imageState";
  import { chosenState } from "../constants/shareState";
  
  $: $encryptionInput.stateEncrypting && Array.from($shares.values()).filter(val => val.picked).length > 1  && Array.from($images.values()).filter(val => val.picked).length === 1 ? $encryptionInput.canCreate = true : $encryptionInput.canCreate = false
  
  const changeModeEncrypt = () => {
    $encrypt = true
  }

  const changeModeDecrypt = () => {
    $encrypt = false
  }

  const unpickAll = () => {
    for (let [key, val] of $images.entries()) {
      val.picked = false
      $images.set(key, val)
      images.set($images)
    }
    for (let [key, val] of $shares.entries()) {
      val.picked = false
      $shares.set(key, val)
      shares.set($shares)
    }
    for (let [key, val] of $results.entries()) {
      val.picked = false
      $results.set(key, val)
      results.set($results)
    }
  }

  const changeStateEncrypting = () => {
    unpickAll()
    $encryptionInput.stateEncrypting = true
  }
  const changeStateDecrypting = () => {
    unpickAll()
    $encryptionInput.stateEncrypting = false
  }

  const createResult = () => {
    let shrs = []
    let lastShare
    for (let [key, val] of $shares.entries()) {
      if (val.picked) {
        let val1 = $shares.get(key)
        if (val1.state !== chosenState) {
          val1.state = usedState
          $shares.set(key, val1)
        }
        shrs.push(key)
        
        lastShare = key
      }
    }
    let lastShareVal = $shares.get(lastShare)
    lastShareVal.state = chosenState
    $shares.set(lastShare, lastShareVal)

    let imgHash
    for (let [key, val] of $images.entries()) {
      if (val.picked) {
        imgHash = key
        let val1 = $images.get(key)
        val1.state = usedState
        $images.set(key, val1)
        images.set($images)
      }
    }
    let newRes = {
      shares: shrs,
      imgHash: imgHash,
      picked: false
    }
    let hash = sha224(JSON.stringify(newRes))
    $results.set(hash, newRes)
    results.set($results)
    unpickAll()
    $encryptionInput.canCreate = false
    $encryptionInput.stateEncrypting = false
  }
</script>

<div class='flex flex-row justify-evenly w-96 h-10 bg-blueGray-medium-dark relative'>
  {#if $encrypt}
    {#if $encryptionInput.stateEncrypting}
      {#if $encryptionInput.canCreate}
        <button class='absolute left-0 bottom-0 h-8 w-8 bg-cyan-500 hover:bg-cyan-300' on:click={createResult}>
          <span class='text-white'>&#10003;</span>
        </button>
      {/if}
      {#if !$encryptionInput.canCreate}
        <button class='absolute left-0 bottom-0 h-8 w-8 bg-red-500 hover:bg-red-800' on:click={changeStateDecrypting}>
          <span class='text-white'>&#10005;</span>
        </button>
      {/if}
    {/if}
    {#if !$encryptionInput.stateEncrypting}  
      <button class='absolute left-0 bottom-0 h-8 w-8 bg-emerald-800 hover:bg-emerald-900' on:click={changeStateEncrypting}>
        <span class='text-white'>&#11208;</span>
      </button>
    {/if}
  {/if}
  <button class="px-2 bottom-0 h-8 w-24 mb-0 mt-auto { $encrypt ? 'bg-blueGray-light' : ' bg-blueGray-medium-dark'}" on:click={changeModeEncrypt}>
    <span class='text-white'>Encrypt</span>
  </button>
  <button class="px-2 bottom-0 h-8 w-24 mb-0 mt-auto { !$encrypt ? 'bg-blueGray-light' : ' bg-blueGray-medium-dark'}" on:click={changeModeDecrypt}>
    <span class='text-white'>Decrypt</span>
  </button>
</div>
