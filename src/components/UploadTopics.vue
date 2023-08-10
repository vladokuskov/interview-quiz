<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useQuizesStore } from '../stores/quizes';
import BaseButton from './BaseButton.vue';


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
    <BaseButton color="lime" @click="startQuiz" :disabled="convertedData.length === 0">
        Start a Quiz <icon-mdi-arrow-right />
    </BaseButton>
</template>