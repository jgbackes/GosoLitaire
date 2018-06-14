package com.backesfamily.gosulitaire.stack

uses com.backesfamily.gosulitaire.card.DefaultMutableCard

uses java.awt.*

interface Stack {
  public property get Cards() : Vector<DefaultMutableCard>

  public property get StackLocation() : Point

  public property set StackLocation(stackLocation : Point)

  public property get Count() : int

  public property get Empty() : boolean

  public property get NotEmpty() : boolean

  public property get FirstFaceUp() : int

  public property get Top() : DefaultMutableCard

  public function isValid(stack : Stack) : boolean

  public function containsPoint(point : Point) : boolean

  public function elementAt(index : int) : DefaultMutableCard

  public function push(card : DefaultMutableCard) : void

  public function push(stack : Stack) : void

  public function popAll() : void

  public function pop() : DefaultMutableCard

  public function pop(card : DefaultMutableCard) : Stack

  public function paint(g : Graphics, hint : boolean) : void

  public function paintEmptyStack(g : Graphics) : void

  public function getClickedCard(point : Point) : DefaultMutableCard

  public function reverse() : Stack
}