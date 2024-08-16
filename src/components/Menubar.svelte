
<script>
  import { onMount } from "svelte";

  const dummy = () => {
    open = false;
    console.log("dummy func")
  }

  const menuItems = [
    {
      text: "File",
      subMenuItems: [
        { text: "Create canvas", handler: dummy },
        { text: "Remove canvas" },
        { text: "Export as" },
      ]
    },
    {
      text: "Edit",
      subMenuItems: [
        { text: "Canvas size" },
      ]
    },
    {
      text: "About",
      subMenuItems: [
        { text: "Help",
          subMenuItems: [
            { text: "Docs", handler: dummy },
          ]
        },
        { text: "Github page", handler: dummy },
      ]
    }
  ]


  let open = false;
  let activeMenuIndex = -1;
  let activeSubMenuIndex = -1;


  const toggleMenu = (index) => {
    if (activeMenuIndex !== index && open) {
      activeMenuIndex = index;
      activeSubMenuIndex = -1;
    } else if (!open) {
      activeMenuIndex = -1;
      activeSubMenuIndex = -1;
    }
  }

  const toggleSubMenu = (index, subMenuExist) => {
    if (activeSubMenuIndex === index && !subMenuExist) {
      activeSubMenuIndex = -1;
    } else if (activeSubMenuIndex !== index) {
      activeSubMenuIndex = index;
    }
  }

  const clickOutside = (event) => {
    if (!event.target.closest('.menu-container')) {
      activeMenuIndex = -1;
      activeSubMenuIndex = -1;
      open = false;
    }
  }

  onMount(() => {
    document.addEventListener('click', clickOutside);
    return () => {
      document.removeEventListener('click', clickOutside);
    };
  });

  const toggleOpen = () => {
    if (activeSubMenuIndex !== -1) {
      return
    }
    open = !open;
  }

  const closeSubMenu = () => {
    activeSubMenuIndex= -1;
  }

</script>

<div class="w-full h-6 bg-blueGray-light">
  <div role="menubar" tabindex="0" class="menu-container inline-flex select-none m-auto p-0">
    {#each menuItems as menuItem, index1}
      <div role="menuitem" tabindex="0" class="m-0 {activeMenuIndex === index1 ? 'bg-blueGray-medium-light' : ''}" on:click={() => {toggleOpen(); toggleMenu(index1)}} on:keypress={() => {toggleOpen(); toggleMenu(index1)}} on:mouseenter={() =>{toggleMenu(index1)}}>
        <span class=" inline-block px-3 m-0 text-white hover:bg-blueGray-medium-light">
          {menuItem.text}
        </span>
        
        <div class=" absolute z-10 border border-1 border-black {activeMenuIndex === index1 ? 'bg-blueGray-medium-light' : 'hidden'} ">
          {#each menuItem.subMenuItems as subMenuItem, index2}
            <div role="menuitem" tabindex="-1" class=" {activeSubMenuIndex === index2 ? 'bg-blueGray-medium-light' : ''} flex items-center text-white bg-blueGray-light border-black px-4 hover:bg-blueGray-medium-light z-10" on:mouseenter|stopPropagation={() => {toggleSubMenu(index2, subMenuItem?.subMenuItems !== undefined)}} on:mouseleave|stopPropagation={() => {closeSubMenu()}} on:click={subMenuItem.handler} on:keypress={subMenuItem.handler}>
              <span class="pl-2 pr-5">
                {subMenuItem.text}
              </span>
              {#if subMenuItem?.subMenuItems}
                <span class="ml-auto text-white hover:bg-blueGray-medium-light">
                  {">"}
                </span>
                <div class="absolute z-20 top-auto left-full border border-1 border-black {activeSubMenuIndex === index2 ? 'bg-blueGray-medium-light' : 'hidden'}">
                  {#each subMenuItem.subMenuItems as subSubMenuItem}
                    <div role="menuitem" tabindex="-2" class="flex items-center text-white bg-blueGray-light border-black px-4 hover:bg-blueGray-medium-light z-20" on:click={subSubMenuItem.handler} on:keypress={subSubMenuItem.handler}>
                      <span class="pl-2 pr-5"> 
                        {subSubMenuItem.text}
                      </span>
                    </div>
                  {/each}
                </div>
              {/if}
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</div>
