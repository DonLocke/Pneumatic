<script lang="ts">
  export let paymentInfo;
  export let boxInfo;
  export let totalPayments;

  let modalOpen = false;

  let date = "";
  if (paymentInfo) {
    date = new Date(paymentInfo?.payment_date).toLocaleDateString();
  }

  const currencyFormatter = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const balance = totalPayments - boxInfo.box_cost;

  function togglePaymentModal() {
    modalOpen = !modalOpen;
  }
</script>

<div class="modal" class:is-active={modalOpen}>
  <div class="modal-background"></div>
  <div class="modal-card">
    <form action="?/payment" method="post">
      <header class="modal-card-head">
        <p class="modal-card-title">Make A Payment</p>
        <button
          class="delete"
          aria-label="close"
          type="reset"
          onclick={togglePaymentModal}
        ></button>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <div class="label">Payment Amount</div>
          <p class="control has-icons-left">
            <input type="text" class="input" name="amount" placeholder="0.00" />
            <span class="icon is-small is-left">
              <i class="fa fa-dollar"></i>
            </span>
          </p>
        </div>
      </section>
      <footer class="modal-card-foot">
        <div class="buttons">
          <button
            class="button is-success"
            type="submit"
            onclick={togglePaymentModal}>Submit</button
          >
          <button class="button" type="reset" onclick={togglePaymentModal}
            >Cancel</button
          >
        </div>
      </footer>
    </form>
  </div>
</div>

<article class="message is-large">
  <div class="message-header">
    Payment Information

    <button
      class="button is-primary is-inverted is-rounded"
      aria-label="make payment"
      onclick={togglePaymentModal}
    >
      <span class="icon">
        <i class="fa fa-money"></i>
      </span>
      <span>Make a Payment</span>
    </button>
  </div>
  <div class="message-body">
    <div class="fixed-grid">
      <div class="grid">
        <div class="cell">
          <p class="title is-4">Status</p>
          <p class="subtitle is-4">{boxInfo.payment_status}</p>
        </div>
        <div class="cell">
          <p class="title is-4">Last Payment</p>
          {#if paymentInfo}
            <p class="subtitle is-4">${paymentInfo.payment_amount} on {date}</p>
          {:else}
            <p class="subtitle is-4">N/A</p>
          {/if}
        </div>
        <div class="cell">
          <p class="title is-4">Cost (Monthly)</p>
          <p class="subtitle is-4">${boxInfo.box_cost}</p>
        </div>
        <div class="cell">
          <p class="title is-4">Balance</p>
          <p
            class="subtitle is-4"
            class:has-text-danger={balance < 0}
            class:has-text-primary={balance >= 0}
            >{currencyFormatter.format(balance)}
          </p>
        </div>
      </div>
    </div>
  </div>
</article>
