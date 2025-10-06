<script lang="ts">
    import ChecklistItem from '$lib/components/ChecklistItem.svelte';

    let counterAmount = 0;

    let checkboxItems = 1;

    function updateCounter(e){
        if (e.detail.done === true){
            counterAmount++;
        }
        else{
            counterAmount--;
        }
    }


</script>

<main>
    <h1 data-testid="title">Progress Checklist</h1>

    <h2 data-testid="counter" id="counter">{counterAmount}</h2>

    <div id="checklist">
        {#each {length: checkboxItems} as _, i}
            <ChecklistItem id="checklistItem-{i}" label="Item {i}" on:change={updateCounter}></ChecklistItem>
        {/each}
    </div>
</main>
