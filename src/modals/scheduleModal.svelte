<!-- <script lang="ts">
    let {onClose} = $props();

    function close() {
    onClose();
  }
</script>

<div class="modal is-active">
  <div class="modal-background"></div>
  <div class="modal-content" >
    <p>Testing 123</p>
  </div>
  <button class="modal-close is-large" aria-label="close" onclick={close}></button>
</div> -->
 
<script lang="ts">
  export let showModal: boolean = false;
  export let boxData;
  export let currentCustomer;

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
      <p class="modal-card-title">Schedule an Appointment</p>
      <button class="delete" aria-label="close" on:click={closeModal}></button>
    </header>

    <section class="modal-card-body">
      <div class="content">
        <p>
          You are scheduling an appointment to access boxes at {boxData.branch_name}.
        </p>
        <div class="field">
          <label class="label">Branch</label>
          <div class="control">
            <input class="input" type="text" value={boxData.branch_name} disabled />
          </div>
        </div>
        <div class="field">
          <label class="label">Day</label>
          <div class="control">
            <input class="input" type="date"/>
          </div>
        </div>
        <div class="field">
          <label class="label">Time</label>
          <div class="control">
            <input class="input" type="time"/>
          </div>
        </div>
      </div>
    </section>

    <footer class="modal-card-foot">
      <button class="button is-primary" on:click={closeModal}
        >Schedule</button
      >
      <button class="button" on:click={closeModal}>Cancel</button>
    </footer>
  </div>
</div>
