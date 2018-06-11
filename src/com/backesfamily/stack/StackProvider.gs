package com.backesfamily.stack

uses com.backesfamily.card.Hint
uses com.backesfamily.card.ClassicDeck
uses java.util.ArrayList
uses com.backesfamily.solitaire.Table

interface StackProvider {
  public property get CurrentStack() : Stack
  public property set CurrentStack(stack : Stack) : void
  public property get FoundationStacks() : FoundationStack[]
  public property get Deck() : ClassicDeck
  public property get WasteStack(): WasteStack
  public property get TableauStacks() : TableauStack[]
  public property get Table(): Table
  public property get HintLocations() : ArrayList<Hint>

  public function getNewCards() : void
  public function doPlay(current: Stack, source: Stack, destination: Stack): void
}