<script lang="ts">
  interface Props {
    search: string;
    available: boolean;
  }

  let { search = $bindable(), available = $bindable() }: Props = $props();
</script>

<div class="flex flex-col gap-3">
  <input
    type="search"
    bind:value={search}
    placeholder="Search by title or author…"
    class="w-full rounded-lg border border-neutral-400 bg-neutral-50/25 px-4 py-2 text-sm placeholder:text-neutral-400 hover:bg-neutral-100/25 dark:border-neutral-600 dark:bg-neutral-900 dark:hover:bg-neutral-800"
  />
  <label
    class="xs:self-end flex cursor-pointer items-center gap-2 self-center text-sm select-none"
  >
    <span class="relative flex size-4 shrink-0 items-center justify-center">
      <input type="checkbox" bind:checked={available} class="peer sr-only" />
      <span
        class="peer-checked:border-secondary-500 peer-checked:bg-secondary-500 peer-focus-visible:ring-secondary-300 dark:peer-focus-visible:ring-secondary-700 size-4 rounded border border-neutral-300 bg-white peer-focus-visible:ring-2 peer-focus-visible:ring-offset-1 dark:border-neutral-600 dark:bg-neutral-800"
      ></span>
      <svg
        class="pointer-events-none absolute size-2.5 text-white opacity-0 transition-opacity peer-checked:opacity-100"
        viewBox="0 0 10 10"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <polyline points="1.5,5.5 4,8 8.5,2" />
      </svg>
    </span>
    <span class="text-neutral-600 dark:text-neutral-300">
      Only show available books
    </span>
  </label>
</div>
