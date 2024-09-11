<script>
  import { onMount, onDestroy, tick } from "svelte"
  import logo from "../../assets/logo.png"
  import canvasProps from "../../stores/encrypt/canvas"
  import images from "../../stores/encrypt/images"
  import encryptionInput from "../../stores/encrypt/encryption"
  import encImgSvc from "../../db/encImageService"
  import konva from "konva"
  import { initKonva, resizeStage } from "../../utils/konva"

  let wrapper
  let konvaStage
  let innerCanvasBox
  let horizontalBar
  let verticalBar


  $: monitorCanvas($canvasProps.initialized)

  onMount(() => {
    monitorCanvas($canvasProps.initialized)
  })

  const monitorCanvas = (initialized) => {
    if (initialized && wrapper) {
      [konvaStage, innerCanvasBox, verticalBar, horizontalBar] = initKonva(wrapper, $canvasProps)
    } 
  }

  const resizeObserver = new ResizeObserver(() => {
      resizeStage(konvaStage, wrapper, verticalBar, horizontalBar, innerCanvasBox, $canvasProps)
    })

    const handleResize = () => {
      resizeStage(konvaStage, wrapper, verticalBar, horizontalBar, innerCanvasBox, $canvasProps)
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