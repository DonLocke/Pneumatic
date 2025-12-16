<script lang="ts">
    export let data;

    let boxes = [
		{ id: 1, branch: 'Plaza' },
		{ id: 2, branch: 'Elmwood' },
		{ id: 3, branch: 'Pearl' },
		{ id: 4, branch: 'Deleware' },
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
            <h1 class="title has-text-centered">Welcome {data.user}</h1>
        </div>
    </div>

    <div class="grid is-col-min-15">
        {#each boxes as box}
            <div class="cell">
            <div class="card">
                <header class="card-header">
                    <p class="card-header-title">Box #{box.id}</p>
                </header>
                <div class="card-content">
                    <div class="content">
                    <p>Branch: {box.branch}</p>
                    </div>
                </div>
            </div>
        </div>
        {/each}
        

    </div>
    
</div>
