package com.backesfamily.gosulitaire.stack

uses com.backesfamily.gosulitaire.card.Card

uses java.awt.*

interface Stack {
  public property get Cards() : Vector<Card>

  public property get StackLocation() : Point

  public property set StackLocation(stackLocation : Point)

  public property get Count() : int

  public property get Empty() : boolean

  public property get NotEmpty() : boolean

  public property get FirstFaceUp() : int

  public property get Top() : Card

  public function isValid(stack : Stack) : boolean

  public function containsPoint(point : Point) : boolean

  public function elementAt(index : int) : Card

  public function push(card : Card) : void

  public function push(stack : Stack) : void

  public function popAll() : void

  public function pop() : Card

  public function pop(card : Card) : Stack

  public function paint(g : Graphics, hint : boolean) : void

  public function paintEmptyStack(g : Graphics) : void

  public function getClickedCard(point : Point) : Card

  public function reverse() : Stack
}