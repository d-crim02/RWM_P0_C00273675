<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    export let id:String, label, done = false;

    function sendChange(e: Event)
    {
        const target = e.target as HTMLInputElement;
        dispatch('change', { id, done: target.checked })
    }
</script>
<input type="checkbox" data-testid="checkboxItem" bind:checked={done} on:change={sendChange}> <!-- ticks → dispatch('change') -->
