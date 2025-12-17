<script lang="ts">
  export let showModal: boolean = false;
  export let boxNumber: number | string;
  export let branch: string;
  export let customers;

  // Change this to "runes"
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  function closeModal() {
    dispatch("close");
  }
</script>

<div class="modal" class:is-active={showModal}>
  <div class="modal-background" on:click={closeModal}></div>

  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Transfer Safety Deposit Box</p>
      <button class="delete" aria-label="close" on:click={closeModal}></button>
    </header>

    <section class="modal-card-body">
      <div class="content">
        <p>
          You are initiating a transfer for Box **#{boxNumber}** at **{branch}**.
        </p>

        <div class="field">
          <label class="label">Select A New Box Owner</label>
          <div class="control">
            <div class="select is-fullwidth">
              <select>
                {#each customers as customer}
                  <option>{customer.customer_name}</option>
                {:else}{/each}
              </select>
            </div>
          </div>
        </div>
      </div>
    </section>

    <footer class="modal-card-foot">
      <button class="button is-primary" on:click={closeModal}
        >Confirm Box Transfer</button
      >
      <button class="button" on:click={closeModal}>Cancel</button>
    </footer>
  </div>
</div>
