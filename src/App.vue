<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import CompletedTopics from './components/CompletedTopics.vue';
import CurrentTopic from './components/CurrentTopic.vue';
import db from './db/db.json';
import { useQuizesStore } from './stores/quizes';
import { QuizState } from '@/types/global.types'

const quizesStore = useQuizesStore()
const { selectedQuizState } = storeToRefs(quizesStore)
const { loadTopics, } = quizesStore

onMounted(() => {
  loadTopics(db.topics.map(topic => {
    return { title: topic };
  }))
})

</script>

<template>
  <main class="w-full max-w-[25rem] mx-auto  flex items-center  justify-center p-2 mt-8">
    <CurrentTopic v-if="selectedQuizState === QuizState.answering" />
    <CompletedTopics v-else-if="selectedQuizState === QuizState.results" />
  </main>
</template>