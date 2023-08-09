<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted, ref, watch } from 'vue';
import { useQuizesStore } from '../stores/quizes';
import { QuizState } from '@/types/global.types'

const quizesStore = useQuizesStore()
const { selectedQuizState } = storeToRefs(quizesStore)
const { loadTopics, } = quizesStore

const fileContent = ref()
const convertedData = ref()

const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
        fileContent.value = reader.result;
    };

    reader.readAsText(file);
}

onMounted(() => {

})


watch(fileContent, () => {
    convertToFileObject()
})

const convertToFileObject = () => {
    const lines = fileContent.value.split('\n');
    const topics = [];

    lines.forEach(line => {
        const trimmedLine = line.trim();
        if (trimmedLine !== '') {
            topics.push(trimmedLine);
        }
    });

    convertedData.value = topics;
}

const startQuiz = () => {
    const data = convertedData.value.map((topic) => {
        return { title: topic }
    })

    loadTopics(data)
}

</script>

<template>
    <div>
        <input type="file" @change="handleFileChange" />
        <button @click="startQuiz">Start</button>
    </div>
</template>