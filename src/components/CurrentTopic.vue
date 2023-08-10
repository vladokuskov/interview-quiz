<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useQuizesStore } from '../stores/quizes';
import { QuizState } from '@/types/global.types';
import CurrentTopicProgressBar from './CurrentTopicProgressBar.vue';
import BaseButton from './BaseButton.vue';

const quizesStore = useQuizesStore()
const { quizes } = storeToRefs(quizesStore)
const { nextTopic, changeQuizState } = quizesStore

const quizExplanation = ref('');

const currentIndex = computed(() => {
    return Math.floor(Math.random() * quizes.value.length)
});

const handleNextQuiz = () => {
    if (quizes.value.length > 0) {
        const currentQuiz = quizes.value[currentIndex.value];
        if (currentQuiz) {
            nextTopic(currentQuiz.title, quizExplanation.value);
            quizExplanation.value = '';
        }
    } else {
        return;
    }
};
</script>

<template>
    <section class="flex w-full flex-col items-center justify-center gap-4">
        <CurrentTopicProgressBar />
        <h1 v-if="quizes[currentIndex]" class="text-xl font-semibold text-neutral-700">{{ quizes[currentIndex].title }}</h1>
        <textarea v-model="quizExplanation" aria-label="Topic explanation"
            placeholder="Write your answer/explanation here..."
            class="p-1 bg-neutral-200 rounded-md font-semibold text-neutral-800 w-full mt-4 min-h-[15rem] resize-yz"
            style="white-space: pre-line;"></textarea>
        <div class="w-full flex gap-2 items-center justify-between">
            <BaseButton color="blue" @click="changeQuizState(QuizState.results)" aria-label="See results">
                <icon-mdi-notebook-outline /> See results
            </BaseButton>
            <BaseButton color="lime" @click="handleNextQuiz" aria-label="Next topic" :disabled="quizes.length === 0">
                <icon-mdi-notebook-outline />Next
                <icon-mdi-arrow-right />
            </BaseButton>
        </div>
</section></template>