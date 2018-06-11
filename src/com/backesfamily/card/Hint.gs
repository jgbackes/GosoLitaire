package com.backesfamily.card

uses java.awt.Color
uses java.awt.Rectangle
uses java.awt.Component
uses java.awt.Point

uses com.backesfamily.util.MouseManager
uses com.backesfamily.util.CurvedArrow
uses javax.swing.Timer
uses java.lang.Math
uses java.lang.System

class Hint extends CurvedArrow {

  public static final var WASTE_TO_TABLEAU: Color = Color.RED
  public static final var WASTE_TO_FOUNDATION: Color = Color.CYAN
  public static final var TABLEAU_TO_TABLEAU: Color = Color.YELLOW
  public static final var TABLEAU_TO_FOUNDATION: Color = Color.BLUE

  private final static var GRAVITATIONAL_CONSTANT = - 9.81
  private final static var DELAY = (1000.0d / 60.0d) as int
  private final static var DAMPING = 0.98d

  private var _cardRectangle: Rectangle
  private var _parent : Component
  internal var _angle: double
  private var _swayTimer : Timer = null
  private var _pendulumLength : double
  // private var _anchor : Point
  private var _loopCounter : int

  construct(startingPoint : Point, endingPoint : Point, color : Color, cardRectangle : Rectangle, parent : Component) {
    super(startingPoint, endingPoint, color)
    _cardRectangle = cardRectangle
    _parent = parent
  }

  public function containsPoint(p: Point) : boolean {
    return _cardRectangle.contains(p)
  }

  override public function toString() : String {
    return "arrowStart: ${_startingPoint}, arrowStop: ${_endingPoint}, arrowColor: ${ _color}"
  }

  /**
   * Handle mouse dragged by adding a little wiggle to the curved arrow.
  */
  public function startFeedback(final mouseManager : MouseManager, final component : Component) {
    var angleAcceleration: double
    var angleVelocity : double = 0
    var previousTick : double
    var duration : double
    var lastPoint = new Point(0,0)

    _loopCounter = 0

    if (_swayTimer == null) {
      _angle = Math.PI / 2 * mouseManager.HorizontalDirection
      var aSq = _endingPoint.x - _startingPoint.x
      var bSq = _endingPoint.y - _endingPoint.y
      aSq *= aSq
      bSq *= bSq

      _pendulumLength = (Math.sqrt(aSq + bSq) + _startingPoint.Y/2) / 5
      _angle = this.ArrowHeadTheta

      _swayTimer = new Timer(DELAY, \evt -> {
        var tick = System.currentTimeMillis()
        duration = (tick - previousTick)/100
        previousTick = tick

        angleAcceleration = GRAVITATIONAL_CONSTANT / _pendulumLength * Math.sin(_angle)
        angleVelocity += angleAcceleration * duration
        angleVelocity *= DAMPING
        _angle += angleVelocity * duration
        var newPoint = new Point((Math.sin(_angle) * _pendulumLength) as int, (Math.cos(_angle) * _pendulumLength) as int)

        // The loop counter is used to keep track of if the pendulum has come to rest
        //  after 30 ticks of non-movement (1/2 second) it's assumed to be finished
        _loopCounter = newPoint == lastPoint ?  _loopCounter + 1 : 0
        lastPoint = newPoint
        if (_loopCounter > 30) {
          stopFeedback()
        }
        component.repaint()
      })
      previousTick = System.currentTimeMillis()
      _swayTimer.start()
    }
  }


  public function stopFeedback() {
    _swayTimer?.stop()
    _swayTimer = null
  }

  override public function getControllingX(startingX: double, endingX: double): double {
    var xAddition = (Math.sin(_angle) * _pendulumLength)
    var xMidScreen = _parent.Width / 2
    if (startingX == endingX) {
      if (startingX > xMidScreen) {
        xAddition -= 30
      } else {
        xAddition += 30
      }
    }
    return ((startingX + endingX) / 2) + xAddition
  }

  override public function getControllingY(startingY: double, endingY: double) : double {
    var yAddition = (Math.cos(_angle) * _pendulumLength)
    return super.getControllingY(startingY, endingY) + yAddition
  }
}