package com.backesfamily.gosulitaire.card

uses java.awt.*

public abstract class DefaultMutableCard implements Card {

  var _faceDown : boolean as FaceDown = false
  var _location : Point as Location = new Point(0, 0)
  var _size : Dimension as Size = new Dimension(Card.CardWidth, Card.CardHeight)

  override public abstract function paint(g : Graphics, hint : boolean) : void

  override public final function turnFaceUp() : void {
    _faceDown = false
  }

  override public final function turnFaceDown() : void {
    _faceDown = true
  }

  override public function containsPoint(p : Point) : boolean {
    var rect = new Rectangle(Location.x, Location.y, _size.width, _size.height)
    return (rect.contains(p))
  }
}
