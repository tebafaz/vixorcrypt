<script>
  import { onMount, onDestroy } from "svelte"
  import logo from "../../assets/logo.png"
  import canvasProps from "../../stores/encrypt/canvas"
  import konva from "konva"
  import { initKonva, resizeStage } from "../../utils/konva"
  import encryptionInput from "../../stores/encrypt/encryption";
  import images from "../../stores/encrypt/images";
  import { handleEncKonvaImage } from "../../utils/konvaEnc";
  import encImgSvc from "../../db/encImageService";
  import loading from "../../stores/loading";

  let wrapper // stage wrapper
  let konvaStage // stage
  let group // group that holds image and box
  let image // just image
  let box // box for border of group

  $: handleEncKonvaImage(group, $images)
  $: handleStateChange($encryptionInput.stateEncrypting)
  $: monitorCanvas($canvasProps.initialized)

  const handleStateChange = (state) => {
    if (group && !state) {
      const imgs = group.find('Image')
      imgs.forEach(img => img.destroy())
    }
  }

  onMount(async () => {
    if (!await encImgSvc.existsEncImageByHash('current')) {
      await encImgSvc.insertEncImage('current', '')
    }
    monitorCanvas($canvasProps.initialized)
  })

  const monitorCanvas = (initialized) => {
    loading.inc()
    if (initialized && wrapper) {
      [konvaStage, group, box] = initKonva(wrapper, $canvasProps)
    } 
    if (!initialized && wrapper) {
      if (konvaStage) {
        konvaStage.destroy()
      }
      konvaStage = undefined
      group = undefined
      box = undefined
      image = undefined
    }
    loading.dec()
  }

    const handleResize = () => {
      resizeStage(konvaStage, wrapper, group, $canvasProps)
    }

    window.addEventListener('resize', handleResize)

    onDestroy(() => {
      window.removeEventListener('resize', handleResize)
    })

</script>

<div bind:this={wrapper} class='flex-auto min-h-0 pixelated'>
    {#if !$canvasProps.initialized}
      <div class='flex flex-col justify-center items-center relative w-full h-full select-none'>
        <div class="overflow-hidden">
          <img class='h-64 w-auto mx-auto overflow-hidden pixelated' src={ logo } alt='vixorcrypt-logo' />
        </div>
      </div>
    {/if}
</div>