<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed, ref, onMounted } from 'vue';
import { useQuizesStore } from '../stores/quizes';
import { QuizState } from '@/types/global.types';
import CurrentTopicProgressBar from './CurrentTopicProgressBar.vue';
import BaseButton from './BaseButton.vue';

const quizesStore = useQuizesStore()
const { leftTopics, selectedQuizState } = storeToRefs(quizesStore)
const { nextTopic, changeQuizState } = quizesStore

const topicExplanation = ref('');

const currentIndex = computed(() => {
    return Math.floor(Math.random() * leftTopics.value.length)
});

const handleNextQuiz = () => {
    if (leftTopics.value.length > 0) {
        const currentQuiz = leftTopics.value[currentIndex.value];
        if (currentQuiz) {
            nextTopic(currentQuiz.title, topicExplanation.value);
            topicExplanation.value = '';
        }
    } else {
        return;
    }
};


onMounted(() => {
    if (!leftTopics.value.length && selectedQuizState.value === QuizState.answering) {
        changeQuizState(QuizState.results)
    }
})

</script>

<template>
    <section class="flex w-full flex-col items-center justify-center gap-4 max-w-[40rem]">
        <CurrentTopicProgressBar />
        <h1 v-if="leftTopics[currentIndex]" class="text-3xl font-inria font-semibold text-secondary">{{
            leftTopics[currentIndex].title
        }}</h1>
        <textarea v-model="topicExplanation" aria-label="Topic explanation"
            placeholder="Write your answer/explanation here..."
            class="p-1 bg-white font-inria tracking-wide rounded-md font-semibold text-black w-full mt-4 min-h-[15rem] resize-yz placeholder:font-medium"
            style="white-space: pre-line;"></textarea>
        <div class="w-full flex gap-2 items-center justify-between">
            <BaseButton color="blue" @click="changeQuizState(QuizState.results)" aria-label="See results">
                <icon-mdi-notebook-outline /> See results
            </BaseButton>
            <BaseButton color="lime" @click="handleNextQuiz" aria-label="Next topic" :disabled="leftTopics.length === 0">
                Next
                <icon-mdi-arrow-right />
            </BaseButton>
        </div>
    </section>
</template>
