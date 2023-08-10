<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useQuizesStore } from '../stores/quizes';
import { QuizState } from '@/types/global.types';
import CurrentTopicProgressBar from './CurrentTopicProgressBar.vue';

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
            class="p-1 bg-neutral-200 rounded-md font-semibold text-neutral-800 w-full mt-4 min-h-[6rem] resize-yz"
            style="white-space: pre-line;"></textarea>

        <div class="w-full flex gap-2 items-center justify-between">
            <button @click="changeQuizState(QuizState.results)" aria-label="See results"
                class="p-1 bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 my-2 rounded-md text-white font-semibold px-2">
                See results
            </button>
            <button @click="handleNextQuiz" aria-label="Next topic"
                class="bg-lime-400 hover:bg-lime-300 focus:bg-lime-300 transition-all rounded-md font-semibold py-2 px-6 text-white">
                Next
            </button>
        </div>

    </section>
</template>