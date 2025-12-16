<script lang="ts">
  export let paymentInfo;
  export let boxInfo;

  const date = new Date(paymentInfo.payment_date).toLocaleDateString();
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
          <p class="subtitle is-4">Amount: {paymentInfo.payment_amount}</p>
          <p class="subtitle is-4">Date: {date}</p>
        </div>
      </div>
    </div>
  </div>
</article>
