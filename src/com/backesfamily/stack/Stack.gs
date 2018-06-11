package com.backesfamily.stack

uses com.backesfamily.card.Card
uses com.backesfamily.card.Directions
uses java.awt.Graphics
uses java.awt.Point
uses java.util.Vector

interface Stack {
  public property get Cards(): Vector<Card>
  public property get SpreadDirection(): Directions
  public property get SpreadDelta(): int
  public property get StackLocation(): Point
  public property set StackLocation(stackLocation:Point)
  public property get Count() : int
  public property get CountFaceUp() : int
  public property get CountFaceDown() : int
  public property get Empty(): boolean
  public property get NotEmpty() : boolean
  public property get FirstFaceUp(): int
  public property get Top(): Card

  public function isValid(card: Card): boolean
  public function isValid(stack: Stack): boolean
  public function containsItem(card: Card): boolean
  public function containsPoint(point: Point): boolean

  public function elementAt(index: int): Card
  public function push(card: Card): void
  public function push(stack: Stack): void

  public function popAll() : void
  public function pop(): Card
  public function pop(n: int): Stack
  public function pop(card: Card): Stack

  public function clear()

  public function paint(g: Graphics, hint: boolean): void
  public function paintEmptyStack(g: Graphics)

  public function getClickedCard(point: Point): Card
  public function reverse(): Stack
}