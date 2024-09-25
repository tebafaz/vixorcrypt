<script>
  import encryptionInput from "../stores/encrypt/encryption"
  import images from "../stores/encrypt/images"
  import shares from "../stores/encrypt/shares"
  import encrypt from "../stores/mode"
  import results from "../stores/encrypt/results"
  import { sha224 } from "js-sha256"
  import decryptionInput from "../stores/decrypt/decryption"
  import StartEncryption from "./encryption/StartEncryption.svelte";
  import StartDecryption from "./decryption/StartDecryption.svelte";

  const changeModeEncrypt = () => {
    if ($encryptionInput.stateEncrypting || $decryptionInput.stateDecrypting) {
      return
    }
    $encrypt = true
  }

  const changeModeDecrypt = () => {
    if ($encryptionInput.stateEncrypting || $decryptionInput.stateDecrypting) {
      return
    }
    $encrypt = false
  }

</script>

<div class='flex flex-row justify-evenly w-96 h-10 bg-blueGray-medium-dark relative'>
  {#if $encrypt}
    <StartEncryption />
  {/if}
  {#if !$encrypt}
    <StartDecryption />
  {/if}
  <button class="px-2 bottom-0 h-8 w-24 mb-0 mt-auto { $encrypt ? 'bg-blueGray-light' : ' bg-blueGray-medium-dark'}" on:click={changeModeEncrypt}>
    <span class='text-white'>Encrypt</span>
  </button>
  <button class="px-2 bottom-0 h-8 w-24 mb-0 mt-auto { !$encrypt ? 'bg-blueGray-light' : ' bg-blueGray-medium-dark'}" on:click={changeModeDecrypt}>
    <span class='text-white'>Decrypt</span>
  </button>
</div>
