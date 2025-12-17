<script lang="ts">
  export let authorizedUsers;
  export let customers;

  let modalOpen = false;
  function toggleAddAuthorizedModal() {
    modalOpen = !modalOpen;
  }
</script>

<div class="modal" class:is-active={modalOpen}>
  <div class="modal-background"></div>
  <div class="modal-card">
    <form action="?/addAuthorizedUser" method="post">
      <header class="modal-card-head">
        <p class="modal-card-title">Add Authorized User</p>
        <button
          class="delete"
          aria-label="close"
          type="reset"
          onclick={toggleAddAuthorizedModal}
        ></button>
      </header>
      <section class="modal-card-body">
        <div class="content">
          <p>You are adding a new user for Box</p>

          <div class="field">
            <label class="label">Select a User to Add</label>
            <div class="control">
              <div class="select is-fullwidth">
                <select name="customer_id">
                  {#each customers as customer}
                    <option value={customer.customer_id}
                      >{customer.customer_name}</option
                    >
                  {:else}{/each}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <div class="buttons">
          <button
            class="button is-success"
            type="submit"
            onclick={toggleAddAuthorizedModal}>Submit</button
          >
          <button class="button" onclick={toggleAddAuthorizedModal} type="reset"
            >Cancel
          </button>
        </div>
      </footer>
    </form>
  </div>
</div>

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
            {#if user.rel_code != "PRI"}
              <button
                class="button is-danger is-inverted is-medium"
                aria-label="Remove"
              >
                <span class="icon">
                  <i class="fa fa-trash fa-lg"></i>
                </span>
              </button>
            {/if}
          </div>
        {/each}
        <div class="cell"></div>
        <div class="cell">
          <button
            class="button"
            onclick={toggleAddAuthorizedModal}
            aria-label="Add User"
          >
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
