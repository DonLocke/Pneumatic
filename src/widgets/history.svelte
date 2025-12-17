<script lang="ts">
  export let boxHistory;
</script>

<div class="box">
  <h1 class="title">History Information</h1>
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
            {history.event_date}
          </td>
        </tr>
      {:else}{/each}
    </tbody>
  </table>
</div>
