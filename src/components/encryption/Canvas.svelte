<script>
  import logo from "../../assets/logo.png";
  import canvas from "../../stores/encrypt/canvas";
  
</script>

<div class='flex-auto relative overflow-scroll' id='canvas-holder-2' >
  <div class='absolute m-auto inset-0 grid content-center justify-center outline-dashed outline-1 outline-stone-900' id='canvas-holder-1'>
    {#if !$canvas.initialized}
      <img class='h-52 w-auto mx-auto pixelated' src={ logo } alt='vixorcrypt_logo' />
      <br />
      <span class='text-blueGray-light text-4xl pointer-events-none'>Canvas will be created as soon as all the images are loaded</span>
    {/if}
    {#if $canvas.initialized}
      <canvas class='align-top pixelated' id='main-canvas'>
        <!-- canvas -->
      </canvas>
    {/if}
  </div>
</div>