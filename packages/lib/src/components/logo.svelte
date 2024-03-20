<script>
    import { t } from "i18next";
    import { onMount } from "svelte";
    
    let imageUrl = "";

    onMount(() => {
        // Construct the image URL using the environment variable
        imageUrl = `https://www.ebizkaia.eus/o/EWSS001C-theme/irudiak/sedeLogoApaisado.svg`;
    });
</script>

<h2 class="sedeLogo" aria-label="logo ebizkaia">
    {#if imageUrl}
        <img src={imageUrl} alt={t("cabecera.textoLogo")} />
    {/if}
</h2>
