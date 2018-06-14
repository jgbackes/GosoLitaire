package com.backesfamily.gosulitaire.card

uses com.backesfamily.gosulitaire.stack.DefaultMutableStack
uses com.backesfamily.gosulitaire.stack.Directions

uses java.awt.*

public abstract class Deck extends DefaultMutableStack {

  public construct(spreadDirection : Directions, spreadDelta : int) {
    super(spreadDirection, spreadDelta)
  }

  public function shuffle(seed : int) : void {
    var v = new Vector<DefaultMutableCard>()
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

  override public function paintEmptyStack(g : Graphics) {
    var loc = StackLocation
    g.setColor(Color.YELLOW)
    g.fillRect(loc.x, loc.y, CardI.CardWidth, CardI.CardHeight)
    g.setColor(Color.black)
    g.drawRect(loc.x, loc.y, CardI.CardWidth, CardI.CardHeight)
  }
}
