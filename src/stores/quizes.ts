import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { CompletedTopic, Topic } from '@/types/Topic.types'
import { QuizState } from '@/types/global.types'

export const useQuizesStore = defineStore('quizes', () => {
  const preLoadedQuizes = ref<Topic[]>([])
  const quizes = ref<Topic[]>([])
  const completedQuizes = ref<CompletedTopic[]>([])
  const selectedQuizState = ref<QuizState>(QuizState.uploading)

  const loadTopics = (topics: Topic[]) => {
    if (topics.length) {
      quizes.value = topics
      preLoadedQuizes.value = topics.slice()

      selectedQuizState.value = QuizState.answering
    }
  }

  const changeQuizState = (state: QuizState) => {
    selectedQuizState.value = state
  }

  const resetTopics = () => {
    quizes.value = JSON.parse(JSON.stringify(preLoadedQuizes.value))
    completedQuizes.value = []
    changeQuizState(QuizState.answering)
  }

  const nextTopic = (title: string, explanation: string) => {
    const removedTopicIndex = quizes.value.findIndex((topic) => topic.title === title)

    if (removedTopicIndex !== undefined && removedTopicIndex !== -1) {
      const removedTopic = quizes.value.splice(removedTopicIndex, 1)[0]
      if (removedTopic) completedQuizes.value.push({ title: removedTopic.title, explanation })
    }

    if (quizes.value && quizes.value.length === 0) {
      changeQuizState(QuizState.results)
    }
  }

  return {
    quizes,
    completedQuizes,
    nextTopic,
    loadTopics,
    changeQuizState,
    resetTopics,
    preLoadedQuizes,
    selectedQuizState
  }
})
