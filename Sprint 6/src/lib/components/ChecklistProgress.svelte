<script lang="ts">
    import ChecklistItem from "$lib/components/ChecklistItem.svelte";

    let checklistItems = 5;
    let submittedProgress = 0;
    let internalProgress = 0;

    function updateInternalProgress(e)
    {
        if (e.detail.done === true){
            internalProgress++;
        }
        else{
            internalProgress--;
        }
    }

    function submitProgress()
    {
        submittedProgress = internalProgress;
    }

</script>
<div id="progress">
    <label data-testid="progress">{submittedProgress}/{checklistItems} ({(submittedProgress / checklistItems) * 100}%)</label>
</div>

<div id="checklist">
    {#each {length: checklistItems} as _, i}
        <ChecklistItem id="checklistItem-{i}" label="Item {i}" on:change={updateInternalProgress}></ChecklistItem>
    {/each}
</div>

<button data-testid="submit" id="submit" onclick={submitProgress}>Submit</button>
