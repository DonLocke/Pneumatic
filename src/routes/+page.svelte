<script lang="ts">
    export let data;
    console.log('DATA', data)
</script>

<div class="container mt-5">
    <div class="columns is-centered">
        <div class="column is-half">
            <h1 class="title has-text-centered">Welcome {data.user}</h1>
        </div>
    </div>
</div>
