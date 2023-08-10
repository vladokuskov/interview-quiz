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
        color === 'blue' ? 'bg-blue-400 hover:bg-blue-300 focus:bg-blue-300' :
            color === 'red' ? 'bg-red-400 hover:bg-red-300 focus:bg-red-300' :
                color === 'lime' ? 'bg-lime-400 hover:bg-lime-300 focus:bg-lime-300' :
                    color === 'yellow' ? 'bg-yellow-400 hover:bg-yellow-300 focus:bg-yellow-300' :
                        '',
        'inline-flex items-center justify-center gap-2 flex-wrap transition-all rounded-md font-semibold py-1 px-4 text-white disabled:bg-neutral-400'
    )">
        <slot></slot>
    </button>
</template>





