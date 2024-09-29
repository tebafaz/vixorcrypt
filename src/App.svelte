<script>
  import Menubar from "./components/Menubar.svelte"
  import Workspace from "./components/Workspace.svelte"
  import ModeBar from "./components/ModeBar.svelte"
  import EncShares from "./components/encryption/Shares.svelte"
  import EncImages from "./components/encryption/Images.svelte"
  import EncResults from "./components/encryption/Results.svelte"
  import DecShares from "./components/decryption/Shares.svelte"
  import DecResults from "./components/decryption/Results.svelte"
  import encrypt from "./stores/mode"
  import CreateCanvas from "./components/modals/CreateCanvas.svelte"
  import CreateShares from "./components/modals/CreateShares.svelte"
  import { onDestroy, onMount } from 'svelte'
  import { deleteDatabase } from "./db/dexie"
  import modal from "./stores/modals"
  import { createCanvasModal, createSharesModal } from "./constants/modals"

  $: smallScreenSize = width < minWidth || height < minheight

  window.addEventListener('beforeunload', async (event) => {
    await deleteDatabase()
  })

  const minWidth = 850
  const minheight = 450

  let smallScreenSize = false
  let width = window.innerWidth
  let height = window.innerHeight

  const updateSize = () => {
    width = window.innerWidth
    height = window.innerHeight
  }

  onMount(() => {
    window.addEventListener('resize', updateSize)
    return () => {
      window.removeEventListener('resize', updateSize)
    }
  })

</script>

{#if smallScreenSize}
  <div class='w-screen h-screen flex flex-col justify-center items-center bg-blueGray-medium-light'>
    <span class=" text-4xl text-white">Screen size is too small.<br />Recommended to use on PC's</span>
  </div>
{/if}
{#if !smallScreenSize}
  {#if $modal === createSharesModal}
    <CreateShares />
  {/if}
  {#if $modal === createCanvasModal}
    <CreateCanvas />
  {/if}

  <div class='w-full h-screen flex flex-col'>
    <Menubar />
    <div class=' flex-1 min-h-0'>
      <div class='w-full h-full flex flex-row flex-1 min-h-0'>
        <Workspace />
        <div class='flex flex-col w-96 min-h-full h-full bg-stone-300 select-none'>
          <ModeBar />
          <div class='flex-auto'>
            {#if $encrypt}
              <EncShares />
              <EncImages />
              <EncResults />
            {/if}
            {#if !$encrypt}
              <DecShares />
              <DecResults />
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}