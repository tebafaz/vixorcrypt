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

  window.addEventListener('beforeunload', async () => {
    await deleteDatabase()
  })

</script>

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