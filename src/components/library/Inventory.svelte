<script lang="ts">
  import { api } from "@utils/api";
  import Controls from "./Controls.svelte";
  import type { LibraryItem } from "./types";
  import Table from "./Table.svelte";

  // The items fetched from the API.
  let items: LibraryItem[] = $state([]);

  // User feedback.
  let loading = $state(true);
  let error = $state<string | null>(null);

  // Filters.
  let search = $state("");
  let available = $state(false);

  // The filtered items based on the current search and availability filter.
  let filtered = $derived(
    items.filter((entry) => {
      if (available && !entry.available) return false;
      if (!search.trim()) return true;

      const query = search.trim().toLowerCase();

      // Search both book and author names for the substring.
      return (
        entry.item.toLowerCase().includes(query) ||
        entry.author.toLowerCase().includes(query)
      );
    }),
  );

  // Fetch the library items from the API.
  async function load() {
    try {
      const res = await fetch(api("/library"));
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      items = await res.json();
    } catch (e) {
      error = e instanceof Error ? e.message : "Failed to load library.";
    } finally {
      loading = false;
    }
  }

  load();
</script>

<div class="flex flex-col gap-6">
  <Controls bind:search bind:available />
  {#if loading}
    <p
      class="after:animate-dot-loop text-center text-neutral-600 dark:text-neutral-300"
    >
      Loading
    </p>
  {:else if error}
    <p class="text-center text-red-500">{error}</p>
  {:else if filtered.length === 0}
    <p class="text-center text-neutral-600 dark:text-neutral-300">
      No books match your query.
    </p>
  {:else}
    <Table bind:items={filtered} />
  {/if}
</div>
