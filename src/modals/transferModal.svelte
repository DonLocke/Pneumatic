<script lang="ts">
  let { onClose, showModal, boxNumber, branch, customers } = $props();

  function closeModal() {
    onClose();
  }
</script>

<div class="modal" class:is-active={showModal}>
  <div class="modal-background" onclick={closeModal}></div>

  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Transfer Safety Deposit Box</p>
      <button class="delete" aria-label="close" onclick={closeModal}></button>
    </header>
    <form action="?/transfer" method="POST">
      <section class="modal-card-body">
        <div class="content">
          <p>
            You are initiating a transfer for Box <strong>#{boxNumber}</strong>
            at <strong>{branch}</strong>.
          </p>

          <div class="field">
            <label class="label">Select A New Box Owner</label>
            <div class="control">
              <div class="select is-fullwidth">
                <select name="customer_id">
                  {#each customers as customer}
                    <option value={customer.customer_id}
                      >{customer.customer_name}</option
                    >
                  {/each}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer class="modal-card-foot">
        <button class="button is-primary" onclick={closeModal}
          >Confirm Box Transfer</button
        >
        <button class="button" onclick={closeModal}>Cancel</button>
      </footer>
    </form>
  </div>
</div>
