<script>
  import encryptionInput from "../../stores/encrypt/encryption"
  import images from "../../stores/encrypt/images"
  import shares from "../../stores/encrypt/shares"
  import encrypt from "../../stores/mode"
  import results from "../../stores/encrypt/results"
  import { sha224 } from "js-sha256"
  import canvasProps from "../../stores/encrypt/canvas"
  import encImgSvc from "../../db/encImageService"
  import imageCompression from "browser-image-compression"
  import encResSvc from "../../db/encResultService";
  import loading from "../../stores/loading";
  
  $: shareCreationLogic($shares, $images)
  
  const shareCreationLogic = (shrs, imgs) => {
    if (!$encryptionInput.stateEncrypting) {
      return
    }
    $encryptionInput.canCreate = false
    let imgPicked = false
    for (let [_, val] of imgs.entries()) {
      if (val.picked) {
        imgPicked = true
        break
      }
    }
    if (!imgPicked) {
      return
    }
    let pickedNum = 0
    for (let [key, val] of shrs.entries()) {
      if (val.picked) {
        pickedNum++
      }
    }
    if (pickedNum < 2) {
      return
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

  const createEncResult = async () => {
    loading.inc()
    let shrs = []
    let latestShr = -1
    for (let [key, val] of $shares.entries()) {
      if (val.picked) {
        shrs.push(key)
        latestShr = key
      }
    }

    let imgHash
    let imgFileName
    for (let [key, val] of $images.entries()) {
      if (val.picked) {
        imgHash = key
        imgFileName = val.filename
      }
    }
    const previewOptions = {
      maxSizeMB: 0.1,
      maxWidthOrHeight: 80,
      useWebWorker: true
    }
    const row = await encImgSvc.getEncImageByHash('current')
    const canvas = document.createElement('canvas')
    canvas.width = $canvasProps.sizeX
    canvas.height = $canvasProps.sizeY
    const ctx = canvas.getContext('2d')
    const imageData = new ImageData(row.image, $canvasProps.sizeX, $canvasProps.sizeY)
    ctx.putImageData(imageData, 0, 0)
    const file = await imageCompression.canvasToFile(canvas)
    await imageCompression(file, previewOptions)
      .then(async function (compressedFile) {
        let arrayBuf = await imageCompression.getDataUrlFromFile(compressedFile)

        let newRes = {
          shares: shrs,
          imgHash: imgHash,
          lastShare: latestShr,
          base64: arrayBuf,
          filename: imgFileName,
          picked: false
        }
        let hash = sha224(JSON.stringify(newRes))
        await encResSvc.insertEncResult(hash, row.image)

        $encryptionInput.canCreate = false
        $encryptionInput.stateEncrypting = false
        
        $results.set(hash, newRes)
        results.set($results)
        unpickAllEnc()

      })
      .catch(function (error) {
        console.error(error.message)
      })
      loading.dec()
  }
</script>

{#if $canvasProps.initialized}
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
{/if}