<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useQuizesStore } from '../stores/quizes';
import { onMounted, ref, watch } from 'vue';
import { calculateProgress } from '../utils/calculateProgress'

const quizesStore = useQuizesStore()
const { completedTopics, allTopics, leftTopics } = storeToRefs(quizesStore)

const progressPercent = ref<number>(0)

onMounted(() => {
    progressPercent.value = calculateProgress(allTopics.value.length, completedTopics.value.length)
})

watch(completedTopics.value, () => {
    progressPercent.value = calculateProgress(allTopics.value.length, completedTopics.value.length)
})
</script>

<template>
    <div v-if="leftTopics.length"></div>
    <div :class="`bg-[#5AADEA] absolute max-w-full self-start h-2 top-0 left-0 z-10`"
        :style="{ width: `${progressPercent}%` }" />
    <div class="bg-[#D7D7D7] absolute w-full  h-2 top-0 left-0 z-0" />
</template>