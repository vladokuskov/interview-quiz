<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useQuizesStore } from '../stores/quizes';
import CompletedTopicCard from './CompletedTopicCard.vue';
import { QuizState } from '@/types/global.types'
import BaseButton from './BaseButton.vue';

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
    <section class="w-full">
        <h2 class="text-xl font-semibold text-neutral-700">Completed topics</h2>
        <p class="font-semibold text-neutral-400 text-sm">{{ completedQuizes.length }} topics of {{ preLoadedQuizes.length
        }}</p>
        <div class="flex items-center justify-start gap-4 flex-wrap my-4">
            <BaseButton color="blue" v-if="quizes.length" @click="changeQuizState(QuizState.answering)"
                aria-label="Continue">Continue</BaseButton>
            <BaseButton color="yellow" v-if="completedQuizes.length" @click="handleTopicsReset" aria-label="Reset topics">
                <icon-mdi-restart />Reset
            </BaseButton>
            <BaseButton color="red" @click="handleQuizReset" aria-label="Quiz reset"><icon-mdi-restart-alert />Quiz reset
            </BaseButton>
        </div>

        <div v-for="topic in completedQuizes" :key="topic.title"
            class="w-full flex flex-col items-center gap-4 justify-center">
            <CompletedTopicCard :title="topic.title" :explanation="topic.explanation" />
        </div>
    </section>
</template>