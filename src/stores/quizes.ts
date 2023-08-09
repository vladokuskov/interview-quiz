import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { CompletedTopic, Topic } from '@/types/Topic.types'

export const useQuizesStore = defineStore('quizes', () => {
  const quizes = ref<Topic[] | null>(null)
  const isSeeResults = ref<boolean>(false)
  const completedQuizes = ref<CompletedTopic[]>([])

  const loadTopics = (topics: Topic[]) => {
    quizes.value = topics
  }

  const toggleSeeResults = (value: boolean) => {
    isSeeResults.value = value
  }

  const resetTopics = () => {
    if (completedQuizes.value.length) {
      quizes.value = completedQuizes.value.map((topic) => {
        return { title: topic.title }
      })
    }

    isSeeResults.value = false
    completedQuizes.value = []
  }

  const nextTopic = (title: string, explanation: string) => {
    const removedTopicIndex = quizes.value?.findIndex((topic) => topic.title === title)

    if (removedTopicIndex !== undefined && removedTopicIndex !== -1) {
      const removedTopic = quizes.value?.splice(removedTopicIndex, 1)[0]
      if (removedTopic) completedQuizes.value.push({ title: removedTopic.title, explanation })
    }

    if (quizes.value && quizes.value.length === 0) {
      isSeeResults.value = true
    }
  }

  return {
    quizes,
    completedQuizes,
    nextTopic,
    loadTopics,
    toggleSeeResults,
    isSeeResults,
    resetTopics
  }
})
