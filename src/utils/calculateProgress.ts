const calculateProgress = (all: number, completed: number) => {
  if (all === 0) {
    return 0
  }

  const percentage = (completed / all) * 100
  return percentage
}

export { calculateProgress }
