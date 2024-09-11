<script>
  import logo from "../../assets/logo.png"
  import canvas from "../../stores/decrypt/canvas"
  import canvasProps from "../../stores/decrypt/canvas"

  let wrapper

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