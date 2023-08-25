<script setup lang="ts">
import { ref } from 'vue';
import clsx from 'clsx'
import { useQuizesStore } from '../stores/quizes';
import DOMPurify from 'dompurify';

type CompletedTopicCard = {
    title: string
    explanation: string
}

defineProps<CompletedTopicCard>()

const quizesStore = useQuizesStore()
const { returnTopicToUnAnswered } = quizesStore

const isExplanationOpen = ref(false)

const sanitizeExplanation = (explanation: string) => {
    return DOMPurify.sanitize(explanation, { ALLOWED_TAGS: [], KEEP_CONTENT: true });
}

</script>

<template>
    <div class="relative w-full flex flex-col items-start justify-center my-2 rounded-lg">
        <div class="relative w-full flex flex-col items-start justify-center">
            <button @click="isExplanationOpen = !isExplanationOpen" :disabled="explanation.length === 0"
                aria-label="See topic answer" :class="clsx('w-full inline-flex items-center justify-center gap-1 p-2 border-2 border-black bg-white font-semibold text-secondary transition-colors pr-8',
                    explanation.length ? 'cursor-pointer hover:bg-neutral-100 focus:bg-neutral-100' : 'cursor-default',
                    isExplanationOpen ? 'rounded-t-lg border-b-0' : 'rounded-lg')">
                <span v-if="explanation.length">
                    <icon-mdi-chevron-up v-if="isExplanationOpen" />
                    <icon-mdi-chevron-down v-else />
                </span>
                <span class="w-full">{{ title }}</span>
            </button>
            <button @click="returnTopicToUnAnswered(title)" aria-label="Make topic unanswered" title="Make topic unanswered"
                class="p-1 rounded-lg absolute right-1 hover:bg-neutral-100 focus:bg-neutral-100 transition-colors h-4/5"><icon-mdi-backburger /></button>
        </div>

        <p v-if="isExplanationOpen && explanation.length"
            class="w-full text-center font-semibold text-secondary p-2 border-2 border-yellow-400 border-t-0 bg-yellow-200 rounded-b-md"
            style="white-space: pre-line;" v-html="sanitizeExplanation(explanation)"></p>
    </div>
</template>