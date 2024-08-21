<script>
  import encrypt from "../stores/mode";
  const changeModeEncrypt = () => {
    $encrypt = true
  }

  const changeModeDecrypt = () => {
    $encrypt = false
  }
</script>

<div class='flex flex-row justify-evenly w-96 h-10 bg-blueGray-medium-dark relative'>
  {#if $encrypt}
    <button class='absolute left-0 bottom-0 h-8 w-8 bg-emerald-800 hover:bg-emerald-900'>
      <span class='text-white'>&#11208;</span>
    </button>
  {/if}
  <button class="px-2 bottom-0 h-8 w-24 mb-0 mt-auto { $encrypt ? 'bg-blueGray-light' : ' bg-blueGray-medium-dark'}" on:click={changeModeEncrypt}>
    <span class='text-white'>Encrypt</span>
  </button>
  <button class="px-2 bottom-0 h-8 w-24 mb-0 mt-auto { !$encrypt ? 'bg-blueGray-light' : ' bg-blueGray-medium-dark'}" on:click={changeModeDecrypt}>
    <span class='text-white'>Decrypt</span>
  </button>
</div>
