<script lang="ts">
  import { Check, Search } from "@lucide/svelte";

  interface Props {
    search: string;
    available: boolean;
  }

  let { search = $bindable(), available = $bindable() }: Props = $props();
</script>

<div class="flex flex-col gap-3">
  <div class="relative w-full">
    <input
      type="search"
      bind:value={search}
      placeholder="Search by title or author…"
      class="w-full rounded-lg border border-neutral-400 bg-neutral-50/25 p-3 placeholder:text-neutral-400 hover:bg-neutral-100/25 dark:border-neutral-600 dark:bg-neutral-900 dark:hover:bg-neutral-800"
    />
    <span class="absolute inset-y-0 right-0 flex items-center pr-4">
      <Search size={16} />
    </span>
  </div>
  <label
    class="xs:self-end flex cursor-pointer items-center gap-2 self-center select-none"
  >
    <span class="relative flex size-5 shrink-0 items-center justify-center">
      <input type="checkbox" bind:checked={available} class="peer sr-only" />
      <span
        class="peer-checked:border-secondary-500 peer-checked:bg-secondary-500 peer-focus-visible:ring-secondary-300 dark:peer-focus-visible:ring-secondary-700 size-5 rounded border border-neutral-300 bg-white peer-focus-visible:ring-2 peer-focus-visible:ring-offset-1 dark:border-neutral-600 dark:bg-neutral-800"
      ></span>
      <Check
        class="pointer-events-none absolute size-3 text-white opacity-0 transition-opacity peer-checked:opacity-100"
        size={16}
      />
    </span>
    <span class="text-neutral-600 dark:text-neutral-300">
      Only show available books
    </span>
  </label>
</div>
