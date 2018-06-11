package com.backesfamily.gosulitaire.solitaire

uses com.backesfamily.gosulitaire.card.ClassicCard
uses com.backesfamily.gosulitaire.card.ClassicDeck
uses com.backesfamily.gosulitaire.stack.StackProvider
uses com.backesfamily.gosulitaire.stack.Directions

class GameGenerator {

  private var _stackProvider : StackProvider
  construct(stackProvider : StackProvider) {
    _stackProvider = stackProvider
  }


  public function generateEndGame() {
    _stackProvider.FoundationStacks.each(\elt -> {
      while (elt.Count > 0) {
        var card = elt.pop()
      }
    })
    _stackProvider.TableauStacks.each(\elt -> {
      while (elt.Count > 0) {
        var card = elt.pop()
      }
    })
    while (_stackProvider.Deck.Count > 0) {
      var card = _stackProvider.Deck.pop()
    }
    while (_stackProvider.WasteStack.Count > 0) {
      var card = _stackProvider.WasteStack.pop()
    }

    // Fill every foundation as required to win
    var classicDeck = new ClassicDeck(Directions.SPREAD_NONE, 0)
    classicDeck.Cards.each( \ card -> {
      var classicCard = card as ClassicCard
      var value = classicCard.Suit.Ordinal
      classicCard.turnFaceUp()
      _stackProvider.FoundationStacks[value].push(classicCard)
    })

    _stackProvider.Table.repaint()
  }
}