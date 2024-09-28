<script>
  import imageCompression from "browser-image-compression"
  import canvasProps from "../../stores/decrypt/canvas"
  import images from "../../stores/decrypt/images"
  import decryptionInput from "../../stores/decrypt/decryption"
  import { getImageProps, getMaxWidthAndHeight } from "../../utils/images"
  import decImgSvc from "../../db/decImageService"
  import { fileToUint8ClampedArray } from "../../utils/imageEncryption"
  import { defaultState, usedState } from "../../constants/imageState"
  import loading from "../../stores/loading"
  import results from "../../stores/decrypt/results";

  let imageInput
  let constWidth
  let constHeight

  $: changeState($results)

  const changeState = (res) => {
    for (let [key, val] of $images) {
      val.state = defaultState
      $images.set(key, val)
    }
    for (const [key, val] of res) {
      for (const imgHash of val.shares) {
        const imgVal = $images.get(imgHash)
        imgVal.state = usedState
        $images.set(imgHash, imgVal)
      }
    }
    images.set($images)
  }

  const handleFileChange = async (event) => {
    loading.inc()
    const files = event.target.files
    const previewOptions = {
      maxSizeMB: 0.1,
      maxWidthOrHeight: 80,
      useWebWorker: true
    }
    
    for (let file of files) {
      let imgProps = await getImageProps(file)
      if ($images.has(imgProps.hash)) {
        continue
      }
      if (imgProps.width > 1920 || imgProps.height > 1920) {
        alert("images can't be higher than 1920 pixels vertically or horizontally")
        loading.dec()
        return
      }
      if (!constWidth || !constHeight) {
        constWidth = imgProps.width
        constHeight = imgProps.height
      }
      if (constWidth && (constWidth !== imgProps.width || constHeight !== imgProps.height)) {
        alert("images should have the same width and height")
        loading.dec()
        return
      }
      const imgArr = await fileToUint8ClampedArray(file)
      decImgSvc.insertDecImage(imgProps.hash, imgArr)
      await imageCompression(file, previewOptions)
        .then(async function (compressedFile) {
          let arrayBuf = await imageCompression.getDataUrlFromFile(compressedFile)
          let imageProps = {
            base64: arrayBuf,
            hash: imgProps.hash,
            filename: file.name,
            width: imgProps.width,
            height: imgProps.height,
            state: defaultState, 
            picked: false,
            xored: false
          }
          let newImages = new Map($images)
          newImages.set(imgProps.hash, imageProps)
          images.set(newImages)
        })
        .catch(function (error) {
          console.error(error.message)
        }
      )
    }

    if (!$canvasProps.initialized) {
      $canvasProps.sizeX = constWidth
      $canvasProps.sizeY = constHeight
      $canvasProps.initialized = true
    }
    event.target.value = ''
    loading.dec()
  }
  
  const pickHandler = async (key, val) => {
    if ($decryptionInput.stateDecrypting) {
      val.picked = !val.picked
      $images.set(key, val)
      images.set($images)
    } else if (val.state === defaultState) {
      let newMap = new Map($images)
      val.picked = !val.picked
      newMap.set(key, val)
      images.set(newMap)
    }
  }

  const removeHandler = () => {
    let newMap = new Map($images)
    for (let [key, val] of newMap.entries()) {
      if (!$decryptionInput.stateDecrypting && val.picked) {
        newMap.delete(key)
        decImgSvc.removeDecImageByHash(key)
      }
    }
    images.set(newMap)
  }
</script>

<input hidden type="file" accept='image/*' bind:this={imageInput} on:change={handleFileChange}  multiple />

<div class='flex flex-col h-2/3 border-b-2 border-stone-900 bg-blueGray-light'>
  <span class='flex-none pl-2 pointer-events-none text-white'>
    Shares
  </span>
  <div class='flex-auto'>
    <div class="relative w-full h-full bg-blueGray-medium-light">
      <div class='absolute inset-0 overflow-auto'>
        <div class='ml-2 grid grid-cols-4 place-content-start gap-2'>
          {#each $images as [key, val] (key)}
            <div role="cell" tabindex="0" class="flex justify-center max-w-20 max-h-32 my-1" on:click={() => {pickHandler(key, val)}} on:keypress={() => {pickHandler(key, val)}}>
              <div class="bg-blueGray-light hover:cursor-pointer border {$decryptionInput.stateDecrypting && val.picked ? 'border-cyan-300' : val.state === usedState ? 'border-cyan-600' : val.picked ? 'border-gray-300' : 'border-gray-600'} ">
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
    <button class='mx-1 bg-blueGray-light hover:bg-blueGray-medium-light active:bg-blueGray-medium-dark px-2' on:click={() => {imageInput.click()}}>
      <span class='text-white text-sm'>Add</span>
    </button>
    {#if $canvasProps.initialized}
      <button class='mx-1 bg-blueGray-light hover:bg-blueGray-medium-light active:bg-blueGray-medium-dark px-2' on:click={() => {removeHandler()}}>
        <span class='text-white text-sm'>Remove</span>
      </button>
    {/if}
  </div>
</div>