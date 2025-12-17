<script lang="ts">
  export let paymentInfo;
  export let boxInfo;

  const date = new Date(paymentInfo.payment_date).toLocaleDateString();

  const currencyFormatter = Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'});
  const balance = paymentInfo.payment_amount - boxInfo.box_cost;
</script>

<article class="message is-large">
  <div class="message-header">Payment Information</div>
  <div class="message-body">
    <div class="fixed-grid">
      <div class="grid">
        <div class="cell">
          <p class="title is-4">Status</p>
          <p class="subtitle is-4">{boxInfo.payment_status}</p>
        </div>
        <div class="cell">
          <p class="title is-4">Last Payment</p>
          <p class="subtitle is-4">${paymentInfo.payment_amount} on {date}</p>
        </div>
        <div class="cell">
          <p class="title is-4">Cost (Monthly)</p>
          <p class="subtitle is-4">${boxInfo.box_cost}</p>
        </div>
        <div class="cell">
          <p class="title is-4">Balance</p>
          <p class="subtitle is-4" class:has-text-danger={balance<0}>{currencyFormatter.format(balance)}</p>
        </div>
      </div>
    </div>
  </div>
</article>
