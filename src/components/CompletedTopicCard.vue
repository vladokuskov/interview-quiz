<script setup lang="ts">
import { ref } from 'vue';
import clsx from 'clsx'
import { useQuizesStore } from '../stores/quizes';


type CompletedTopicCard = {
    title: string
    explanation: string
}

defineProps<CompletedTopicCard>()

const quizesStore = useQuizesStore()
const { returnTopicToUnAnswered } = quizesStore

const isExplanationOpen = ref(false)


</script>

<template>
    <div class="relative w-full flex flex-col items-start justify-center my-2 rounded-md">
        <div class="relative w-full flex flex-col items-start justify-center">
            <button @click="isExplanationOpen = !isExplanationOpen" :disabled="explanation.length === 0"
                aria-label="See topic answer"
                :class="clsx('w-full inline-flex items-center justify-center gap-1 p-2 bg-neutral-200 font-semibold text-neutral-700 transition-colors pr-8', explanation.length ? 'cursor-pointer hover:bg-neutral-100 focus:bg-neutral-100' : 'cursor-default', isExplanationOpen ? 'rounded-t-md' : 'rounded-md')">
                <span v-if="explanation.length">
                    <icon-mdi-chevron-up v-if="isExplanationOpen" />
                    <icon-mdi-chevron-down v-else />
                </span>
                <span class="w-full">{{ title }}</span>
            </button>
            <button @click="returnTopicToUnAnswered(title)" aria-label="Make topic unanswered" title="Make topic unanswered"
                class="p-1 rounded-md absolute right-1 hover:bg-neutral-100 focus:bg-neutral-100 transition-colors h-4/5"><icon-mdi-backburger /></button>
        </div>

        <p v-if="isExplanationOpen && explanation.length"
            class="w-full text-center font-semibold text-neutral-800 p-2 bg-yellow-200 border-t-2 border-yellow-300 rounded-b-md"
            style="white-space: pre-line;" v-html="explanation"></p>
        <div v-if="explanation.length" class="absolute left-1 top-1 p-1 rounded-full bg-green-400 bg-opacity-50" />
    </div>
</template>