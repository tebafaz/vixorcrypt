<script>
  import encrypt from "../stores/mode";
  import canvas from "../stores/encrypt/canvas";
  import EncryptionCanvas from "./encryption/Canvas.svelte";
  import DecryptionCanvas from "./decryption/Canvas.svelte";
</script>

<div class='flex-1 bg-blueGray-medium-dark border-t-2 border-r-2 border-stone-900'>
  <div class='flex flex-col h-full'>
    <div class='flex flex-row h-full w-full'>
      {#if $encrypt}
        <EncryptionCanvas />
      {/if}
      {#if !$encrypt}
        <DecryptionCanvas />
      {/if}
    </div>
    <div class='flex-none h-7 bg-blueGray-light font-light text-sm'>
      <span class='pl-2 text-sm text-white'>Mode: { $encrypt ? 'encrypt' : 'decrypt' } Canvas size: { $canvas.initialized ? $canvas.sizeX + 'x' + $canvas.sizeY : 'undefined' }</span>
    </div>
  </div>
</div>
