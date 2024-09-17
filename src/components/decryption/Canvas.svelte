<script>
  import logo from "../../assets/logo.png"
  import canvasProps from "../../stores/decrypt/canvas"
  import { initKonva, resizeStage } from "../../utils/konva"
  import { onMount, onDestroy } from "svelte"
  import konva from "konva"
  import decryptionInput from "../../stores/decrypt/decryption";
  import images from "../../stores/decrypt/images";
  import { handleDecKonvaImage } from "../../utils/konvaDec";

  let wrapper // stage wrapper
  let konvaStage // stage
  let group // group that holds image and box
  let image // just image
  let box // box for border of group

  $: handleDecKonvaImage(group, $decryptionInput.stateDecrypting, $images)

  $: monitorCanvas($canvasProps.initialized)

  onMount(() => {
    monitorCanvas($canvasProps.initialized)
  })

  const monitorCanvas = (initialized) => {
    if (initialized && wrapper) {
      [konvaStage, group, box] = initKonva(wrapper, $canvasProps)
    }
  }

  const handleResize = () => {
    resizeStage(konvaStage, wrapper, group, $canvasProps)
  }

  window.addEventListener('resize', handleResize)

  onDestroy(() => {
    window.removeEventListener('resize', handleResize)
  })
</script>


<div bind:this={wrapper} class='flex-auto min-h-0 '>
  {#if !$canvasProps.initialized}
    <div class='flex flex-col justify-center items-center relative w-full h-full select-none'>
      <div>
        <img class='h-52 w-auto mx-auto pixelated' src={ logo } alt='vixorcrypt_logo' />
        <br />
        <span class='text-blueGray-light text-4xl pointer-events-none'>Canvas will be created as soon as all the images are loaded</span>
      </div>
    </div>
  {/if}
</div>