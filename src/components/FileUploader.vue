<script setup lang="ts">
import clsx from 'clsx';
import { Toaster, toast } from 'vue-sonner'
import { onMounted, onUnmounted, ref } from 'vue';

interface IFileUploader {
    handleChange: (data: string[]) => void
}

const fileInputRef = ref<HTMLInputElement | null>(null);
const fileContent = ref<string | null>(null);
const convertedData = ref<string[]>([]);
const isDraggedOver = ref<boolean>(false);

const props = defineProps<IFileUploader>()

const readFile = (file: File) => {
    if (file.type === 'text/plain') {
        const reader = new FileReader();

        reader.onload = () => {
            const result = reader.result as string

            if (result.length === 0) toast.error('Please, provide file with questions.')

            fileContent.value = result;
            convertToFileObject();
        };

        reader.readAsText(file);
    } else { toast.error('Please, choose correct file type.') }

};

const handleFileBrowse = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const files = target.files;

    if (files && files.length > 0) {
        const file = files[0];
        readFile(file);
    }
};

const handleFileDrop = (event: DragEvent) => {
    event.preventDefault();

    isDraggedOver.value = false;

    const files = event.dataTransfer?.files;

    if (files && files.length > 0) {
        const file = files[0];
        readFile(file);
    }
};

const convertToFileObject = () => {
    if (fileContent.value) {
        const lines = fileContent.value.split('\n');
        const topics = lines.map(line => line.trim()).filter(line => line !== '');

        convertedData.value = topics;

        props.handleChange(topics)
    }
};

const handleDragOver = (event: DragEvent) => {
    event.preventDefault();
    isDraggedOver.value = true
};

const handleDragLeave = (event: DragEvent) => {
    event.preventDefault();
    isDraggedOver.value = false
};

const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
        fileInputRef.value?.click();
    }
};

const openFileInput = () => {
    fileInputRef.value?.click();
};

onMounted(() => {
    if (fileInputRef.value) {
        fileInputRef.value.addEventListener('focus', openFileInput);
    }
});

onUnmounted(() => {
    if (fileInputRef.value) {
        fileInputRef.value.removeEventListener('focus', openFileInput);
    }
});

</script>

<template>
    <Toaster position="top-center" :duration="1500" richColors />
    <div @click="openFileInput" @dragover="handleDragOver" @dragleave="handleDragLeave" @drop="handleFileDrop"
        @keydown="handleKeyDown" tabindex="0" role="button" aria-label="Upload File" :class="clsx('w-full bg-[#EDEAFD] p-2 flex flex-col items-center justify-center gap-2 rounded-lg border-dashed border-2 border-black transition-all',
            'hover:bg-[#DDDAED] dark:hover:bg-[#909181] focus:bg-[#DDDAED] dark:focus:bg-[#909181] focus-visible:ring-yellow-400 focus-visible:ring-4',
            isDraggedOver && '!bg-[#D7F8D7] !border-[#3D613D] !border-solid ',
            'dark:bg-[#6d6e5f] dark:border-[#ffffff]')">
        <span :class="isDraggedOver && 'pointer-events-none dark:text-black'"><icon-mdi-file-plus-outline
                class="text-4xl" /></span>

        <p v-if="!fileContent"
            :class="clsx('font-inria font-semibold', isDraggedOver && 'pointer-events-none dark:text-black')">Drag & drop
            or
            Browse to choose a file (.txt)
        </p>

        <input type="file" accept=".txt" class="hidden" aria-hidden="true" ref="fileInputRef" @change="handleFileBrowse" />
    </div>
</template>