<script setup lang="ts">
import { useQuizesStore } from '../stores/quizes';
import FileUploader from './FileUploader.vue';
import ThemeSwitcher from './ThemeSwitcher.vue';

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
            <h1 class="text-3xl font-lusitana tracking-wide">Welcome to Interview Quiz!</h1>
            <p class="font-inria text-[1.1rem]">Here you can prepare for an interview with your questions.
            </p>
            <ThemeSwitcher />
            <p class="font-inria text-[1.1rem] mt-6">To begin, upload the file in <strong>.txt</strong>
                format, where each row
                represents a
                question.</p>

            <FileUploader :handle-change="startQuiz" class="mt-4" />
        </div>
        <div class="relative max-md:w-full max-md:h-[15rem] max-md:mt-12 w-[20rem] h-[30rem]">
            <img src="/hero.webp" alt="Hero picture"
                class="absolute inset-0 object-cover w-full h-full rounded-lg border-black dark:border-white bg-black dark:bg-white border-2 shadow-brutalism dark:shadow-brutalism-dark" />
        </div>
    </section>
</template>