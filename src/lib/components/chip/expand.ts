// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function expand(node: HTMLElement, isExpanded: boolean) {
  const initialWidth = node.offsetWidth
  node.style.overflow = 'hidden'

  return {
    update(isExpanded: boolean) {
      const animation = node.animate(
        [
          {
            width: initialWidth + 40 + 'px',
            overflow: 'hidden'
          },
          {
            width: initialWidth + 'px',
            overflow: 'hidden'
          }
        ],
        { duration: 100, fill: 'both' }
      )
      animation.pause()
      if (!isExpanded) {
        animation.play()
      } else {
        animation.reverse()
      }
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function shrink(node: HTMLElement, isExpanded: boolean) {
  const initialWidth = node.offsetWidth
  node.style.overflow = 'hidden'

  return {
    update(isExpanded: boolean) {
      const animation = node.animate(
        [
          {
            width: initialWidth + 'px',
            overflow: 'hidden'
          },
          {
            width: initialWidth - 40 + 'px',
            overflow: 'hidden'
          }
        ],
        { duration: 100, fill: 'both' }
      )
      animation.pause()
      if (!isExpanded) {
        animation.play()
      } else {
        animation.reverse()
      }
    }
  }
}
