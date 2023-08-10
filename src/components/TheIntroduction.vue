<script setup lang="ts">
</script>

<template>
    <section class="flex flex-col items-start justify-center gap-2">
        <h1 class="text-xl text-neutral-800 font-semibold">Welcome to Interview Quiz! 📋</h1>
        <p class="font-semibold text-neutral-700">Here you can prepare for an interview with your questions.</p>
        <p class="text-neutral-700 tracking-tight p-1 border-dashed border-2 border-red-500 mb-2">To begin, upload the file
            in
            <span class="font-semibold underline">.txt</span> format, where each row represents a question.
        </p>
        <slot></slot>
    </section>
</template>