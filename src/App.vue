<script setup lang="ts">
import { QuizState } from '@/types/global.types';
import { storeToRefs } from 'pinia';
import CompletedTopics from './components/CompletedTopics.vue';
import CurrentTopic from './components/CurrentTopic.vue';
import { useQuizesStore } from './stores/quizes';
import TheIntroduction from './components/TheIntroduction.vue';
import { onMounted } from 'vue';

const quizesStore = useQuizesStore()
const { restoreTopics } = quizesStore
const { selectedQuizState } = storeToRefs(quizesStore)

onMounted(() => {
  const allTopics = localStorage.getItem('allTopics');
  const leftTopics = localStorage.getItem('leftTopics');
  const completedTopics = localStorage.getItem('completedTopics');

  if (allTopics && allTopics.length) {
    const parsedLeftTopics = (leftTopics !== undefined && leftTopics !== null) ? JSON.parse(leftTopics) : [];
    const parsedCompletedTopics = (completedTopics !== undefined && completedTopics !== null) ? JSON.parse(completedTopics) : [];

    restoreTopics(JSON.parse(allTopics), parsedLeftTopics, parsedCompletedTopics)
  }
});

</script>

<template>
  <main class="w-full max-w-4xl mx-auto  flex items-center  justify-center px-2 pt-8 pb-12">
    <CurrentTopic v-if="selectedQuizState === QuizState.answering" />
    <CompletedTopics v-else-if="selectedQuizState === QuizState.results" />
    <TheIntroduction v-if="selectedQuizState === QuizState.pending" />
  </main>
</template>