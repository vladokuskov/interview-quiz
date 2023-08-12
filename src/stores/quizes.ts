import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { CompletedTopic, Topic } from '@/types/Topic.types'
import { QuizState } from '@/types/global.types'

export const useQuizesStore = defineStore('quizes', () => {
  const allTopics = ref<Topic[]>([])
  const leftTopics = ref<Topic[]>([])
  const completedTopics = ref<CompletedTopic[]>([])
  const selectedQuizState = ref<QuizState>(QuizState.pending)

  const restoreTopics = (all: Topic[], left?: Topic[], completed?: CompletedTopic[]) => {
    if (all.length) {
      allTopics.value = all.slice()

      if (completed !== undefined && completed.length) {
        completedTopics.value = completed.slice()
      }

      if (left !== undefined && left.length) {
        leftTopics.value = left.slice()
      }

      selectedQuizState.value = QuizState.answering
    }
  }

  const loadTopics = (topics: Topic[]) => {
    if (topics.length) {
      leftTopics.value = topics
      allTopics.value = topics.slice()

      // Reset completed topics
      completedTopics.value = []

      localStorage.setItem('allTopics', JSON.stringify(topics.slice()))
      localStorage.setItem('leftTopics', JSON.stringify(topics.slice()))
      localStorage.setItem('completedTopics', JSON.stringify([]))

      selectedQuizState.value = QuizState.answering
    }
  }

  const changeQuizState = (state: QuizState) => {
    selectedQuizState.value = state
  }

  const fullQuizReset = () => {
    leftTopics.value = []
    allTopics.value = []
    completedTopics.value = []

    localStorage.setItem('allTopics', JSON.stringify([]))
    localStorage.setItem('leftTopics', JSON.stringify([]))
    localStorage.setItem('completedTopics', JSON.stringify([]))

    selectedQuizState.value = QuizState.pending
  }

  const resetTopics = () => {
    leftTopics.value = JSON.parse(JSON.stringify(allTopics.value))
    completedTopics.value = []

    localStorage.setItem('leftTopics', JSON.stringify(allTopics.value.slice()))
    localStorage.setItem('completedTopics', JSON.stringify([]))

    changeQuizState(QuizState.answering)
  }

  const nextTopic = (title: string, explanation: string) => {
    const removedTopicIndex = leftTopics.value.findIndex((topic) => topic.title === title)

    if (removedTopicIndex !== undefined && removedTopicIndex !== -1) {
      const removedTopic = leftTopics.value.splice(removedTopicIndex, 1)[0]
      if (removedTopic) completedTopics.value.push({ title: removedTopic.title, explanation })
    }

    if (leftTopics.value && !leftTopics.value.length) {
      changeQuizState(QuizState.results)
    }

    localStorage.setItem('leftTopics', JSON.stringify(leftTopics.value.slice()))
    localStorage.setItem('completedTopics', JSON.stringify(completedTopics.value.slice()))
  }

  return {
    allTopics,
    leftTopics,
    completedTopics,
    selectedQuizState,
    nextTopic,
    loadTopics,
    changeQuizState,
    resetTopics,
    fullQuizReset,
    restoreTopics
  }
})
