<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useQuizesStore } from '../stores/quizes';

const quizesStore = useQuizesStore()
const { loadTopics, } = quizesStore

const fileContent = ref<string | null>(null);
const convertedData = ref<string[]>([]);

const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
        const reader = new FileReader();

        reader.onload = () => {
            fileContent.value = reader.result as string;
        };

        reader.readAsText(file);
    }
};

onMounted(() => {
    const topics = localStorage.getItem('topics');
    if (topics && topics.length) {
        loadTopics(JSON.parse(topics));
    }
});

watch(fileContent, () => {
    if (fileContent.value) {
        convertToFileObject();
    }
});

const convertToFileObject = () => {
    if (fileContent.value) {
        const lines = fileContent.value.split('\n');
        const topics = lines.map(line => line.trim()).filter(line => line !== '');
        convertedData.value = topics;
    }
};

const startQuiz = () => {
    const data = convertedData.value.map(topic => ({ title: topic }));
    loadTopics(data);
};

</script>

<template>
    <section class="flex flex-col items-start justify-center gap-2 mt-8">
        <h1 class="text-xl text-neutral-800 font-semibold">Welcome to Interview Quiz! 📋</h1>
        <p class="font-semibold text-neutral-700">Here you can prepare for an interview with your questions.</p>
        <p class="text-neutral-700 tracking-tight p-1 border-dashed border-2 border-red-500 mb-2">To begin, upload the file
            in
            <span class="font-semibold underline">.txt</span> format, where each row represents a question.
        </p>
        <input type="file" @change="handleFileChange" />
        <button
            class="p-1 ml-auto bg-lime-500 hover:bg-lime-400 focus:bg-lime-400 disabled:bg-neutral-300 my-2 rounded-md text-white font-semibold px-2"
            @click="startQuiz" :disabled="convertedData.length === 0">Start a Quiz</button>
    </section>
</template>