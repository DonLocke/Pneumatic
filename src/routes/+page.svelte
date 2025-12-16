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

    <div class="grid is-col-min-15">
        {#each data.boxes as box}
        <div class="cell">
            <div class="card">
                <a href="/box-info/{box.box_id}">
                    <header class="card-header">
                        <p class="card-header-title">Box #{box.box_number}</p>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            <span class="has-text-weight-bold has-text-primary">Branch: </span>
                            <span class="has-text-primary">{box.branch_name}</span>
                        </div>
                    </div>
                </a>
            </div>
        </div>
        {/each}
        

    </div>
    
</div>
