<script setup lang="ts">
import { clsx } from 'clsx';
import { toRefs } from 'vue';

type ButtonProps = {
    color?: 'blue' | 'lime' | 'yellow' | 'red'
}

const props = defineProps<ButtonProps>()

const { color = 'neutral' } = toRefs(props)

</script>

<template>
    <button :class="clsx(
        'font-inria text-black tracking-tight inline-flex items-center justify-center gap-2 flex-wrap transition-all rounded-xl font-semibold py-2 px-6 disabled:bg-neutral-400 border-2 border-black shadow-brutalism',
        'active:shadow-brutalism-sm focus:shadow-brutalism',
        color === 'blue' ? 'bg-blue-400 hover:bg-blue-500 focus:bg-blue-500' :
            color === 'red' ? 'bg-red-500 hover:bg-red-600 focus:bg-red-600' :
                color === 'lime' ? 'bg-lime-400 hover:bg-lime-500 focus:bg-lime-500' :
                    color === 'yellow' ? 'bg-yellow-400 hover:bg-yellow-500 focus:bg-yellow-500' :
                        '',
    )">
        <slot></slot>
    </button>
</template>





