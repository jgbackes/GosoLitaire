package com.backesfamily.gosulitaire.card

uses java.awt.*

public abstract class DefaultMutableCard implements Card {

  construct() {
    FaceDown = false
    Location = new Point(0,0)
    Size = new Dimension(Card.CardWidth, Card.CardHeight)
  }

  private var _faceDown: boolean as FaceDown
  private var _location: Point as Location
  private var _size: Dimension as Size

  override public abstract function paint(g : Graphics, hint : boolean) : void

  override public final function turnFaceUp() : void {
    FaceDown = false
  }

  override public final function turnFaceDown() : void {
    FaceDown = true
  }

  override public function containsPoint(p : Point) : boolean {
    var rect = new Rectangle(Location.x, Location.y, Size.width, Size.height)
    return (rect.contains(p))
  }
}
