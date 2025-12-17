<script lang="ts">
  export let authorizedUsers;
</script>

<article class="message is-large">
  <div class="message-header">Authorized Users</div>
  <div class="message-body has-text-centered">
    <div class="fixed-grid has-3-cols">
      <div class="grid">
        {#each authorizedUsers as user}
          <div class="cell">{user.customer_name}</div>
          <div class="cell">
            {#if user.rel_code == "PRI"}
              <span class="tag is-large is-primary">Primary</span>
            {:else}
              <span class="tag is-large is-dark">Seconday</span>
            {/if}
          </div>
          <div class="cell">
            <button class="button is-danger is-inverted is-medium" aria-label="Remove">
              <span class="icon">
                <i class="fa fa-trash fa-lg"></i>
              </span>
            </button>
          </div>
        {/each}
        <div class="cell"></div>
        <div class="cell">
          <button class="button" aria-label="Add User">
            <span class="icon has-text-primary">
              <i class="fa fa-plus"></i>
            </span>
            <span>Add User</span>
          </button>
        </div>
        <div class="cell"></div>
      </div>
    </div>
  </div>
</article>
