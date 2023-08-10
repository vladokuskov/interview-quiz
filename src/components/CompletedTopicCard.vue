<script setup lang="ts">
import { ref } from 'vue';
import clsx from 'clsx'


type CompletedTopicCard = {
    title: string
    explanation: string
}

defineProps<CompletedTopicCard>()

const isExplanationOpen = ref(false)
</script>

<template>
    <div class="relative w-full flex flex-col items-start justify-center  my-2 rounded-md">
        <button @click="isExplanationOpen = !isExplanationOpen" :disabled="explanation.length === 0"
            aria-label="See topic answer"
            :class="clsx('w-full p-2 bg-neutral-200 transition-colors', explanation.length ? 'cursor-pointer hover:bg-neutral-100 focus:bg-neutral-100' : 'cursor-default', isExplanationOpen ? 'rounded-t-md' : 'rounded-md')">
            <h3 class="font-semibold text-neutral-700">{{ title }}</h3>
        </button>
        <p v-if="isExplanationOpen && explanation.length"
            class="w-full text-center font-semibold text-neutral-800 p-2 bg-yellow-200 border-t-2 border-yellow-300 rounded-b-md"
            style="white-space: pre-line;" v-html="explanation"></p>
        <div v-if="explanation.length" class="absolute right-1 top-1 p-1 rounded-full bg-green-400" />
    </div>
</template>