<svelte:options tag="my-menu" />

<script>
  import { onMount, setContext } from "svelte";
  import { get } from "svelte/store";
  import { i18n } from "./i18n/i18n";
  import { ROL, fetchMenu } from "./services/menu";
  import { isProfesional } from "./services/profesional";

  export let menus = [];
  export let isAuthenticated = false;
  export let urlsIdioma = {};
  export let numeroavisos = 0;

  let VITE_APP_SEDE_HOME = import.meta.env.VITE_APP_SEDE_HOME;
  let cssConectado = isAuthenticated ? "conectado" : "desconectado";
  let mycss = `sedeMenuPpal ${cssConectado}`;
  let css = "";

  // Define functions and logic here
  function addStyle(node) {
    onMount(async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/Qleoz12/react-projects/main/ENETUM/main.scss",
        );
        css = await response.text();

        // Create a style tag and append it to the node
        const styleTag = document.createElement("style");
        styleTag.textContent = css;
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

  async function addMenu() {
    onMount(async () => {
      console.log("add menu", get(i18n).language);
      try {
        menus = await fetchMenu(ROL.CIUDADANO, get(i18n).language, {}); // Adjust parameters as necessary
      } catch (error) {
        console.error("Failed to fetch menus:", error);
      }
    });
  }

  addMenu();
</script>

<div class="">
  <div class="root">
    <nav class={mycss} use:addStyle>
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
        <a
          href="#"
          role="button"
          tabindex="0"
          class="p-menubar-button"
          aria-label="Menu Bar"
          data-pc-section="button"
        ></a>
        <ul class="p-menubar-root-list" role="menubar" data-pc-section="menu">
          {#each menus as menu}
          <li role="none" class="p-menuitem" data-pc-section="menuitem">
            <a
              href=""
              class="p-menuitem-link"
              target="_self"
              role="menuitem"
              aria-label="Conozca la sede"
              alt-text=""
            >
              <span class="p-menuitem-text">{menu.label}</span>
            </a>
          </li>
          {/each}
        </ul>
      </div>
    </nav>
  </div>
</div>
