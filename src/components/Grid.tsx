import { CSSProperties, FC } from 'react'

interface GridProps {
  minWidth: number
  gap: number | string
  align?: 'start' | 'end'
}

const Grid: FC<GridProps> = ({ minWidth, gap, align, children }) => {
  const style: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(auto-fill, minmax(${minWidth}px, 1fr))`,
    gap: typeof gap === 'number' ? `${gap}rem` : `${gap}`,
  }
  if (align) {
    style.alignItems = `flex-${align}`
  }
  return <div style={style}>{children}</div>
}

export default Grid
