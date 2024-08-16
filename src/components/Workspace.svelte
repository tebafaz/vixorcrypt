<script>
  import vixorcryptLogo from "../assets/vixorcryptLogo.png";
  import encrypt from "../stores/mode";
  import canvas from "../stores/encrypt/canvasProps";
</script>



<div class='flex-1 bg-blueGray-medium-dark border-t-2 border-r-2 border-stone-900'>
  <div class='flex flex-col h-full'>
    <div class='flex flex-row h-full w-full'>
      <div class='flex-auto relative overflow-scroll' id='canvas-holder-2' >
        <div class='absolute m-auto inset-0 grid content-center justify-center outline-dashed outline-1 outline-stone-900' id='canvas-holder-1'>
          <img class='h-52 w-auto mx-auto pixelated' src={vixorcryptLogo} alt='vixorcrypt_logo' />
          <br />
          <span class='text-blueGray-light text-4xl pointer-events-none'>Create canvas in the `File` section on the top left corner</span>
          <canvas class='align-top' id='main-canvas'>
            <!-- canvas -->
          </canvas>
        </div>
      </div>
    </div>
    <div class='flex-none h-7 bg-blueGray-light font-light text-sm'>
      <span class='pl-2 text-sm text-white'>Mode: { $encrypt ? 'encrypt' : 'decrypt' } Canvas size: { $canvas.sizeX }x{ $canvas.sizeY }</span>
    </div>
  </div>
</div>