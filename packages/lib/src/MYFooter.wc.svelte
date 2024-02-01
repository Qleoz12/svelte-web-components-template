<svelte:options tag="my-footer" />

<script lang="ts">
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import { i18n } from "./i18n/i18n";

  // import { Enlace } from '../moleculas/Enlace.svelte';
  // import { useTranslation } from 'svelte-i18next';
  // import MenuGroup from '..';
  // export let menus = [];

  let VITE_APP_LIFERAY;

  onMount(() => {
    VITE_APP_LIFERAY = "";
  });
  console.log(get(i18n).t("pie.chat.url"));
</script>

<footer>
  <!-- <Enlace {menus} /> -->
  <slot name="enlaces">
    <p>no menu</p>
  </slot>
  <div id="sede-chatweb">
    <a
      href={get(i18n).t("pie.chat.url")}
      class="sede-chatweb-button"
      target="_blank"
      rel="noopener noreferrer"
      title={get(i18n).t("pie.chat.title")}
    >
      <span class="sr-only">{get(i18n).t("pie.chat.texto")}</span>
    </a>
  </div>
  <div class="sedeMenuOpcionesPie">
    <p class="sedeCopy">{get(i18n).t("pie.diputacion-foral")}</p>
    <ul class="sedeOpcionesPie">
      <li>
        <a
          href={get(i18n).t("pie.opcion.mapa-web.url", {
            dominio: VITE_APP_LIFERAY,
          })}
        >
          {get(i18n).t("pie.opcion.mapa-web.texto")}
        </a>
      </li>
      <li>
        <a
          href={get(i18n).t("pie.opcion.aviso-legal.url", {
            dominio: VITE_APP_LIFERAY,
          })}
        >
          {get(i18n).t("pie.opcion.aviso-legal.texto")}
        </a>
      </li>
      <li>
        <a
          href={get(i18n).t("pie.opcion.accesibilidad.url", {
            dominio: VITE_APP_LIFERAY,
          })}
        >
          {get(i18n).t("pie.opcion.accesibilidad.texto")}
        </a>
      </li>
      <li>
        <a
          href={get(i18n).t("pie.opcion.cookie.url", {
            dominio: VITE_APP_LIFERAY,
          })}
        >
          {get(i18n).t("pie.opcion.cookie.texto")}
        </a>
      </li>
    </ul>
    <div class="sedeConformidadesPie">
      <ul class="sedeLogosPie"></ul>
    </div>
  </div>
</footer>
