<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useQuizesStore } from '../stores/quizes';

const quizesStore = useQuizesStore()
const { quizes } = storeToRefs(quizesStore)
const { nextTopic, toggleSeeResults } = quizesStore

const currentIndex = ref(quizes.value ? Math.floor(Math.random() * quizes.value.length) : 0);

const quizExplanation = ref('');

const handleNextQuiz = () => {

    if (quizes.value.length > 0) {
        currentIndex.value = Math.floor(Math.random() * quizes.value.length);
        const selectedQuiz = quizes.value[currentIndex.value];


        nextTopic(selectedQuiz.title, quizExplanation.value);
        quizExplanation.value = '';
    }



}
</script>

<template>
    <section class="flex w-full flex-col items-center justify-center gap-4">
        <h1 class="text-xl font-semibold text-neutral-700">{{ quizes && quizes[currentIndex].title }}</h1>
        <textarea v-model="quizExplanation" aria-label="Topic explanation"
            placeholder="Write your answer/explanation here..."
            class="p-1 bg-neutral-200 rounded-md font-semibold text-neutral-800 w-full mt-4 min-h-[6rem] resize-yz"
            style="white-space: pre-line;"></textarea>
        <button @click="handleNextQuiz" aria-label="Next topic"
            class="bg-lime-400 hover:bg-lime-300 focus:bg-lime-300 transition-all rounded-md font-semibold py-2 px-6 text-white">Next</button>
        <button @click="toggleSeeResults(true)" aria-label="End quiz"
            class="p-1 bg-red-500 hover:bg-red-400 focus:bg-red-400 my-2 rounded-md text-white font-semibold px-2">End
            quiz</button>
    </section>
</template>