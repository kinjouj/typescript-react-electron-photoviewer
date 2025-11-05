export interface UseClickableImageListenerResult {
  cursor: React.CSSProperties['cursor']
  onClickImage: (e: React.MouseEvent<HTMLImageElement>) => void
  onMouseMove: (e: React.MouseEvent<HTMLImageElement>) => void
  onRightClickImageOpen: (e: React.MouseEvent<HTMLImageElement>) => void
}
