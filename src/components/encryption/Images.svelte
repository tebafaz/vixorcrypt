<script>
  import imageCompression from "browser-image-compression";
  import images from "../../stores/encrypt/images";
  import { getImageProps } from "../../handlers/images";
  import encryptionInput from "../../stores/encrypt/encryption";
  import { defaultState, usedState } from "../../constants/imageState";

  let imageInput;

  const handleFileChange = async (event) => {
    const files = event.target.files;
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 80,
      useWebWorker: true
    }
    
    for (let file of files) {
      let imgProps = await getImageProps(file)
      if ($images.has(imgProps.hash)) {
        continue
      }
      imageCompression(file, options)
        .then(async function (compressedFile) {
          let arrayBuf = await imageCompression.getDataUrlFromFile(compressedFile)
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
        })
        .catch(function (error) {
          console.log(error.message);
        }
      );
    }
  }

  const pickHandler = (key, val) => {
    console.log(val.state, $encryptionInput)
    if ($encryptionInput.stateEncrypting) {
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
      if (!$encryptionInput.stateEncrypting && val.picked) {
        newMap.delete(key)
      }
    }
    images.set(newMap)
  }

</script>

<input class="hidden" type="file" accept='image/*' bind:this={imageInput} on:change={handleFileChange}  multiple />

<div class='flex flex-1 flex-col h-1/3 border-y-2 border-stone-900 bg-blueGray-light'>
  <span class='flex-none pl-2 pointer-events-none text-white'>
    Images
  </span>
  <div class='flex-auto'>
    <div class="relative w-full h-full bg-blueGray-medium-light">
      <div class='absolute inset-0 overflow-auto'>
        <div class='ml-2 grid grid-cols-4 place-content-start gap-2'>
          {#each $images as [key, val] (key)}
            <div role="cell" tabindex="0" class="flex justify-center max-w-20 max-h-32 my-1" on:click={() => {pickHandler(key, val)}} on:keypress={() => {pickHandler(key, val)}}>
              <div class="bg-blueGray-light hover:cursor-pointer border {$encryptionInput.stateEncrypting && val.picked ? 'border-cyan-300' : val.state === usedState ? 'border-green-600' : val.picked ? 'border-gray-300' : 'border-gray-600'} ">
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
    <button class=' mx-1 bg-blueGray-light hover:bg-blueGray-medium-light active:bg-blueGray-medium-dark px-2' on:click={() => {removeHandler()}}>
      <span class='text-white text-sm'>Remove</span>
    </button>
  </div>
</div>