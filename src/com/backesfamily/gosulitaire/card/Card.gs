package com.backesfamily.gosulitaire.card

uses java.awt.*

public abstract class Card {

  private static final var CARD_HEIGHT : int as CardHeight = 164
  private static final var CARD_WIDTH : int as CardWidth = 118
  private static final var BORDER_ARC : int as BorderArc = 18
  private static final var GULLY_SIZE : int as GullySize = 5
  private static final var VERTICAL_OFFSET : int as VerticalOffset = Card.CARD_HEIGHT / 4

  private var _faceDown : boolean as FaceDown
  private var _location : Point as Location
  private var _size : Dimension as Size = new Dimension(CardWidth, CardHeight)

  public abstract function paint(g : Graphics, hint : boolean) : void

  public final function turnFaceUp() : void {
    _faceDown = false
  }

  public final function turnFaceDown() : void {
    _faceDown = true
  }

  public function containsPoint(p : Point) : boolean {
    var rect = new Rectangle(Location.x, Location.y, _size.width, _size.height)
    return (rect.contains(p))
  }
}
