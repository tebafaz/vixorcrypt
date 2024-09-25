
<script>
  import { sha224 } from "js-sha256"
  import decryptionInput from "../../stores/decrypt/decryption"
  import results from "../../stores/decrypt/results";
  import images from "../../stores/decrypt/images";
  import decImgSvc from "../../db/decImageService";
  import canvasProps from "../../stores/decrypt/canvas";
  import decResSvc from "../../db/decResultService";
  import imageCompression from "browser-image-compression";
  import { defaultState } from "../../constants/imageState";
  import loading from "../../stores/loading";
  $: shareMergeLogic($images)

  const shareMergeLogic = (imgs) => {
    if (!$decryptionInput.stateDecrypting) {
      return
    }
    $decryptionInput.canCreate = false
    
    let counter = 0
    for (const [key, val] of imgs) {
      if (val.picked) {
        counter++
      }
    }
    if (counter < 2) {
      return
    }
    
    $decryptionInput.canCreate = true
  }

  const unpickAllDec = () => {
    for (let [key, val] of $images.entries()) {
      val.picked = false
      val.xored = false
      $images.set(key, val)
      images.set($images)
    }
    for (let [key, val] of $results.entries()) {
      val.picked = false
      $results.set(key, val)
      results.set($results)
    }
  }

  let resCounter = 0

  const createDecResult = async () => {
    loading.inc()
    const row = await decImgSvc.getDecImageByHash('currentXored')
    const arrayBuffer = row.image.buffer
    const hash = sha224.hex(arrayBuffer)
    for (const [key, val] of $results) {
      if (key === hash) {
        alert('This image is already in results')
        loading.dec()
        return
      }
    }
    await decResSvc.insertDecResult(hash, row.image)

    const canvas = document.createElement('canvas')
    canvas.width = $canvasProps.sizeX
    canvas.height = $canvasProps.sizeY
    const ctx = canvas.getContext('2d')
    const imageData = new ImageData(row.image, $canvasProps.sizeX, $canvasProps.sizeY)

    ctx.putImageData(imageData, 0, 0)

    const file = await imageCompression.canvasToFile(canvas)

    const previewOptions = {
      maxSizeMB: 0.1,
      maxWidthOrHeight: 80,
      useWebWorker: true
    }
    let shrs = []
    for (const [key, val] of $images) {
      if (val.picked) {
        shrs.push(key)
      }
    }

    await imageCompression(file, previewOptions)
      .then(async function (compressedFile) {
        const arrayBuf = await imageCompression.getDataUrlFromFile(compressedFile)
        let res = {
          base64: arrayBuf,
          hash: hash,
          shares: shrs,
          filename: `result-${resCounter}.png`,
          width: $canvasProps.sizeX,
          height: $canvasProps.sizeY,
          state: defaultState, 
          picked: false
        }
        resCounter++
        $results.set(hash, res)
        results.set($results)
      })
      .catch(function (error) {
        console.error(error)
      }
    )
    unpickAllDec()
    $decryptionInput.stateDecrypting = false
    $decryptionInput.canCreate = false
    loading.dec()
  }

  const changeStateDecrypting = () => {
    unpickAllDec()
    $decryptionInput.stateDecrypting = true
  }
  const changeStateNotDecrypting = () => {
    unpickAllDec()
    $decryptionInput.stateDecrypting = false
  }

</script>

{#if $canvasProps.initialized}
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
{/if}
