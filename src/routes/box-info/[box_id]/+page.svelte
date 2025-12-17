<script lang="ts">
  import { page } from "$app/state";
  import TransferModal from "../../../modals/transferModal.svelte";
  import ScheduleModal from "../../../modals/scheduleModal.svelte";
  import Payment from "../../../widgets/payment.svelte";
  import PaymentHistory from "../../../widgets/payment-history.svelte";
  import Schedule from "../../../widgets/schedule.svelte";
  import History from "../../../widgets/history.svelte";
  import Users from "../../../widgets/users.svelte";
  import type { PageData } from "./$types";
  import { invalidateAll } from "$app/navigation";

  let { data } = $props<{ data: PageData }>();

  const box_id = $derived(page.params.box_id);

  let showTransferModal = $state(false);
  let showScheduleModal = $state(false);

  async function openTransferModal() {
    const response = await fetch("/transfer");
    showTransferModal = true;
  }

  function handleCloseTransferModal() {
    showTransferModal = false;
  }

  function openScheduleModal() {
    showScheduleModal = true;
  }

  function handleCloseScheduleModal() {
    showScheduleModal = false;
  }
  async function openBox() {
    await fetch(`/api/${box_id}/open`, {
      method: "GET",
    });
    invalidateAll();
  }

  async function closeBox() {
    await fetch(`/api/${box_id}/close`, {
      method: "GET",
    });
    invalidateAll();
  }
</script>

<section class="hero">
  <div class="hero-body">
    <p class="title is-1">Box #{data.box.box_number}</p>
    <p class="subtitle is-4">
      {data.box.branch_name}
      <span
        class="tag is-primary ml-3"
        class:is-primary={data.box.payment_status == "PAID"}
        class:is-danger={data.box.payment_status == "UNPAID"}
        >{data.box.payment_status}</span
      >
    </p>
    <hr
      class:has-background-primary={data.box.payment_status == "PAID"}
      class:has-background-danger={data.box.payment_status == "UNPAID"}
      style="width: 4rem; height: .25rem"
    />
  </div>
</section>

<div class="container">
  <div class="columns is-multiline">
    <!-- Row One -->
    <div class="column"></div>
    <div class="column is-four-fifths">
      <div class="buttons is-centered are-large">
        {#if data.box.box_status == "CLOSED"}
          <button
            class="button is-primary is-inverted is-rounded"
            onclick={openBox}
          >
            <span class="icon">
              <i class="fa fa-lock fa-lg" aria-hidden="true"></i>
            </span>
            <p>Open</p>
          </button>
        {:else if data.box.box_status == "OPEN"}
          <button
            class="button is-warning is-inverted is-rounded"
            onclick={closeBox}
          >
            <span class="icon">
              <i class="fa fa-unlock fa-lg" aria-hidden="true"></i>
            </span>
            <p>Close</p>
          </button>
        {:else}
          <button class="button is-rounded" disabled onclick={closeBox}>
            <span class="icon">
              <i class="fa fa-lock fa-lg" aria-hidden="true"></i>
            </span>
            <p>Open</p>
          </button>
        {/if}
        <button
          class="button is-primary is-inverted is-rounded"
          onclick={openScheduleModal}
        >
          <span class="icon">
            <i class="fa fa-clock-o fa-lg" aria-hidden="true"></i>
          </span>
          <p>Schedule</p>
        </button>
        {#if data.box.payment_status == "PAID"}
        <button
          class="button is-primary is-inverted is-rounded"
          onclick={openTransferModal}
        >
          <span class="icon">
            <i class="fa fa-exchange fa-lg" aria-hidden="true"></i>
          </span>
          <p>Transfer Box</p>
        </button>
        {:else}
          <button
          class="button is-rounded"
          disabled
          onclick={openTransferModal}
          >
            <span class="icon">
              <i class="fa fa-exchange fa-lg" aria-hidden="true"></i>
            </span>
            <p>Transfer Box</p>
          </button>
        {/if}
        {#if data.box.payment_status == "PAID"}
        <button class="button is-danger is-inverted is-rounded" >
          <span class="icon">
            <i class="fa fa-ban fa-lg" aria-hidden="true"></i>
          </span>
          <p>Cancel Box</p>
        </button>
        {:else}
        <button class="button is-rounded" disabled>
          <span class="icon">
            <i class="fa fa-ban fa-lg" aria-hidden="true"></i>
          </span>
          <p>Cancel Box</p>
        </button>
        {/if}
      </div>
    </div>
    <div class="column"></div>

    <!-- Row Two-->
    <div class="column is-three-fifths">
      <article class="message is-large">
        <div class="message-header">Box Information</div>
        <div class="message-body">
          <div class="grid">
            <div class="cell">
              <p class="title is-4">Branch</p>
              <p class="subtitle is-4">{data.box.branch_name}</p>
            </div>
            <div class="cell is-row-from-end-1">
              <p class="title is-4">Address</p>
              <p class="subtitle is-4">{data.box.branch_address}</p>
            </div>
            <div class="cell">
              <p class="title is-4">Hours</p>
              <p class="subtitle is-4">
                {data.box.branch_open} - {data.box.branch_close}
              </p>
            </div>
          </div>
        </div>
      </article>
    </div>
    <div class="column is-two-fifths">
      <Schedule appointments={data.appointment} branchName={data.box.branch_name} openScheduleAppointment={openScheduleModal}
      ></Schedule>
    </div>

    <!-- Row Three -->
    <div class="column is-half">
      <Payment boxInfo={data.box} paymentInfo={data.payment}></Payment>
    </div>
    <div class="column">
      <Users authorizedUsers={data.authorizedUsers} />
    </div>

    <!-- Row Four -->
    <div class="column is-two-fifths">
      <PaymentHistory paymentHistory={data.paymentHistory} />
    </div>
    <div class="column is-three-fifths">
      <History boxHistory={data.boxHistory} />
    </div>
  </div>
</div>

<TransferModal
  onClose={handleCloseTransferModal}
  showModal={showTransferModal}
  boxNumber={data.box.box_number}
  branch={data.box.branch_name}
  customers={data.customers}
/>
<ScheduleModal
  onClose={handleCloseScheduleModal}
  showModal={showScheduleModal}
  boxData={data.box}
/>
