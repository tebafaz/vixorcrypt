<script>
  import encrypt from "../stores/mode"
  import encCanvas from "../stores/encrypt/canvas"
  import decCanvas from "../stores/decrypt/canvas";
  import EncryptionCanvas from "./encryption/Canvas.svelte"
  import DecryptionCanvas from "./decryption/Canvas.svelte"
  import Loading from "./Loading.svelte";
  import loading from "../stores/loading";
</script>

<div class='flex flex-1 bg-blueGray-medium-dark border-t-2 border-r-2 border-stone-900 min-w-0 flex-col'>
  {#if $encrypt}
    <EncryptionCanvas />
  {/if}
  {#if !$encrypt}
    <DecryptionCanvas />
  {/if}
  {#if $encrypt}
    <div class='flex flex-row min-h-0 h-7 bg-blueGray-light font-light text-sm overflow-clip select-none'>
      <span class='pl-2 text-sm text-white'>Encryption canvas size: { $encCanvas.initialized ? $encCanvas.sizeX + 'x' + $encCanvas.sizeY : 'undefined' }</span>
      {#if $loading !== 0}
        &nbsp;<Loading />
      {/if}
    </div>
  {/if}
  {#if !$encrypt}
    <div class='flex flex-row min-h-0 h-7 bg-blueGray-light font-light text-sm overflow-clip select-none'>
      <span class='pl-2 text-sm text-white'>Decryption canvas size: { $decCanvas.initialized ? $decCanvas.sizeX + 'x' + $decCanvas.sizeY : 'undefined' }</span>
      {#if $loading !== 0}
        &nbsp;<Loading />
      {/if}
    </div>
  {/if}
</div>
