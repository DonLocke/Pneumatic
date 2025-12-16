<script lang="ts">
    export let data;

    let boxes = [
		{ id: 1, branch: 'Plaza' },
		{ id: 2, branch: 'Elmwood' },
		{ id: 3, branch: 'Pearl' },
		{ id: 4, branch: 'Delaware' },
		{ id: 5, branch: 'Plaza' }
	];
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
        {#each boxes as box}
        <div class="cell">
            <div class="card">
                <a href="/box-info/{box.id}">
                    <header class="card-header">
                        <p class="card-header-title">Box #{box.id}</p>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            <span class="has-text-weight-bold has-text-primary">Branch: </span>
                            <span class="has-text-primary">{box.branch}</span>
                         </div>
                    </div>
                </a>
            </div>
        </div>
        {/each}
        

    </div>
    
</div>
