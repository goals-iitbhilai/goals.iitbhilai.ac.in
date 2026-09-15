<script lang="ts">
  import { cn } from "@utils/cn";
  import type { LibraryItem } from "./types";
  import { ChevronLeft, ChevronRight } from "@lucide/svelte";

  interface Props {
    items: LibraryItem[];
  }

  // The number of items to display per page.
  const PAGE_SIZE = 25;

  let { items = $bindable() }: Props = $props();
  let page = $state(1);

  // Reset to page 1 whenever the filter changes.
  $effect(() => {
    void items;
    page = 1;
  });

  const start = $derived((page - 1) * PAGE_SIZE + 1);
  const end = $derived(Math.min(page * PAGE_SIZE, items.length));

  const pageItems = $derived(items.slice(start, end));
  const totalPages = $derived(Math.max(1, Math.ceil(items.length / PAGE_SIZE)));
</script>

<!-- Pagination -->
<div class="xs:flex-row flex flex-col items-center justify-between gap-3">
  <p class="text-neutral-400 dark:text-neutral-500">
    Showing {start}–{end} of {items.length} items
  </p>
  {#if totalPages > 1}
    <div class="flex items-center gap-1">
      <button
        onclick={() => (page -= 1)}
        disabled={page === 1}
        aria-label="Previous page"
        class="cursor-pointer rounded-md border border-neutral-300 p-2 hover:bg-neutral-200/80 disabled:cursor-not-allowed disabled:opacity-40 dark:border-neutral-600 dark:hover:bg-neutral-800"
      >
        <ChevronLeft size={16} />
      </button>
      <span class="px-3 text-sm">
        Page {page} of {totalPages}
      </span>
      <button
        onclick={() => (page += 1)}
        disabled={page === totalPages}
        aria-label="Next page"
        class="cursor-pointer rounded-md border border-neutral-300 p-2 hover:bg-neutral-200/80 disabled:cursor-not-allowed disabled:opacity-40 dark:border-neutral-600 dark:hover:bg-neutral-800"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  {/if}
</div>

<!-- Table -->
<div
  class="overflow-x-auto rounded-md border border-neutral-300 bg-neutral-50/75 backdrop-blur-md dark:border-neutral-600 dark:bg-neutral-900/75"
>
  <table class="w-full table-fixed text-left text-sm">
    <colgroup>
      <col class="w-[calc((100%-10rem)/2)] sm:w-auto" />
      <col class="w-[calc((100%-10rem)/2)] sm:w-60" />
      <col class="w-20" />
    </colgroup>
    <thead
      class="border-b border-neutral-200 bg-neutral-100/80 dark:border-neutral-700 dark:bg-neutral-950/60"
    >
      <tr class="text-neutral-700 dark:text-neutral-200">
        <th class="py-3 pl-5">Title</th>
        <th class="px-5 py-3">Author</th>
        <th class="py-3">Available</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-neutral-200 dark:divide-neutral-700">
      {#each pageItems as entry, i (i)}
        <tr class=" hover:bg-neutral-200/80 dark:hover:bg-neutral-800">
          <td class="max-w-0 py-3 pl-5 text-neutral-800 dark:text-neutral-200">
            <span class="block truncate" title={entry.item}>{entry.item}</span>
          </td>
          <td class="max-w-0 px-5 py-3 text-neutral-600 dark:text-neutral-400">
            <span class="block truncate" title={entry.author}>
              {entry.author}
            </span>
          </td>
          <td class="px-5 py-3 align-middle">
            <span
              class={cn("inline-flex items-center gap-2 ", {
                "text-green-700 dark:text-green-400": entry.available,
                "text-neutral-400 dark:text-neutral-500": !entry.available,
              })}
            >
              <span
                class={cn("size-2 shrink-0 rounded-full", {
                  "bg-green-500 shadow-[0_0_0_3px_rgba(34,197,94,0.2),0_0_7px_rgba(34,197,94,0.45)]":
                    entry.available,
                  "bg-neutral-400 shadow-[0_0_0_3px_rgba(148,163,184,0.2)] dark:bg-neutral-500 dark:shadow-[0_0_0_3px_rgba(148,163,184,0.12)]":
                    !entry.available,
                })}
              ></span>
              {entry.available ? "Yes" : "No"}
            </span>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
