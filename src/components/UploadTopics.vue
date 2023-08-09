<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted, ref, watch } from 'vue';
import { useQuizesStore } from '../stores/quizes';

const quizesStore = useQuizesStore()
const { preLoadedQuizes } = storeToRefs(quizesStore)
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
    if (topics.length) {
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
    <div>
        <input type="file" @change="handleFileChange" />
        <button @click="startQuiz">Start</button>
    </div>
</template>