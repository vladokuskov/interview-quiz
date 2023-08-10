<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useQuizesStore } from '../stores/quizes';
import CompletedTopicCard from './CompletedTopicCard.vue';
import { QuizState } from '@/types/global.types'

const quizesStore = useQuizesStore()
const { completedQuizes, preLoadedQuizes, quizes } = storeToRefs(quizesStore)
const { resetTopics, changeQuizState, fullQuizReset } = quizesStore

const handleTopicsReset = () => {
    const isConfirmed = window.confirm('Are you sure you want to reset topics? This action can`t be undone.')
    if (isConfirmed) {
        resetTopics()
    }
}

const handleQuizReset = () => {
    const isConfirmed = window.confirm('Are you sure you want to reset the Quiz? This action can`t be undone.')
    if (isConfirmed) {
        fullQuizReset()
    }
}
</script>

<template>
    <section class="w-full mt-8">
        <h2 class="text-xl font-semibold text-neutral-700">Completed topics</h2>
        <p class="font-semibold text-neutral-400 text-sm">{{ completedQuizes.length }} topics of {{ preLoadedQuizes.length
        }}</p>
        <div class="flex items-center justify-start gap-4">
            <button v-if="quizes.length" @click="changeQuizState(QuizState.answering)" aria-label="Continue"
                class="p-1 bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 my-2 rounded-md text-white font-semibold px-2">Continue</button>
            <button v-if="completedQuizes.length" @click="handleTopicsReset" aria-label="Reset topics"
                class="p-1 bg-yellow-500 hover:bg-yellow-400 focus:bg-yellow-400 my-2 rounded-md text-white font-semibold px-2">Reset</button>
            <button @click="handleQuizReset" aria-label="Quiz reset"
                class="p-1 bg-red-500 hover:bg-red-400 focus:bg-red-400 my-2 rounded-md text-white font-semibold px-2">Quiz
                reset</button>
        </div>

        <div v-for="topic in completedQuizes" :key="topic.title"
            class="w-full flex flex-col items-center gap-4 justify-center">
            <CompletedTopicCard :title="topic.title" :explanation="topic.explanation" />
        </div>
    </section>
</template>