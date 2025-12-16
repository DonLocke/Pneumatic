<script lang="ts">
  import { getFormattedDate } from "../date";

  export let boxHistory;
</script>

<article class="message is-large">
  <div class="message-header">History Information</div>
  <div class="message-body">
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th><appr title="BoxNumber"> Box Number</appr></th>
          <th><appr title="BoxEvent"> Box Event</appr></th>
          <th><appr title="BoxEventTime"> Box Event Time</appr></th>
        </tr>
      </thead>
      <tbody>
        {#each boxHistory as history}
          <tr>
            <td>
              {history.box_number}
            </td>
            <td>
              {history.event_type}
            </td>
            <td>
              {getFormattedDate(history.event_date)}
            </td>
          </tr>
        {:else}{/each}
      </tbody>
    </table>
  </div>
</article>
