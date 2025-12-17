<script lang="ts">
  import TransferModal from "../../../modals/transferModal.svelte";
  import Payment from "../../../widgets/payment.svelte";
  import PaymentHistory from "../../../widgets/payment-history.svelte";
  import Schedule from "../../../widgets/schedule.svelte";
  import History from "../../../widgets/history.svelte";
  import Users from "../../../widgets/users.svelte";
  export let data;

  const branch = data.box.branch_name;
  const address = data.box.branch_address;
  const customers = data.customers;
  const boxNumber = data.box.box_number;

  console.log(data.box.box_number);

  let showTransferModal = false;

  function openTransferModal() {
    showTransferModal = true;
  }

  function handleCloseModal() {
    showTransferModal = false;
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
        <button class="button is-primary is-inverted is-rounded">
          <span class="icon">
            <i class="fa fa-unlock fa-lg" aria-hidden="true"></i>
          </span>
          <p>Open</p>
        </button>
        <button class="button is-primary is-inverted is-rounded">
          <span class="icon">
            <i class="fa fa-clock-o fa-lg" aria-hidden="true"></i>
          </span>
          <p>Schedule</p>
        </button>
        <button
          class="button is-primary is-inverted is-rounded"
          on:click={openTransferModal}
        >
          <span class="icon">
            <i class="fa fa-exchange fa-lg" aria-hidden="true"></i>
          </span>
          <p>Transfer Box</p>
        </button>
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
              <p class="subtitle is-4">{branch}</p>
            </div>
            <div class="cell is-row-from-end-1">
              <p class="title is-4">Address</p>
              <p class="subtitle is-4">{address}</p>
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
      <Schedule appointments={data.appointment} branchName={branch}></Schedule>
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
  showModal={showTransferModal}
  {boxNumber}
  {branch}
  {customers}
  on:close={handleCloseModal}
/>
