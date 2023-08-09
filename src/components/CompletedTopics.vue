<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useQuizesStore } from '../stores/quizes';
import CompletedTopicCard from './CompletedTopicCard.vue';

const quizesStore = useQuizesStore()
const { completedQuizes } = storeToRefs(quizesStore)
const { resetTopics } = quizesStore

</script>

<template>
    <section class="w-full">
        <h2 class="text-xl font-semibold text-neutral-700">Completed topics</h2>
        <p class="font-semibold text-neutral-400 text-sm">{{ completedQuizes.length }} topics</p>
        <button @click="resetTopics" aria-label="Reset topics"
            class="p-1 bg-red-500 hover:bg-red-400 focus:bg-red-400 my-2 rounded-md text-white font-semibold px-2">Reset</button>
        <div v-for="topic in completedQuizes" :key="topic.title"
            class="w-full flex flex-col items-center gap-4 justify-center">
            <CompletedTopicCard :title="topic.title" :explanation="topic.explanation" />
        </div>
    </section>
</template>