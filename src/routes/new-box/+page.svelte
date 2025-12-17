<script lang="ts">
  import type { PageData } from "./$types";

  let { data } = $props<{data: PageData}>();

  let showModal = $state(false);
  let tier = $state("");
  let selected_branch = $state("");

  function toggleModal(event: MouseEvent) {
    if (showModal) {
      tier = "";
      showModal = false;
    } else {
      tier = (event.currentTarget as HTMLButtonElement).value;
      showModal = true;
    }
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
      <button class="delete" aria-label="close" type="reset" onclick={toggleModal}></button>
    </header>
    <section class="modal-card-body">
      <div class="field">
        <div class="label">Location</div>
        <div class="control">
          <div class="select is-fullwidth">
            <select bind:value={selected_branch}>
              {#each data.branches as branch}
                <option value={branch.branc_id}>{branch.branch_name}</option>
              {/each}
            </select>
          </div>
        </div>
      </div>

      {#if selected_branch != ""}
      <div class="container mt-5">
        <div class="field">
          <div class="label">Choose Your Box</div>
          <div class="fixed-grid has-12-cols">
            <div class="grid ">
              {#each {length: 72} as _, index}
              <div class="cell">
                <button aria-label="Box #${index}">
                  <div
                    class="icon has-text-primary"
                    class:has-text-primary={
                      (tier == "Sprint" && (index % 4 == 0 || index % 7 == 0)) ||
                      (tier == "Standard" && (index % 2 == 0 || index % 15 == 0)) ||
                      (tier == "Marathon" && (index % 10 == 0 || index % 19 == 0))
                    }
                    class:has-text-danger={
                      (tier == "Sprint" && (index % 9 == 0 || index % 13 == 0)) ||
                      (tier == "Standard" && (index % 17 == 0 || index % 18 == 0)) ||
                      (tier == "Marathon" && (index % 6 == 0 || index % 21 == 0))
                    }
                    ><i class="fa fa-square fa-2x"></i>
                  </div>
                </button>
              </div>
              {/each}
            </div>
          </div>
        </div>
      </div>
      
      <div class="field mt-5">
        <div class="label is-1">Total</div>
        <p class="subtitle">$
          {#if tier == "Sprint"}
            12.99
          {:else if tier == "Standard"}
            26.99
          {:else}
            204.77
          {/if}
        </p>
      </div>
      {/if}

    </section>
    <footer class="modal-card-foot">
      <div class="buttons">
        <button class="button is-success" onclick={toggleModal} disabled={selected_branch == ""}>Submit</button>
        <button class="button" type="reset" onclick={toggleModal}>Cancel</button>
      </div>
    </footer>
  </div>
</div>