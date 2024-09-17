<script>
  import encryptionInput from "../../stores/encrypt/encryption"
  import images from "../../stores/encrypt/images"
  import shares from "../../stores/encrypt/shares"
  import encrypt from "../../stores/mode"
  import results from "../../stores/encrypt/results"
  import { sha224 } from "js-sha256"
  import { chosenState } from "../../constants/shareState"
  
  $: shareCreationLogic($shares, $images)
  
  const shareCreationLogic = (shrs, imgs) => {
    if (!$encryptionInput.stateEncrypting) {
      return
    }
    // starting value of canCreate false, so that returning from function wil result in rejection
    $encryptionInput.canCreate = false
    let imgPicked = false
    for (let [_, val] of imgs.entries()) {
      if (val.picked) {
        imgPicked = true
        break
      }
    }
    // image has to be picked
    if (!imgPicked) {
      return
    }
    // changeable shares count
    let pickedNum = 0
    // all picked shares
    let pickedShrs = []
    // latest share number
    let latestShr = -1
    // chosenShares can only count once
    let chosenOnce = 1
    for (let [key, val] of shrs.entries()) {
      if (val.picked) {
        if (val.state !== chosenState) {
          pickedNum++
        } else {
          pickedNum += chosenOnce
          chosenOnce = 0
        }
        pickedShrs.push(key)
        latestShr = key
      }
    }
    // check for number of changeable shares
    if (pickedNum < 2) {
      return
    }
    // check for latest share to not be chosen
    if ($shares.has(latestShr) && $shares.get(latestShr).state === chosenState) {
      return
    }

    // check each results' share combination
    for (let [_, val] of $results.entries()) {
      let minLen = Math.min(val.shares.length, pickedShrs.length)
      // if starting point is different, it will result in different image
      if (pickedShrs[0] !== val.shares[0]) {
        break
      }
      let similar = true
      for (let i = 0; i < minLen; i++) {
        // if shares are not similar, resulting image will be different
        if (pickedShrs[i] !== val.shares[i]) {
          similar = false
          break
        }
      }
      if (similar) {
        let shareOff = Math.abs(pickedShrs.length - val.shares.length)
        // shares have to be off by 2 if similar to make up another random image without losing enthropy
        if (shareOff >= 2) {
          break
        } else {
          return
        }
      } else {
        break
      }
    }
    
    $encryptionInput.canCreate = true
  }

  const changeModeEncrypt = () => {
    $encrypt = true
  }

  const changeModeDecrypt = () => {
    $encrypt = false
  }

  const unpickAllEnc = () => {
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
    unpickAllEnc()
    $encryptionInput.stateEncrypting = true
  }
  const changeStateNotEncrypting = () => {
    unpickAllEnc()
    $encryptionInput.stateEncrypting = false
  }

  const createEncResult = () => {
    let shrs = []
    let latestShr = -1
    for (let [key, val] of $shares.entries()) {
      if (val.picked) {
        shrs.push(key)
        latestShr = key
      }
    }

    let imgHash
    for (let [key, val] of $images.entries()) {
      if (val.picked) {
        imgHash = key
      }
    }
    let newRes = {
      shares: shrs,
      lastShare: latestShr,
      imgHash: imgHash,
      picked: false
    }
    let hash = sha224(JSON.stringify(newRes))
    $results.set(hash, newRes)
    results.set($results)
    unpickAllEnc()
    $encryptionInput.canCreate = false
    $encryptionInput.stateEncrypting = false
  }
</script>

{#if $encryptionInput.stateEncrypting}
  {#if $encryptionInput.canCreate}
    <button class='absolute left-0 bottom-0 h-8 w-8 bg-cyan-500 hover:bg-cyan-300' on:click={createEncResult}>
      <span class='text-white'>&#10003;</span>
    </button>
  {/if}
  {#if !$encryptionInput.canCreate}
    <button class='absolute left-0 bottom-0 h-8 w-8 bg-red-500 hover:bg-red-800' on:click={changeStateNotEncrypting}>
      <span class='text-white'>&#10005;</span>
    </button>
  {/if}
{/if}
{#if !$encryptionInput.stateEncrypting}  
  <button class='absolute left-0 bottom-0 h-8 w-8 bg-emerald-800 hover:bg-emerald-900' on:click={changeStateEncrypting}>
    <span class='text-white'>&#11208;</span>
  </button>
{/if}