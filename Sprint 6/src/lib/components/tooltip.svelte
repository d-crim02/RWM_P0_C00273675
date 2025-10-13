<script lang="ts">
    import {createEventDispatcher} from 'svelte';
    export let lastChange: number = 0;
</script>
<p>Last Progress: {lastChange}%</p>