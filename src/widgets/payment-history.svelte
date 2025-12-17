<script lang="ts">
  import { getFormattedDate } from "$lib/date";
  export let paymentHistory;
</script>

<article class="message is-large">
  <div class="message-header">Payment History</div>
  <div class="message-body">
    {#if paymentHistory.length > 0}
      <table class="table is-fullwidth">
        <thead>
          <tr>
            <th><appr title="BoxNumber">Amount</appr></th>
            <th><appr title="CustomerName">Payee</appr></th>
            <th><appr title="BoxEvent">Date</appr></th>
          </tr>
        </thead>
        <tbody>
          {#each paymentHistory as history}
            <tr>
              <td>
                ${history.payment_amount}
              </td>
              <td>
                {history.customer_name}
              </td>
              <td>
                {getFormattedDate(history.payment_date)}
              </td>
            </tr>
          {:else}{/each}
        </tbody>
      </table>
    {:else}
      <p class="is-italic">No payment history to show.</p>
    {/if}
  </div>
</article>
