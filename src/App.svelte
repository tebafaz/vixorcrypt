<script>
  import Menubar from "./components/Menubar.svelte";
  import Workspace from "./components/Workspace.svelte";
  import ModeBar from "./components/ModeBar.svelte";
  import EncShares from "./components/encryption/Shares.svelte";
  import EncImages from "./components/encryption/Images.svelte";
  import EncResults from "./components/encryption/Results.svelte";
  import DecImages from "./components/decryption/Images.svelte";
  import DecResults from "./components/decryption/Results.svelte";
  import encrypt from "./stores/mode";
  import CreateCanvas from "./components/modals/CreateCanvas.svelte";
  import CreateShares from "./components/modals/CreateShares.svelte";
</script>


<!-- <Modals /> -->
<!-- <CreateCanvas /> -->
<CreateCanvas />
<CreateShares />


<input multiple type='file' hidden accept='image/*' id='image-input'/>
  <div class='w-full h-screen flex flex-col'>
    <Menubar />
    <!-- <Topbar/> -->
    <!-- start workspace -->
    <div class='flex-auto'>
      <div class='w-full h-full flex flex-row'>
        <!-- start main canvas panel -->
        <Workspace />
        <!-- end main canvas panel -->
        <!-- start layers panel -->
        <div class='flex flex-col w-96 min-h-full h-full bg-stone-300'>
          <ModeBar />
          <div class='flex-auto'>
            {#if $encrypt}
              <EncShares />
              <EncImages />
              <EncResults />
            {/if}
            {#if !$encrypt}
              <DecImages />
              <DecResults />
            {/if}
          </div>
            
  
        </div>
        <!-- end layers panel -->
      </div>
    </div>
    <!-- end workspace -->
  </div>