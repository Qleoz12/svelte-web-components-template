<svelte:options tag="my-footer" />

<!-- <svelte:window on:storage={listener} /> -->

<script lang="ts">
  import { onMount, setContext } from "svelte";
  import { get } from "svelte/store";
  import { i18n, changeLanguage } from "./i18n/i18n";

  import { ROL, fetchMenu } from "./services/menu";
  // import Enlace from "./Enlace.svelte";

  // import { Enlace } from '../moleculas/Enlace.svelte';
  // import { useTranslation } from 'svelte-i18next';
  // import MenuGroup from '..';
  export let menus = [];
  export let language;

  let VITE_APP_LIFERAY;

  // Create a store to hold the current language
  import { writable } from "svelte/store";
  const currentLanguage = writable(language);
  let i18nbar;
  let css = "";

  // Subscribe to changes in the language parameter and update the store
  $: {
    i18nbar = $i18n;
    console.log(language);
    currentLanguage.set(language);
    // changeLanguage(language);
    //this works
    console.log(get(i18n).language);
    console.log(menus);
  }
  addMenu();

  // window.addEventListener("storage", (e) => {
  //   // When local storage changes, dump the list to
  //   // the console.
  //   console.log(e);
  //   console.log(JSON.parse(window.localStorage.getItem("locale")));
  // });

  // window.onstorage = (e) => {
  //   // When local storage changes, dump the list to
  //   // the console.
  //   console.log(e);
  //   console.log(JSON.parse(window.localStorage.getItem("locale")));
  // };

  // onMount(() => {
  //   window.addEventListener("storage", (e) => {
  //     // When local storage changes, dump the list to
  //     // the console.
  //     console.log(e);
  //     console.log(JSON.parse(window.localStorage.getItem("locale")));
  //   });

  //   window.onstorage = (e) => {
  //     // When local storage changes, dump the list to
  //     // the console.
  //     console.log(e);
  //     console.log(JSON.parse(window.localStorage.getItem("locale")));
  //   };

  //   // Custom store that syncs with local storage
  //   function localStorageStore(key, initialValue) {
  //     const storedValue = localStorage.getItem(key);
  //     let initial;
  //     try {
  //       initial = storedValue ? JSON.parse(storedValue) : initialValue;
  //     } catch (error) {
  //       console.error("Error parsing storedValue:", error);
  //       initial = initialValue; // Fallback to initialValue if parsing fails
  //     }
  //     const store = writable(initial);

  //     store.subscribe((value) => {
  //       console.log("cambios");
  //       localStorage.setItem(key, JSON.stringify(value));
  //     });

  //     return store;
  //   }

  //   // Create a store for the "locale" key
  //   const localeStore = localStorageStore("locale", {});

  //   // Function to log changes
  //   function logChange(store) {
  //     store.subscribe((value) => {
  //       console.log(value);
  //     });
  //   }

  //   // Log changes to the locale store
  //   logChange(localeStore);
  // });

  // onMount(async () => {
  //   try {
  //     const response = await fetch(
  //       "https://raw.githubusercontent.com/Qleoz12/react-projects/main/ENETUM/main.scss",
  //     );
  //     css = await response.text();

  //     // Create a style tag and append it to the head
  //     const styleTag = document.createElement("style");
  //     styleTag.textContent = css;
  //     document.head.appendChild(styleTag);
  //   } catch (error) {
  //     console.error("Failed to fetch CSS:", error);
  //   }
  // });

  // Define the action
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
      console.log("adenu", get(i18n).language);
      try {
        menus = await fetchMenu(ROL.CIUDADANO, get(i18n).language, {}); // Adjust parameters as necessary
      } catch (error) {
        console.error("Failed to fetch menus:", error);
      }
    });
  }
</script>

<!-- {@debug} -->
<div class="sedeBodyGeneral">
  <footer use:addStyle>
    <!-- <Enlace {menus} /> -->
    <ul class="sedeMapaWeb">
      {#each menus as menu}
        <li>
          {#if menu.url}
            <a href={menu.url}>{menu.label}</a>
          {:else}
            <span>{menu.label}</span>
          {/if}
          {#if menu.menuItem && menu.menuItem.length > 0}
            <ul>
              {#each menu.menuItem as subItem, subIndex (subIndex)}
                <li>
                  <a
                    href={subItem.url}
                    target={subItem.abreNuevaPestana ? "_blank" : "_self"}
                  >
                    {subItem.label}
                  </a>
                </li>
              {/each}
            </ul>
          {/if}
        </li>
      {/each}
    </ul>
    <!-- end menus -->
    <slot name="enlaces" />
    <div id="sede-chatweb">
      <a
        href={$i18n.t("pie.chat.url")}
        class="sede-chatweb-button"
        target="_blank"
        rel="noopener noreferrer"
        title={$i18n.t("pie.chat.title")}
      >
        <span class="sr-only">{$i18n.t("pie.chat.texto")}</span>
      </a>
    </div>
    <!-- this not get update -->
    <div class="sedeMenuOpcionesPie">
      <p class="sedeCopy">{$i18n.t("pie.diputacion-foral")}</p>
      <ul class="sedeOpcionesPie">
        <li>
          <a
            href={$i18n.t("pie.opcion.mapa-web.url", {
              dominio: VITE_APP_LIFERAY,
            })}
          >
            {$i18n.t("pie.opcion.mapa-web.texto")}
          </a>
        </li>
        <li>
          <a
            href={$i18n.t("pie.opcion.aviso-legal.url", {
              dominio: VITE_APP_LIFERAY,
            })}
          >
            {$i18n.t("pie.opcion.aviso-legal.texto")}
          </a>
        </li>
        <li>
          <a
            href={$i18n.t("pie.opcion.accesibilidad.url", {
              dominio: VITE_APP_LIFERAY,
            })}
          >
            {$i18n.t("pie.opcion.accesibilidad.texto")}
          </a>
        </li>
        <li>
          <a
            href={$i18n.t("pie.opcion.cookie.url", {
              dominio: VITE_APP_LIFERAY,
            })}
          >
            {$i18n.t("pie.opcion.cookie.texto")}
          </a>
        </li>
      </ul>
      <div class="sedeConformidadesPie">
        <ul class="sedeLogosPie"></ul>
      </div>
    </div>
  </footer>
</div>
