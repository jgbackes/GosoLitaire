package com.backesfamily.gosulitaire.solitaire

uses com.backesfamily.gosulitaire.card.*
uses com.backesfamily.gosulitaire.stack.*
uses com.backesfamily.gosulitaire.stack.Stack

uses java.awt.*

public class GameState {

  protected var _gameInfo : GameInfo
  protected var _deck : ClassicDeck
  protected var _wasteStack : WasteStack
  protected var _tableauStacks : TableauStack[]
  protected var _foundationStacks : FoundationStack[]
  protected var _logLevel : LogLevel
  protected var _sourceStack : DefaultMutableStack
  protected var _destinationStack : DefaultMutableStack
  protected var _currentStack : DefaultMutableStack
  protected var _table : Table

  public construct(gameInfo : GameInfo, deck : ClassicDeck, wasteStack : DefaultMutableStack
      , tableauStack : TableauStack[], foundationStack : FoundationStack[]
      , sourceStack : DefaultMutableStack, destinationStack : DefaultMutableStack, currentStack : DefaultMutableStack
      , table : Table) {
    this._gameInfo = new GameInfo(gameInfo.Type, gameInfo.Seed)

    this._deck = new ClassicDeck(Directions.SPREAD_NONE, 0)
    deck.Cards.each(\card -> _deck.push(new ClassicCard(card as ClassicCard)))

    this._wasteStack = new WasteStack(Directions.SPREAD_NONE, 0)
    wasteStack.Cards.each(\card -> _wasteStack.push(new ClassicCard(card as ClassicCard)))

    this._tableauStacks = new TableauStack[Solitaire.TABLEAU_STACK_COUNT]
    tableauStack.eachWithIndex(\stack, i -> {
      _tableauStacks[i] = new TableauStack(Directions.SPREAD_SOUTH, Card.VerticalOffset)
      stack.Cards.each(\card -> _tableauStacks[i].push(new ClassicCard(card as ClassicCard)))
    })

    this._foundationStacks = new FoundationStack[Solitaire.FOUNDATION_STACK_COUNT]
    foundationStack.eachWithIndex(\stack, i -> {
      _foundationStacks[i] = new FoundationStack(Directions.SPREAD_NONE, 0)
      stack.Cards.each(\card -> _foundationStacks[i].push(new ClassicCard(card as ClassicCard)))
    })

    this._sourceStack = sourceStack
    this._destinationStack = destinationStack
    this._currentStack = currentStack
    this._table = table
  }

  public construct(gameInfo : GameInfo
      , deck : ClassicDeck
      , wasteStack : WasteStack
      , tableauStack : TableauStack[]
      , foundationStack : FoundationStack[]
      , table : Table) {
    this._gameInfo = gameInfo
    this._deck = deck
    this._wasteStack = wasteStack
    this._tableauStacks = tableauStack
    this._foundationStacks = foundationStack
    this._table = table
  }

  override public function equals(obj : Object) : boolean {
    if (obj == null or !(obj typeis GameState)) {
      return (false)
    }
    var gameState = obj as GameState
    if (!(this._gameInfo == gameState._gameInfo)) {
      return (false)
    }
    if (this._deck.Cards.size() != gameState._deck.Cards.size()
        or this._wasteStack.Cards.size() != gameState._wasteStack.Cards.size()) {
      return false
    }

    for (i in 0..|Solitaire.TABLEAU_STACK_COUNT) {
      if (this._tableauStacks[i].Count != gameState._tableauStacks[i].Count) {
        return false
      }
    }

    for (i in 0..|Solitaire.FOUNDATION_STACK_COUNT) {
      if (this._foundationStacks[i].Count != gameState._foundationStacks[i].Count) {
        return false
      }
    }

    return true
  }

  public function legalMoves(hintLocations : ArrayList<Hint>, logLevel : LogLevel) : ArrayList<GameState> {
    var legalGameStates = new ArrayList<GameState>()
    var classicCard : ClassicCard
    this._logLevel = logLevel

    hintLocations.clear()
    _tableauStacks.each(\stack -> stack.Cards.each(\card -> {
      (card as ClassicCard).Legal = false
    }))
    _foundationStacks.each(\stack -> stack.Cards.each(\card -> {
      (card as ClassicCard).Legal = false
    }))
    _wasteStack.Cards.each(\card -> {
      (card as ClassicCard).Legal = false
    })
    _deck.Cards.each(\card -> {
      (card as ClassicCard).Legal = false
    })

    _tableauStacks.eachWithIndex(\tableauStack, i -> {
      var j = tableauStack.FirstFaceUp
      if (j != -1) {
        classicCard = (tableauStack.elementAt(j) as ClassicCard)
        legalTableauToTableau(classicCard, i, hintLocations)
        legalTableauToFoundation(legalGameStates, classicCard, i, hintLocations)
        if (j + 1 != tableauStack.Count) {
          j = tableauStack.Count - 1
          classicCard = (tableauStack.elementAt(j) as ClassicCard)
          legalTableauToFoundation(legalGameStates, classicCard, i, hintLocations)
        }
      }
    })

    classicCard = this._wasteStack.Top as ClassicCard
    legalWasteToFoundation(classicCard, hintLocations)
    legalWasteToTableau(classicCard, hintLocations)
    if (legalGameStates.size() == 0) {
      if (_logLevel == LogLevel.VERBOSE_LOGGING) {
        print("No moves!")
      }
    }
    if (_logLevel == LogLevel.VERBOSE_LOGGING) {
      print("Tableau Legal moves " + legalGameStates.size())
    }
    return legalGameStates
  }

  private function legalTableauToTableau(card : ClassicCard, tableauNumber : int, hintLocations : ArrayList<Hint>) : void {
    if (card.Value == Value.V_ACE) {
      return
    }
    var sourceStack = this._tableauStacks[tableauNumber]
    var faceUpStack = sourceStack.pop(card)

    _tableauStacks.eachWithIndex(\destinationStack, i -> {
      if (i != tableauNumber) {
        if (destinationStack != null and destinationStack.isValid(faceUpStack)) {
          if (sourceStack.Empty or (!sourceStack.Empty and sourceStack.Top.FaceDown)) {
            if (!(sourceStack.Empty and destinationStack.Empty)) {
              var movableCard = (faceUpStack.elementAt(faceUpStack.Count - 1) as ClassicCard)
              if (_logLevel == LogLevel.VERBOSE_LOGGING) {
                print("Legal Move " + movableCard.Value + movableCard.Suit + " To Tableau Stack " + destinationStack)
              }
              movableCard.Legal = true
              var sourceX = sourceStack.StackLocation.x
              var sourceY = (sourceStack.StackLocation.y - Card.CardHeight)
              sourceY += sourceStack.Count * Card.VerticalOffset
              sourceY += faceUpStack.Count == 1 ? Card.CardHeight / 2 : Card.VerticalOffset / 2
              var destinationX = destinationStack.StackLocation.x
              var destinationY = destinationStack.StackLocation.y + ((destinationStack.Count - 1) * Card.VerticalOffset)
              hintLocations.add(new Hint(
                  new Point(sourceX, sourceY)
                  , new Point(destinationX, destinationY)
                  , Hint.TABLEAU_TO_TABLEAU
                  , new Rectangle(new Point(sourceX, sourceY), movableCard.Size)
                  , _table
              ))
            }
          }
        }
      }
    })
    while (!faceUpStack.Empty) {
      sourceStack.push(faceUpStack.pop())
    }
  }

  private function legalTableauToFoundation(legalGameStates : ArrayList<GameState>, card : ClassicCard, tableauNumber : int, hintLocations : ArrayList<Hint>) : void {
    var originalStack : Stack
    var currStack : Stack
    var sourceStack : Stack
    sourceStack = this._tableauStacks[tableauNumber]
    currStack = sourceStack.pop(card)
    currStack.reverse()
    originalStack = currStack
    if (originalStack != null) {
      originalStack.reverse()
    }
    if (originalStack.Count > 2) {
      while (!originalStack.Empty) {
        sourceStack.push(originalStack.pop())
      }

      return
    }

    _foundationStacks.each(\destinationStack -> {
      if (destinationStack != null and destinationStack.isValid(originalStack)) {
        var movableCard = (originalStack.elementAt(originalStack.Count - 1) as ClassicCard)
        if (_logLevel == LogLevel.VERBOSE_LOGGING) {
          print("Legal Move " + movableCard.Value + movableCard.Suit + " To Foundation Stack " + destinationStack)
        }
        movableCard.Legal = true
        while (!originalStack.Empty) {
          sourceStack.push(originalStack.pop())
        }
        hintLocations.add(new Hint(
            new Point(movableCard.Location.x
                , movableCard.Location.y - (Card.CardHeight / 2))
            , destinationStack.StackLocation
            , Hint.TABLEAU_TO_FOUNDATION
            , new Rectangle(movableCard.Location, movableCard.Size)
            , _table
        ))

        return
      }
    })

    while (!originalStack.Empty) {
      sourceStack.push(originalStack.pop())
    }

  }

  private function legalWasteToTableau(card : ClassicCard, hintLocations : ArrayList<Hint>) : void {
    if (card != null) {
      _tableauStacks.each(\tableauStack -> {
        if (tableauStack.isValid(card)) {
          if (_logLevel == LogLevel.VERBOSE_LOGGING) {
            print("Legal Move " + card.Value + card.Suit + " To Tableau Stack " + tableauStack.toString())
          }
          card.Legal = true
          var startingPoint = new Point(card.Location.x, card.Location.y - (Card.CardHeight / 2))
          var endingPoint = new Point(tableauStack.StackLocation.x
              , tableauStack.StackLocation.y + ((tableauStack.Count - 1) * Card.VerticalOffset))
          hintLocations.add(new Hint(
              startingPoint
              , endingPoint
              , Hint.WASTE_TO_TABLEAU
              , new Rectangle(card.Location, card.Size)
              , _table))
        }
      })
    }
  }

  private function legalWasteToFoundation(card : ClassicCard, hintLocations : ArrayList<Hint>) : void {
    var originalStack : Stack
    var currStack : Stack
    if (this._wasteStack.Empty) {
      return
    }
    currStack = _wasteStack.pop(card)

    currStack.reverse()
    originalStack = currStack
    if (originalStack != null) {
      originalStack.reverse()
    }
    if (originalStack.Count > 2) {
      while (!originalStack.Empty) {
        _wasteStack.push(originalStack.pop())
      }
      return
    }
    _foundationStacks.each(\foundationStack -> {
      if (foundationStack.isValid(originalStack)) {
        if (_logLevel == LogLevel.VERBOSE_LOGGING) {
          print("Legal Move " + card.Value + card.Suit + " To Foundation Stack " + foundationStack)
        }
        card.Legal = true
        hintLocations.add(new Hint(
            new Point(_wasteStack.StackLocation.x, _wasteStack.StackLocation.y - (Card.CardHeight / 2))
            , new Point(foundationStack.StackLocation.x, foundationStack.StackLocation.y - (Card.CardHeight / 2))
            , Hint.WASTE_TO_FOUNDATION
            , new Rectangle(_wasteStack.StackLocation, card.Size)
            , _table
        ))

        while (!originalStack.Empty) {
          _wasteStack.push(originalStack.pop())
        }

        return
      }
    })

    while (!originalStack.Empty) {
      _wasteStack.push(originalStack.pop())
    }

    return
  }

  public function restoreGameState(gameInfo : GameInfo, deck : ClassicDeck, wasteStack : WasteStack, tableauStacks : TableauStack[], foundationStacks : FoundationStack[], move : Move) : void {
    gameInfo.Type = this._gameInfo.Type
    gameInfo.Seed = this._gameInfo.Seed

    wasteStack.popAll()
    _wasteStack.Cards.each(\card -> wasteStack.push(new ClassicCard(card as ClassicCard)))

    deck.popAll()
    _deck.Cards.each(\card -> deck.push(new ClassicCard(card as ClassicCard)))

    _foundationStacks.eachWithIndex(\foundationStack, i -> {
      foundationStacks[i].popAll()
      foundationStack.Cards.each(\card -> foundationStacks[i].push(new ClassicCard(card as ClassicCard)))
    })

    _tableauStacks.eachWithIndex(\tableauStack, i -> {
      tableauStacks[i].popAll()
      tableauStack.Cards.each(\card -> tableauStacks[i].push(new ClassicCard(card as ClassicCard)))
    })
  }

  override public function toString() : String {
    return (_gameInfo.toString())
  }

  public enum LogLevel {
    VERBOSE_LOGGING, NOT_VERBOSE_LOGGING
  }
}
