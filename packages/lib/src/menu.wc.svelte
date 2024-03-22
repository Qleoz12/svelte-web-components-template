<svelte:options tag="my-menu" />

<script>
  import { onMount, setContext } from "svelte";
  import { get } from "svelte/store";
  import { i18n } from "./i18n/i18n";
  import { ROL, fetchMenu } from "./services/menu";
  import { isProfesional } from "./services/profesional";
  import * as sass from "sass";
  import { VITE_APP_SEDE_HOME, url_estilos } from "./constants";

  export let menus = [];
  let wrapper;

  // TODO RESOLVE
  export let isAuthenticated = false;
  // export let urlsIdioma = {};
  // export let numeroavisos = 0;

  let cssConectado = isAuthenticated ? "conectado" : "desconectado";
  let mycss = `sedeMenuPpal ${cssConectado}`;
  let scss = "";

  // Define functions and logic here
  function addStyle(node) {
    onMount(async () => {
      try {
        console.log(url_estilos);
        const response = await fetch(url_estilos);
        scss = await response.text();

        // Compile SCSS to CSS
        const css = sass.compileString(scss);

        // Create a style tag and append it to the node
        const styleTag = document.createElement("style");
        styleTag.textContent = css.css;
        node.appendChild(styleTag);
      } catch (error) {
        console.error("Failed to fetch CSS:", error);
      }
    });

    return {
      destroy() {
        // Cleanup if necessary
      },
    };
  }

  async function fetchAndSetMenu() {
    onMount(async () => {
      console.log("add menu", get(i18n).language);
      try {
        menus = await fetchMenu(ROL.CIUDADANO, get(i18n).language, {}); // Adjust parameters as necessary
        menus = menus.filter(
          (x) => x.muestraOpcion === "A" || x.muestraOpcion === "C",
        );
      } catch (error) {
        console.error("Failed to fetch menus:", error);
      }
    });
  }

  //call once
  fetchAndSetMenu();

  // Function to handle clicks menu li a
  function handleMenuClick(event) {
    event.preventDefault();
    event.stopPropagation();

    event.currentTarget.parentElement.classList.toggle("p-menuitem-active");
  }

  // Function to handle clicks outside the menu
  function handleOutsideClick(event) {
    const menu = wrapper.querySelector(".p-menubar");
    if (!menu.contains(event.target)) {
      const activeMenuItems = wrapper.querySelectorAll(".p-menuitem-active");
      activeMenuItems.forEach((item) =>
        item.classList.remove("p-menuitem-active"),
      );
    }
  }

  // Add event listener to handle clicks outside the menu
  onMount(() => {
    wrapper.addEventListener("click", handleOutsideClick);
    return () => {
      wrapper.removeEventListener("click", handleOutsideClick);
    };
  });

  // Function to handle click events
  // Add event listener to handle clicks outside the webcomponent experimental
  // this override the click from outside? 
  function handleClickoutsidewebcomponent(event) {
    const webComponent = document.getElementById("my-menu");
    // Check if the clicked element is outside the web component
    if (!webComponent.contains(event.target)) {
      
      handleOutsideClick(event);
    } else {
      
    }

  }

  // Add event listener on component mount
  onMount(() => {
    window.addEventListener("click", handleClickoutsidewebcomponent);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("click", handleClickoutsidewebcomponent);
    };
  });
</script>

<!-- Your HTML structure -->
<div class="sedeBodyGeneral pr" use:addStyle bind:this={wrapper}>
  <div id="root">
    <nav class={mycss}>
      {#if isProfesional()}
        <a
          href={$i18n.t("cabecera.urls.area-personal", {
            dominio: import.meta.env.VITE_APP_SEDE_HOME,
          })}
          class="sedeBtnRojo"
        >
          {$i18n.t("cabecera.menuCiudadania")}
        </a>
      {:else}
        <a
          href={$i18n.t("cabecera.urls.area-profesional", {
            dominio: VITE_APP_SEDE_HOME,
          })}
          class="bgTurquesa"
        >
          {$i18n.t("cabecera.menuProfesional")}
        </a>
      {/if}
      <div
        class="p-menubar p-component"
        aria-label="Menubar"
        data-pc-name="menubar"
        data-pc-section="root"
      >
        <ul class="p-menubar-root-list" role="menubar" data-pc-section="menu">
          {#each menus as menu}
            <li class="p-menuitem {menu.estilOpcion}">
              <a
                role="menuitem"
                aria-label={menu.label}
                class="p-menuitem-link"
                target="_self"
                on:click={handleMenuClick}
              >
                {#if menu.urlImagen}
                  <img src={menu.urlImagen} />
                {:else}
                  <span class="p-menuitem-text">{menu.label}</span>
                {/if}
              </a>
              {#if menu.menuItem}
                <ul class="p-submenu-list" role="menu" data-pc-section="menu">
                  {#each menu.menuItem as menuitem}
                    <li
                      role="none"
                      class="p-menuitem"
                      data-pc-section="menuitem"
                    >
                      <a
                        href={menuitem.url}
                        class="p-menuitem-link"
                        role="menuitem"
                        aria-label={menuitem.label}
                        alt-text={menuitem.url}
                      >
                        <span class="p-menuitem-text">
                          {menuitem.label}
                        </span>
                      </a>
                    </li>
                  {/each}
                </ul>
              {/if}
            </li>
          {/each}
        </ul>
      </div>
      <!--  fin div menu -->
    </nav>
  </div>
  <!-- end root -->
</div>
<!-- Your HTML structure -->