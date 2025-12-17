<script lang="ts">
  import { getFormattedDate } from "$lib/date";

  export let paymentHistory;
</script>

<article class="message is-large">
  <div class="message-header">Payment History</div>
  <div class="message-body">
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th><appr title="BoxNumber">Amount</appr></th>
          <th><appr title="BoxEvent">Date</appr></th>
        </tr>
      </thead>
      <tbody>
        {#each paymentHistory as history}
          <tr>
            <td>
              {history.payment_amount}
            </td>
            <td>
              {getFormattedDate(history.payment_date)}
            </td>
          </tr>
        {:else}{/each}
      </tbody>
    </table>
  </div>
</article>
