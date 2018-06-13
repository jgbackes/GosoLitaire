package com.backesfamily.gosulitaire.util

uses com.backesfamily.gosulitaire.card.ClassicCard

uses java.awt.image.BufferedImage

class SpriteSheet {
  private var _spriteSheetInfo : SpriteSheetInfo
  private var _spriteSheet : BufferedImage
  private var _cachedImages : BufferedImage[][]
  private var _cached : boolean

  construct(fileName : String, spriteSheetInfo : SpriteSheetInfo, cached : boolean) {
    _cached = cached
    _spriteSheetInfo = spriteSheetInfo
    _spriteSheet = BufferedImageLoader.getBufferedImageFromRelativePathToClass(fileName, ClassicCard)
    if (cached) {
      _cachedImages = new BufferedImage[spriteSheetInfo.Columns][spriteSheetInfo.Rows]
      for (x in 0..|spriteSheetInfo.Columns) {
        for (y in 0..|spriteSheetInfo.Rows) {
          _cachedImages[x][y] = getSprite(
              spriteSheetInfo.getX(x)
              , spriteSheetInfo.getY(y))
        }
      }
    }
  }

  public final function getSprite(x : int, y : int) : BufferedImage {
    var sprite = _spriteSheet.getSubimage(x, y, _spriteSheetInfo.Width, _spriteSheetInfo.Height)
    return sprite
  }

  public function getCachedSprite(x : int, y : int) : BufferedImage {
    return _cachedImages[x][y]
  }
}