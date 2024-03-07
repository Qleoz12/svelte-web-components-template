<script lang="ts">
  import "../../lib";
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  
  function setLocale(value) {
    localStorage.setItem("locale", value);
    sessionStorage.setItem("locale", value);
    localStorage.setItem("lng", value);
    sessionStorage.setItem("lng", value);

    dispatch('localeChanged', { value });
  }

  function clear(){
    localStorage.clear()
    sessionStorage.clear()
  }
</script>

<main>
  <!-- <h1>Hello World!</h1>
  <p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p> -->

  <p class="container">
    <!-- <my-component></my-component> -->
    <button on:click={() => setLocale("es")}>Set Spanish Locale</button>
    <button on:click={() => setLocale("eu")}>Set EU Locale</button>
    <button on:click={() => localStorage.setItem("locale", "message")}>
      Set 'message'
    </button>
    <button on:click={() => clear()}>
      clear
    </button>
    <my-footer menus={["Home", "About", "Contact"]}></my-footer>
    <!-- <section>
    <my-footer menus="{[ 'Home', 'About', 'Contact' ]}" language="es"></my-footer>
  </section> -->
  </p>
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
