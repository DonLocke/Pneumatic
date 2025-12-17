<script lang="ts">
  export let data;

  let showModal = false;
  let tier = "";

  function toggleModal(event: MouseEvent) {
    if (showModal) {
      tier = "";
      showModal = false;
    } else {
      tier = (event.currentTarget as HTMLButtonElement).value;
      showModal = true;
    }

    console.log(tier);
  }
</script>

<div class="container is-centered mt-6">
  <div class="fixed-grid has-3-cols">
    <div class="grid has-text-centered">
      <div class="cell pt-5">
        <div class="card">
          <div class="card-content">
            <p class="title is-3 has-text-primary">Sprint</p>
            <p class="title">$12.99*</p>
            <p class="subtitle">per Day</p>
            <p>
              Get access starting when the location opens lasting until the
              location closes for the day.
            </p>
            <button
              class="button mt-5"
              value="Sprint"
              onclick={toggleModal}
              >Select Box</button>
          </div>
        </div>
      </div>
      <div class="cell">
        <div class="card" style="height: 100%">
          <div class="card-content">
            <p class="title is-3 has-text-primary">Standard</p>
            <p class="title">$25.99*</p>
            <p class="subtitle">per Month</p>
            <p>Get access each day for 30 days.</p>
            <button
              class="button is-primary is-outlined mt-5"
              value="Standard"
              onclick={toggleModal}
              >Select Box</button
            >
          </div>
        </div>
      </div>
      <div class="cell pt-5">
        <div class="card">
          <div class="card-content">
            <p class="title is-3 has-text-primary">Marathon</p>
            <p class="title">$199.99*</p>
            <p class="subtitle">Per Year</p>
            <p>Get access for a full 365 days.</p>
            <p class="is-italic mt-2">
              Includes 1 free transfer to another location
            </p>
            <button
              class="button mt-5"
              value="Marathon"
              onclick={toggleModal}
              >Select Box</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <p class="subtit has-text-centered">* Starting at</p>
</div>

<div class="modal" class:is-active={showModal}>
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title has-text-primary">{tier}</p>
      <button class="delete" aria-label="close" onclick={toggleModal}></button>
    </header>
    <section class="modal-card-body">
      <div class="field">
        <div class="label">Location</div>
        <div class="control">
          <div class="select is-fullwidth">
            <select>
              {#each data.branches as branch}
                <option value={branch.branc_id}>{branch.branch_name}</option>
              {/each}
            </select>
          </div>
        </div>
      </div>
      
    </section>
    <footer class="modal-card-foot">
      <div class="buttons">
        <button class="button is-success" onclick={toggleModal}>Submit</button>
        <button class="button" onclick={toggleModal}>Cancel</button>
      </div>
    </footer>
  </div>
</div>