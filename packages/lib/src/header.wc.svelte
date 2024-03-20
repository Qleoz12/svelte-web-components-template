<svelte:options tag="my-header" />

<script lang="ts">
  import { onMount } from "svelte";
  import Logo from "./components/logo.svelte";

  let time = new Date();

  // these automatically update when `time`
  // changes, because of the `$:` prefix
  $: hours = time.getHours();
  $: minutes = time.getMinutes();
  $: seconds = time.getSeconds();

  onMount(() => {
    const interval = setInterval(() => {
      time = new Date();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });
</script>

<header class="sedeCabecera">
  <Logo />
  <!-- <BotonCabecera {...data.botones} /> -->
  <!-- <AreaPrivada data={data} /*onSalir={onSalir}*/></AreaPrivada> -->
</header>
