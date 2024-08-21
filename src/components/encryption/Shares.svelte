<script>
  import { openCreateShares } from "../../handlers/modal";
  import shares from "../../stores/encrypt/shares";
</script>

<div class='flex flex-col h-1/3 bg-blueGray-light'>
  <span class='flex-none pl-2 pointer-events-none text-white'>
    Shares
  </span>
  <div class='flex-auto'>
    <!-- start inner overflow item -->
    <div class="relative w-full h-full bg-blueGray-medium-light">
      <div class='absolute inset-0 overflow-auto'>
        <div class='ml-1 grid grid-cols-10 place-content-start gap-1'>
          <!-- images -->
          {#each $shares as value, key }
            <div class="my-1 text-center hover:cursor-pointer bg-blueGray-light text-white">
              {key}
            </div>
          {/each}
        </div>
      </div>
    </div>
    <!-- end inner overflow item -->
  </div>
  <div class='flex h-7 items-center'>
    <button class='mx-1 bg-blueGray-light hover:bg-blueGray-medium-light active:bg-blueGray-medium-dark px-2' on:click={openCreateShares}>
      <span class='text-white text-sm'>Add</span>
    </button>
    <button class='mx-1 bg-blueGray-light hover:bg-blueGray-medium-light active:bg-blueGray-medium-dark px-2'>
      <span class='text-white text-sm'>Remove</span>
    </button>
  </div>
</div>