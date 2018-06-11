package com.backesfamily.gosulitaire.util

uses com.backesfamily.gosulitaire.card.Hint
uses com.backesfamily.gosulitaire.card.ClassicCard
uses com.backesfamily.gosulitaire.stack.Stack
uses com.backesfamily.gosulitaire.stack.StackProvider
uses com.backesfamily.gosulitaire.card.Card

uses java.awt.Component
uses java.awt.geom.AffineTransform
uses java.awt.Point
uses java.awt.event.MouseEvent
uses java.util.ArrayList
uses java.lang.Math

uses javax.swing.Timer
uses javax.swing.event.MouseInputAdapter

class MouseManager extends MouseInputAdapter {

  private var _stackProvider: StackProvider

  private var _sourceStack: Stack
  private var _translation: Point
  private var _lastPoint: Point
  private var _horizontalSpeed: double as HorizontalSpeed
  private var _verticalSpeed: double as VerticalSpeed
  private var _horizontalDirection: double as HorizontalDirection
  private var _verticalDirection: double as VerticalDirection
  private var _hintLocations= new ArrayList<Hint>()
  private var _moveTimer : Timer

  construct(theStackProvider: StackProvider) {
    _stackProvider = theStackProvider
    _sourceStack = null
  }

  override public function mouseClicked(e: MouseEvent): void {
    if ( e.ClickCount == 2) {
      var mousePoint = e.Point
      var card = getCardAtMousePoint(mousePoint)
      if (card != null and card.FaceDown) {
        _sourceStack = null
        card = null
      }
      if (_sourceStack != null and card != null) {
        var loc= card.Location
        _translation = new Point(mousePoint.x - loc.x, mousePoint.y - loc.y)
        _stackProvider.CurrentStack = _sourceStack.pop(card)
        _stackProvider.CurrentStack.reverse()

        cullHints(loc)
        if (_stackProvider.HintLocations.Count > 0) {
          var firstHint = _stackProvider.HintLocations.first()
          if (firstHint != null) {
            var firstHintEndingPoint = firstHint.EndingPoint
            var fakeEvent = new MouseEvent(e.Source as Component
                , e.ID
                , e.When
                , e.Modifiers
                , firstHintEndingPoint.x
                , firstHintEndingPoint.y
                , e.ClickCount
                , e.PopupTrigger)


            var pathIterator= firstHint.CurvedArrowShaftNoKnob.getPathIterator(null, 0.5);

            var coordinates= new double[6];
            var transform = new AffineTransform()
            transform.translate(coordinates[0], coordinates[1])

            _moveTimer = new Timer(1, \evt -> {
              var type = pathIterator.currentSegment(coordinates)
              if (type == 1 and coordinates[0] != 0.0d and coordinates[1] != 0.0d) {
                card.Location = new Point(coordinates[0] as int
                    , coordinates[1] as int + Card.CardHeight / 2)

                _stackProvider.Table.repaint()
              }

              pathIterator.next();
              if (pathIterator.isDone()) {
                _moveTimer.stop()
                _moveTimer = null
                mouseReleased(fakeEvent)
              }
            })
            _moveTimer.start()
          }
        } else {
          _stackProvider.CurrentStack.reverse()
          _sourceStack.push(_stackProvider.CurrentStack)
          _stackProvider.Table.repaint()
        }
      }
    }
  }

  override public function mousePressed(e: MouseEvent): void {
    if (!e.isMetaDown() and !e.isControlDown() and !e.isShiftDown()) {
      var card: ClassicCard = null
      var mousePoint= e.getPoint()

      if (_stackProvider.Deck.containsPoint(mousePoint)) {
        _stackProvider.getNewCards()
      } else {
        card = getCardAtMousePoint(mousePoint)
        if (card != null and card.FaceDown) {
          _sourceStack = null
          card = null
        }
        if (_sourceStack != null and card != null) {
          var loc= card.Location
          _translation = new Point(mousePoint.x - loc.x, mousePoint.y - loc.y)
          _stackProvider.CurrentStack = _sourceStack.pop(card)
          _stackProvider.CurrentStack.reverse()
          cullHints(loc)
        }
      }
    }
    _lastPoint = e.getPoint()
  }

  override public function mouseReleased(event: MouseEvent): void {
    var point= event.getPoint()
    var destinationStack : Stack

    _stackProvider.HintLocations.each( \ hint -> hint.stopFeedback())

    _stackProvider.TableauStacks.each( \tableauStack -> {
      if (tableauStack.containsPoint(point)) {
        destinationStack = tableauStack
        return // early out of block
      }
    })

    _stackProvider.FoundationStacks.each( \foundationStack -> {
      if (foundationStack.containsPoint(point)) {
        destinationStack = foundationStack
        return // early out of block
      }
    })

    if (_stackProvider.CurrentStack != null and _sourceStack != null) {
      _stackProvider.doPlay(_stackProvider.CurrentStack, _sourceStack, destinationStack)
    }
    _sourceStack = null
    _stackProvider.Table.repaint()
  }

  override public function mouseDragged(e: MouseEvent): void {
    if (_stackProvider.CurrentStack != null and _translation != null) {
      var mousePoint= e.getPoint()
      _stackProvider.CurrentStack.StackLocation = new Point(mousePoint.x - _translation.x, mousePoint.y - _translation.y)

      _stackProvider.CurrentStack.Cards.each( \card -> {
        if (card.containsPoint(mousePoint)) {
          if (_stackProvider.HintLocations.Count > 0) {
            var sourceCardLocation = _stackProvider.CurrentStack.StackLocation
            var count = _stackProvider.CurrentStack.Count
            var yLoc = sourceCardLocation.y
            yLoc -= count == 1 ? (Card.CardHeight / 2) : Card.CardHeight - Card.VerticalOffset / 2
            var point = new Point(sourceCardLocation.x, yLoc )
            _stackProvider.HintLocations.each(\hint -> {
              if (_stackProvider.CurrentStack.containsPoint(mousePoint)) {
                hint.StartingPoint = point
                _horizontalDirection = _lastPoint.X > mousePoint.X ? -1 : 1
                _horizontalSpeed = Math.max(Math.abs(_lastPoint.X - mousePoint.X), _horizontalSpeed)
                _verticalDirection = _lastPoint.Y > mousePoint.Y ? -1 : 1
                _verticalSpeed = Math.max(Math.abs(_lastPoint.Y - mousePoint.Y), _verticalSpeed)
                hint.startFeedback(this, e.Component)
              }
            })
          }
          _stackProvider.Table.repaint()
        }
      })
      _lastPoint = mousePoint
    }
  }

  private function cullHints(p:Point) {
    _stackProvider.HintLocations.removeWhere(\ hint -> !hint.containsPoint(p))
  }

  private function getCardAtMousePoint(mousePoint : Point) : ClassicCard {
    var result : ClassicCard
    if (_stackProvider.WasteStack.NotEmpty and _stackProvider.WasteStack.Top.containsPoint(mousePoint)) {
      _sourceStack = _stackProvider.WasteStack
      result = (_sourceStack.Top as ClassicCard)
    } else {
      _stackProvider.TableauStacks.each( \tableauStack -> {
        if (tableauStack.NotEmpty and tableauStack.containsPoint(mousePoint)) {
          _sourceStack = tableauStack
          result = (_sourceStack.getClickedCard(mousePoint) as ClassicCard)
          return
        }
      })
      _stackProvider.FoundationStacks.each( \foundationStack -> {
        if (foundationStack.NotEmpty and foundationStack.containsPoint(mousePoint)) {
          _sourceStack = foundationStack
          result = (_sourceStack.Top as ClassicCard)
          return
        }
      })
    }
    return result
  }
}
