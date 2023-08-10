<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useQuizesStore } from '../stores/quizes';
import { onMounted, ref, watch } from 'vue';
import { calculateProgress } from '../utils/calculateProgress'

const quizesStore = useQuizesStore()
const { completedQuizes, preLoadedQuizes, quizes } = storeToRefs(quizesStore)

const progressPercent = ref<number>(0)

onMounted(() => {
    progressPercent.value = calculateProgress(preLoadedQuizes.value.length, completedQuizes.value.length)
})

watch(completedQuizes.value, () => {
    progressPercent.value = calculateProgress(preLoadedQuizes.value.length, completedQuizes.value.length)
})
</script>

<template>
    <div v-if="quizes.length" :class="`bg-lime-200 absolute max-w-full self-start h-2 top-0 left-0`"
        :style="{ width: `${progressPercent}%` }" />
</template>