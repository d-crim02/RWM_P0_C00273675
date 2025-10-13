<script lang="ts">
    import ChecklistItem from "$lib/components/ChecklistItem.svelte";
    import {derived, writable} from "svelte/store";

    let checklistItems = 5;
    let submittedProgress = 0;
    let internalProgress = 0;

    type ChecklistItemData = {
        id: string;
        label: string;
        done: boolean;
    };

    export const itemsStore = writable<ChecklistItemData[]>([]);
    export const temporaryStore = writable<ChecklistItemData[]>([]);
    export const itemsLength = derived(itemsStore, items => items.length);
    export const completedStore = derived(itemsStore, items => items.filter(i => i.done).length);
    export const percentStore = derived(itemsStore, items => items.length
        ? Math.round(100 * items.filter(i => i.done).length / items.length)
        : 0);


    export const previousPercentStore = writable<number>();

    function fillItemStore(count: number) {
        const items: ChecklistItemData[] = Array.from({ length: count }, (_, i) => ({
            id: i.toString(),
            label: `Item ${i + 1}`,
            done: false,
        }));

        itemsStore.set(items);
        temporaryStore.set(items);
        if ($previousPercentStore === null || $previousPercentStore === undefined)
        {
            previousPercentStore.set(0);
        }
    }

    function updateProgress(e: CustomEvent<{ id: string; label: string; done: boolean }>) {
        const { id, done } = e.detail;

        temporaryStore.update(items =>
            items.map(item =>
                item.id === id ? { ...item, done } : item
            )
        );
    }

    function submitProgress()
    {
        let tempItems: typeof $itemsStore = [];
        const unsubscribe = temporaryStore.subscribe(items => {
            tempItems = items;
        });
        unsubscribe();
        itemsStore.set(tempItems);

        percentDelta = $percentStore - $previousPercentStore;
        previousPercentStore.set($percentStore);
    }

    let percentDelta = $percentStore - $previousPercentStore;
    if (Number.isNaN(percentDelta))
    {
        percentDelta = 0;
    }

    fillItemStore(checklistItems);

</script>
<div id="progress">
    <p data-testid="progress" title="{percentDelta}% since last check-in">{$completedStore}/{$itemsLength} ({$percentStore}%)</p>
</div>

<div id="checklist">
    {#each $itemsStore as item (item.id)}
        <ChecklistItem
                id={item.id}
                label={item.label}
                done={item.done}
                on:change={updateProgress}
        />
    {/each}
</div>

<button data-testid="submit" id="submit" onclick={submitProgress}>Submit</button>
