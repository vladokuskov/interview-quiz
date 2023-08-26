<script setup lang="ts">
import { onMounted, ref } from 'vue';
import BaseButton from './BaseButton.vue';

const isDark = ref(false);

const toggleTheme = () => {
    isDark.value = !isDark.value;
    updateTheme(isDark.value);
};

const updateTheme = (dark: boolean) => {
    const themeMetaTag = document.querySelector('meta[name="theme-color"]');
    const themeColor = isDark.value ? '#161615' : '#f7f7ee';

    const theme = dark ? 'dark' : 'light';
    localStorage.theme = theme;


    if (dark) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    if (themeMetaTag) {
        themeMetaTag.setAttribute('content', themeColor);
    }
};

onMounted(() => {
    isDark.value = localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    updateTheme(isDark.value);
});
</script>

<template>
    <BaseButton @click="toggleTheme" class="dark:text-white" aria-label="Change theme">
        <icon-mdi-white-balance-sunny v-if="!isDark" />
        <icon-mdi-moon-waxing-crescent v-else />
    </BaseButton>
</template>
