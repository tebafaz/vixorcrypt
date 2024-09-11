<script>
  import imageCompression from "browser-image-compression"
  import canvasProps from "../../stores/decrypt/canvas"
  import images from "../../stores/decrypt/images"
  import decryptionInput from "../../stores/decrypt/decryption"
  import { getImageProps, getMaxWidthAndHeight } from "../../utils/images"
  import decImgSvc from "../../db/decImageService"
  import { fileToUint8ClampedArray } from "../../utils/imageEncryption"
  import { defaultState, usedState } from "../../constants/imageState"

  let imageInput


  const handleFileChange = async (event) => {
    const files = event.target.files
    const previewOptions = {
      maxSizeMB: 0.1,
      maxWidthOrHeight: 80,
      useWebWorker: true
    }
    const originalOptions = {
      maxSizeMB: 5,
      maxWidthOrHeight: 1920,
      useWebWorker: true
    }
    
    for (let file of files) {
      let imgProps = await getImageProps(file)
      if ($images.has(imgProps.hash)) {
        continue
      }
      let arrayBuf
      if (imgProps.width > 1920 || imgProps.height > 1920) {
        await imageCompression(file, originalOptions)
          .then(async function (compressedFile) {
            imgProps = await getImageProps(compressedFile)
            const imgArr = await fileToUint8ClampedArray(compressedFile)
            decImgSvc.insertDecImage(imgProps.hash, imgArr)
          })
          .catch(function (error) {
            console.error(error.message)
          }
        )
      } else {
        const imgArr = await fileToUint8ClampedArray(file)
        decImgSvc.insertDecImage(imgProps.hash, imgArr)
      }
      await imageCompression(file, previewOptions)
        .then(async function (compressedFile) {
          arrayBuf = await imageCompression.getDataUrlFromFile(compressedFile)
        })
        .catch(function (error) {
          console.error(error.message)
        }
      )
      let imageProps = {
        base64: arrayBuf,
        hash: imgProps.hash,
        filename: file.name,
        width: imgProps.width,
        height: imgProps.height,
        state: defaultState, 
        picked: false
      }
      let newImages = new Map($images)
      newImages.set(imgProps.hash, imageProps)
      images.set(newImages)
    }
    if (!$canvasProps.initialized) {
      let maxWidthAndHeight = getMaxWidthAndHeight($images)
      $canvasProps.sizeX = maxWidthAndHeight.maxWidth
      $canvasProps.sizeY = maxWidthAndHeight.maxHeight
      $canvasProps.initialized = true
    }
  }
  const pickHandler = async (key, val) => {
    if ($decryptionInput.stateDecrypting) {
      for (let [key1, val1] of $images.entries()) {
        if (val1.picked) {
          val1.picked = false
          $images.set(key1, val1)
          break
        }
      }
      val.picked = true
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
      }
    }
    images.set(newMap)
  }
</script>

<input class="hidden" type="file" accept='image/*' bind:this={imageInput} on:change={handleFileChange}  multiple />

<div class='flex flex-col h-2/3 border-b-2 border-stone-900 bg-blueGray-light'>
  <span class='flex-none pl-2 pointer-events-none text-white'>
    Images
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
    <button class='mx-1 bg-blueGray-light hover:bg-blueGray-medium-light active:bg-blueGray-medium-dark px-2' on:click={() => {removeHandler()}}>
      <span class='text-white text-sm'>Remove</span>
    </button>
  </div>
</div>