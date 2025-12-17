<script lang="ts">
  import favicon from "$lib/assets/favicon.svg";
  import logo from "$lib/assets/logo-primary.svg";
  import { page } from "$app/state";

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bulma@1.0.4/css/bulma.min.css"
  />
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
  />
</svelte:head>
<nav class="navbar m-2">
  <div class="navbar-brand">
    <a class="button is-ghost" href="/">
      <img src={logo} alt="box" class="image is-64x64" />
    </a>
  </div>
  {#if page.url.pathname != "/login"}
  <div class="navbar-menu is-active">
    <div class="navbar-start">
      <a href="/" class="navbar-item">Dashboard</a>
      <a href="/" class="navbar-item">Reports</a>
    </div>
    
      <div class="navbar-end">
        <div class="navbar-item">
          <a class="button is-primary is-outlined" href="/new-box"
            >Open New Box</a
          >
          <form action="/login?/logout" method="POST">
            <button class="button is-primary" type="submit">Logout</button>
          </form>
        </div>
      </div>
  </div>{/if}
</nav>

{@render children()}

<footer class="footer mt-6">
  <div class="content has-text-centered">
    Website created by team <strong>Pneumatic</strong> for the 2025 71Tech Hackathon.
  </div>
</footer>
