<script lang="ts">
  import favicon from "$lib/assets/favicon.svg";

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bulma@1.0.4/css/bulma.min.css"
  />
</svelte:head>

<nav class="navbar m-2">
  <div class="navbar-brand">
    <a class="button is-ghost" href="/">
      <img src={favicon} alt="box" class="image is-64x64" />
    </a>
  </div>
  <div class="navbar-menu is-active">
    <div class="navbar-end">
      <div class="navbar-item">
        <form action="/login?/logout" method="POST">
          <button class="button is-primary" type="submit">Logout</button>
        </form>
      </div>
    </div>
  </div>
</nav>

{@render children()}
