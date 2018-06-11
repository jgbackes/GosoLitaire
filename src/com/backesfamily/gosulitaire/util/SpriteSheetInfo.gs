package com.backesfamily.gosulitaire.util

public class SpriteSheetInfo {
  private var _cols : int as Columns
  private var _rows : int as Rows
  private var _width : int as Width
  private var _height : int as Height
  private var _westMargin : int as WestMargin
  private var _northMargin : int as NorthMargin
  private var _horizontalGap : int as HorizontalGap
  private var _verticalGap : int as VerticalGap

  /**
   * Default requires no margins and no gaps
  */
  construct(cols: int, rows: int, spriteWidth: int, spriteHeight: int) {
    _cols = cols
    _rows = rows
    _width = spriteWidth
    _height = spriteHeight
    _westMargin = 0
    _northMargin = 0
    _horizontalGap = 0
    _verticalGap = 0
  }

  construct(cols: int, rows: int, spriteWidth: int, spriteHeight: int, westMargin:int, northMargin : int, horizontalGap : int, verticalGap : int) {
    _cols = cols
    _rows = rows
    _width = spriteWidth
    _height = spriteHeight
    _westMargin = westMargin
    _northMargin = northMargin
    _horizontalGap = horizontalGap
    _verticalGap = verticalGap
  }

  public function getX(col: int) : int {
    return (col * (_width + _horizontalGap)) + _westMargin
  }

  public function getY(row: int) : int {
    return (row * (_height + _verticalGap)) + _northMargin
  }
}
