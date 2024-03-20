<script lang="ts">
  import "../../lib";
  import { createEventDispatcher } from "svelte";
  import DemoSlot from "./demo-slot.svelte";
  import Demoalone from "./demoalone.svelte";

    const dispatch = createEventDispatcher();

  function setLocale(value) {
    localStorage.setItem("locale", value);
    sessionStorage.setItem("locale", value);
    localStorage.setItem("lng", value);
    sessionStorage.setItem("lng", value);
    dispatch("localeChanged", { value });
  }

  function clear() {
    localStorage.clear();
    sessionStorage.clear();
  }
</script>

<main>
  <h1>Demo WebComponents integration with svelte</h1>
  <p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>

  <div class="container">
    <!-- <my-component></my-component> -->
  <section>    
    <h3>events</h3>
    <button on:click={() => setLocale("es")}>Set Spanish Locale</button>
    <button on:click={() => setLocale("eu")}>Set EU Locale</button>
    <button on:click={() => localStorage.setItem("locale", "message")}>Set 'message'</button>
    <button on:click={() => clear()}> clear </button>
  </section>

    <!-- demo how coul use the webcomponent  -->
    
    <my-header></my-header>
    <my-menu></my-menu>
    <!-- <my-footer></my-footer> -->
    <!-- <my-component></my-component> -->
    <!-- <DemoSlot></DemoSlot> -->
    <!-- <Demoalone></Demoalone> -->
  </div>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    font-size: 4em;
    line-height: 1.1;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }

    .container {
      display: inline-block;
      /* max-width: 320px; */
    }
  }
</style>
