package com.backesfamily.gosulitaire.stack

uses com.backesfamily.gosulitaire.card.Card

uses java.awt.*

public class DefaultMutableStack implements Stack {

  private var _cards : Vector<Card>as Cards
  private var _stackLocation : Point
  private var _nextCardLocation : Point as NextCardLocation = new Point(0, 0)
  private var _spreadDirection : Directions as readonly SpreadDirection
  private var _spreadDelta : int as readonly SpreadDelta

  public construct(spreadDirection : Directions, spreadDelta : int) {
    InitializeStack(spreadDirection, spreadDelta)
  }

  private final function InitializeStack(spreadDirection : Directions, spreadDelta : int) {
    _cards = new Vector<Card>()
    _spreadDelta = spreadDelta
    _spreadDirection = spreadDirection
    _stackLocation = new Point(0, 0)
  }

  override public property get Count() : int {
    return _cards.Count
  }

  override public property get Empty() : boolean {
    return Cards.Empty
  }

  override public property get NotEmpty() : boolean {
    return !Cards.Empty
  }

  override public property get FirstFaceUp() : int {
    for (i in 0..|Cards.size()) {
      var card = Cards.get(i)
      if (!card.FaceDown) {
        return i
      }
    }
    return -1
  }

  override public property get Top() : Card {
    if (Cards.size() == 0) {
      return null
    } else {
      return Cards.elementAt(Cards.size() - 1)
    }
  }

  override public function elementAt(index : int) : Card {
    return Cards.elementAt(index)
  }

  override public function push(c : Card) : void {
    Cards.addElement(c)
    c.Location = NextCardLocation
    switch (SpreadDirection) {
      case SPREAD_NORTH:
        NextCardLocation.y -= SpreadDelta
        break

      case SPREAD_EAST:
        NextCardLocation.x += SpreadDelta
        break

      case SPREAD_SOUTH:
        NextCardLocation.y += SpreadDelta
        break

      case SPREAD_WEST:
        NextCardLocation.x -= SpreadDelta
        break
      case SPREAD_NONE:
        break
      default:
        throw new RuntimeException("Unknown direction ${SpreadDirection}!")
    }
  }

  override public function push(theStack : Stack) : void {
    while (!theStack.Empty) {
      push(theStack.pop())
    }
  }

  override public function popAll() : void {
    while (!Empty) {
      pop()
    }
  }

  override public function pop() : Card {
    var card = Top
    Cards.removeElement(card)
    switch (SpreadDirection) {
      case SPREAD_NORTH:
        NextCardLocation.y += SpreadDelta
        break

      case SPREAD_EAST:
        NextCardLocation.x -= SpreadDelta
        break

      case SPREAD_SOUTH:
        NextCardLocation.y -= SpreadDelta
        break

      case SPREAD_WEST:
        NextCardLocation.x += SpreadDelta
        break

    }
    return card
  }

  override public function pop(theCard : Card) : Stack {
    var tempStack = new DefaultMutableStack(SpreadDirection, SpreadDelta)
    while (!(Top == theCard) and !Empty) {
      tempStack.push(pop())
    }
    if (!Empty) {
      tempStack.push(pop())
    }
    return tempStack
  }

  override public function containsPoint(p : Point) : boolean {
    var rect : Rectangle = null
    switch (SpreadDirection) {
      case SPREAD_NORTH:
        var height = Card.CardHeight + (Cards.size() - 1) * SpreadDelta
        rect = new Rectangle(
            _stackLocation.x - height
            , _stackLocation.y
            , height
            , Card.CardWidth)
        break

      case SPREAD_EAST:
        rect = new Rectangle(
            _stackLocation.x
            , _stackLocation.y
            , Card.CardWidth + (Cards.size() - 1) * SpreadDelta
            , Card.CardHeight)
        break

      case SPREAD_SOUTH:
        rect = new Rectangle(
            _stackLocation.x
            , _stackLocation.y
            , Card.CardWidth
            , Card.CardHeight + (Cards.size() - 1) * SpreadDelta)
        break

      case SPREAD_WEST:
        var width = Card.CardWidth + (Cards.size() - 1) * SpreadDelta
        rect = new Rectangle(
            _stackLocation.x - width
            , _stackLocation.y
            , width
            , Card.CardHeight)
        break
      case SPREAD_NONE:
      default:
        rect = new Rectangle(
            _stackLocation.x
            , _stackLocation.y
            , Card.CardWidth
            , Card.CardHeight)
        break
    }
    return (rect?.contains(p))
  }

  override public function isValid(c : Stack) : boolean {
    return (true)
  }

  override public function paint(g : Graphics, hint : boolean) : void {
    if (Empty) {
      paintEmptyStack(g)
    } else {
      Cards.each(\card -> card.paint(g, hint))
    }
  }

  override public function paintEmptyStack(g : Graphics) {
    var loc = StackLocation
    g.setColor(Color.CYAN)
    g.fillRect(loc.x, loc.y, Card.CardWidth, Card.CardHeight)
    g.setColor(Color.black)
    g.drawRect(loc.x, loc.y, Card.CardWidth, Card.CardHeight)
  }

  override public function getClickedCard(p : Point) : Card {
    var cardFound = false
    var c : Card = null
    var i = Cards.size() - 1
    while (!cardFound and i >= 0) {
      c = (Cards.elementAt(i))
      cardFound = c.containsPoint(p)
      i--
    }
    return (c)
  }

  override public function reverse() : Stack {
    var tempCards = new Vector<Card>()
    while (!Empty) {
      tempCards.addElement(pop())
    }
    Cards = tempCards
    return this
  }

  override public property get StackLocation() : Point {
    return _stackLocation
  }

  override public property set StackLocation(point : Point) : void {
    _stackLocation = point
    var newCardLocation = new Point(point)
    if (Cards != null) {
      Cards.each(\card -> {
        card.Location = newCardLocation
        switch (SpreadDirection) {
          case SPREAD_NORTH:
            newCardLocation.y -= SpreadDelta
            break

          case SPREAD_EAST:
            newCardLocation.x += SpreadDelta
            break

          case SPREAD_SOUTH:
            newCardLocation.y += SpreadDelta
            break

          case SPREAD_WEST:
            newCardLocation.x -= SpreadDelta
            break
        }
      })
    }
    NextCardLocation = newCardLocation
  }

  override public function toString() : String {
    return Cards.toString()
  }
}
