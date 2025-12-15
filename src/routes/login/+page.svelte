<script lang="ts">
    import{ goto } from '$app/navigation';
    function login(){ 
        goto('/');
        }
</script>
<div class="container mt-5">
    <div class="columns is-centered">
        <div class="column is-half">
            <h1 class="title has-text-centered">Login</h1>
            <input class="input is-rounded" type="text" placeholder="username">
            <input class="input is-rounded mt-5" type="password" placeholder="password">
            <div class="buttons is-centered">
                <button class="button is-rounded is-primary mt-5" on:click={login}>
                    Login
                </button>
            </div>
        </div>
    </div>
</div>