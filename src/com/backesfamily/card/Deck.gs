package com.backesfamily.card

uses java.awt.*
uses java.util.*
uses com.backesfamily.stack.DefaultMutableStack

public abstract class Deck extends DefaultMutableStack {

  public construct(spreadDirection : Directions, spreadDelta: int) {
    super(spreadDirection, spreadDelta)
  }

  public function shuffle(seed : int) : void {
    var v = new Vector<Card>()
    while (!Empty) {
      v.addElement(pop())
    }

    var aRandom = new Random()
    if (seed != -1) {
      aRandom.setSeed(seed)
    } else {
      seed = aRandom.nextInt(1000000)
      aRandom.setSeed(seed)
    }
    while (!v.Empty) {
      var randomCard = aRandom.nextInt(v.size())
      var card = v.elementAt(randomCard)
      push(card)
      v.removeElement(card)
    }
  }

  override public function paintEmptyStack(g: Graphics) {
    var loc= StackLocation
    g.setColor(Color.YELLOW)
    g.fillRect(loc.x, loc.y, Card.CardWidth, Card.CardHeight)
    g.setColor(Color.black)
    g.drawRect(loc.x, loc.y, Card.CardWidth, Card.CardHeight)
  }
}
