<script lang="ts">
  export let paymentInfo;

  const date = new Date(paymentInfo.payment_date).toLocaleDateString();
</script>

<div class="box">
  <div class="grid">
    <div class="cell">
      <p class="title is-4">Payment Info</p>
      <p class="subtitle is-4">Status: {paymentInfo.payment_status}</p>
    </div>
    <div class="cell">
      <p class="title is-4">Last Payment</p>
      <p class="subtitle is-4">Amount: {paymentInfo.payment_amount}</p>
      <p class="subtitle is-4">Date: {date}</p>
    </div>
  </div>
</div>
