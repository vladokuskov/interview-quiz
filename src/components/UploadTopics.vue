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
        const allowedTypes = ['text/plain'];

        if (allowedTypes.includes(file.type)) {
            const reader = new FileReader();

            reader.onload = () => {
                fileContent.value = reader.result as string;
            };

            reader.readAsText(file);
        } else {
            return;
        }
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

        if (topics.length === 0) {
            return;
        }

        convertedData.value = topics;
    }
};

const startQuiz = () => {
    const data = convertedData.value.map(topic => ({ title: topic }));
    loadTopics(data);
};

</script>

<template>
    <input type="file" @change="handleFileChange" />
    <button
        class="p-1 ml-auto bg-lime-500 hover:bg-lime-400 focus:bg-lime-400 disabled:bg-neutral-300 my-2 rounded-md text-white font-semibold px-2"
        @click="startQuiz" :disabled="convertedData.length === 0">Start a Quiz</button>
</template>