<script lang="ts">
    export let data;
</script>
<section class="hero is-primary">
  <div class="hero-body">
    <p class="title has-text-centered">SAFE BOX</p>
  </div>
</section>
<div class="container mt-5">
    <div class="columns is-centered">
        <div class="column is-half">
            <h1 class="title has-text-centered">Welcome {data.user.customer_name}</h1>
        </div>
    </div>
  <div class="fixed-grid has-3-cols">
    <div class="grid is-col-min-15">
      {#each data.boxes as box}
      <div class="cell">
        <a href="/box-info/{box.box_id}">
          <div
            class="message"
            class:is-success={box.payment_status == 'PAID'}
            class:is-danger={box.payment_status == 'UNPAID'}
            class:is-info={box.payment_status == 'PENDING'}
            class:is-warning={box.box_status == 'OPEN'}
          >
            <div class="message-header">
              {box.branch_name} Box #{box.box_number}
            </div>
            <div class="message-body">
              <div class="grid">
                <div class="cell">
                  <p class="subtitle">Box Status</p>
                  <h5 class="title is-5">{box.box_status}</h5>
                </div>
                <div class="cell">
                  <p class="subtitle">Payment Status</p>
                  <p class="title is-5">{box.payment_status}</p>
                </div>
              </div>
              
            </div>
          </div>
        </a>
      </div>
      {/each}
    </div>
  </div>
</div>
