<script setup lang="ts">
import { QuizState } from '@/types/global.types';
import { storeToRefs } from 'pinia';
import CompletedTopics from './components/CompletedTopics.vue';
import CurrentTopic from './components/CurrentTopic.vue';
import UploadTopics from './components/UploadTopics.vue';
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
    restoreTopics(JSON.parse(allTopics), (JSON.parse(leftTopics)), (JSON.parse(completedTopics)))
  }
});

</script>

<template>
  <main class="w-full max-w-[25rem] mx-auto  flex items-center  justify-center px-2 mt-8 pb-12">
    <CurrentTopic v-if="selectedQuizState === QuizState.answering" />
    <CompletedTopics v-else-if="selectedQuizState === QuizState.results" />
    <TheIntroduction v-if="selectedQuizState === QuizState.pending">
      <UploadTopics />
    </TheIntroduction>
  </main>
</template>