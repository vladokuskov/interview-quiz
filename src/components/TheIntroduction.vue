<script setup lang="ts">
import { useQuizesStore } from '../stores/quizes';
import FileUploader from './FileUploader.vue';

const quizesStore = useQuizesStore()
const { loadTopics } = quizesStore

const startQuiz = (topics: string[]) => {
    const data = topics.map(topic => ({ title: topic }));
    loadTopics(data);
};

</script>

<template>
    <section class="w-full flex items-start justify-between gap-4 max-md:flex-col">
        <div class="flex flex-col items-start justify-center gap-2 max-w-[65ch]">
            <h1 class="text-3xl text-black font-lusitana tracking-wide">Welcome to Interview Quiz!</h1>
            <p class="text-secondary font-inria text-[1.1rem]">Here you can prepare for an interview with your questions.
            </p>
            <p class="text-secondary font-inria text-[1.1rem] mt-6">To begin, upload the file in <strong>.txt</strong>
                format, where each row
                represents a
                question.</p>

            <FileUploader :handle-change="startQuiz" class="mt-4" />
        </div>
        <div
            class="rounded-lg max-md:w-full max-md:h-[15rem] max-md:mt-12 w-[20rem] h-[30rem] border-black bg-black border-2 shadow-brutalism">
            <img src="/hero.webp" alt="Hero picture" class="object-cover rounded-lg w-full h-full" />
        </div>
    </section>
</template>