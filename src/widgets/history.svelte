<script lang="ts">
  import { getFormattedDateTime } from "$lib/date";

  export let boxHistory;
</script>

<article class="message is-large">
  <div class="message-header">History Information</div>
  <div class="message-body">
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th><appr title="BoxEvent"> Box Event</appr></th>
          <th><appr title="BoxEventTime"> Box Event Time</appr></th>
        </tr>
      </thead>
      <tbody>
        {#each boxHistory as history}
          <tr>
            <td
              class:has-text-success={history.event_type == "OPEN"}
              class:has-text-danger={history.event_type == "CLOSED"}
            >
              {history.event_type}
            </td>
            <td>
              {getFormattedDateTime(history.event_date)}
            </td>
          </tr>
        {:else}{/each}
      </tbody>
    </table>
  </div>
</article>
