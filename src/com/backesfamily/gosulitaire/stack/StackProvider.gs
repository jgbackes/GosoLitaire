package com.backesfamily.gosulitaire.stack

uses com.backesfamily.gosulitaire.card.ClassicDeck
uses com.backesfamily.gosulitaire.card.Hint
uses com.backesfamily.gosulitaire.solitaire.Table

interface StackProvider {
  public property get CurrentStack() : Stack

  public property set CurrentStack(stack : Stack) : void

  public property get FoundationStacks() : FoundationStack[]

  public property get Deck() : ClassicDeck

  public property get WasteStack() : WasteStack

  public property get TableauStacks() : TableauStack[]

  public property get Table() : Table

  public property get HintLocations() : ArrayList<Hint>

  public function getNewCards() : void

  public function doPlay(current : Stack, source : Stack, destination : Stack) : void
}