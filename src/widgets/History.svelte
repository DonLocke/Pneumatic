<script lang="ts">
  export let boxHistory;
  console.log(boxHistory);
  //const boxID = boxHistory.box_id;
  // const branch = data.box.branch;
  // const address = data.box.address;
</script>

<div class="container mt-5">
  <div class="columns is-centered">
    <div class="column is-four-fifths">
      <div class="box">
        <div class="grid">
          <div class="cell">
            <p class="title is-4">Box Number</p>
            <!-- <p class="subtitle is-4">test</p> -->
          </div>
          <div class="cell">
            <p class="title is-4">Box Event</p>
            <!-- <p class="subtitle is-4">{address}</p> -->
          </div>
          <div class="cell">
            <p class="title is-4">Box Event Time</p>
            <!-- <p class="subtitle is-4">{address}</p> -->
          </div>
          {#each boxHistory as history}
            <div class="cell">
              <p class="title is-4">{history.box_number}</p>
              <!-- <p class="subtitle is-4">test</p> -->
            </div>
            <div class="cell">
              <p class="title is-4">blah</p>
              <!-- <p class="subtitle is-4">{address}</p> -->
            </div>
            <div class="cell">
              <p class="title is-4">Box Event Time</p>
              <!-- <p class="subtitle is-4">{address}</p> -->
            </div>
          {:else}{/each}
        </div>
      </div>
    </div>
  </div>
</div>
