<script setup lang="ts">
import { storeToRefs } from 'pinia';
import CompletedTopics from './components/CompletedTopics.vue';
import CurrentTopic from './components/CurrentTopic.vue';
import { useQuizesStore } from './stores/quizes';
import { QuizState } from '@/types/global.types'
import UploadTopics from './components/UploadTopics.vue';

const quizesStore = useQuizesStore()
const { selectedQuizState } = storeToRefs(quizesStore)

</script>

<template>
  <main class="w-full max-w-[25rem] mx-auto  flex items-center  justify-center p-2 mt-8">
    <CurrentTopic v-if="selectedQuizState === QuizState.answering" />
    <CompletedTopics v-else-if="selectedQuizState === QuizState.results" />
    <UploadTopics v-if="selectedQuizState === QuizState.pending" />
  </main>
</template>