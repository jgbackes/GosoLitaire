package com.backesfamily.gosulitaire.util

uses javax.swing.*
uses javax.swing.Timer
uses java.awt.*
uses java.awt.geom.AffineTransform
uses java.awt.geom.GeneralPath
uses java.awt.geom.Path2D

class Sparkle extends JComponent {

  enum Speed{
    FAST(10),
    MEDIUM(20),
    SLOW(40),

    private var _delay: int as Delay

    private construct(delay: int) {
      _delay = delay
    }
  }

  private var _paths : ArrayList<Path2D>
  private var _script : int[][] = {{0}, {0}, {3}, {2}, {2}, {1, 6}, {1, 6}, {3, 5}, {3, 5}, {4}, {4}}
  private var _colors : Color[] = {Color.RED, Color.YELLOW, Color.CYAN, Color.BLUE, Color.GREEN, Color.WHITE, Color.ORANGE, Color.PINK, Color.MAGENTA}
  private var _timer : Timer
  private var _frame : int
  private var _xPosition : int
  private var _yPosition : int
  private var _scale : double
  private var _rotation : double
  private var _color : Color

  public construct() {
    this(Speed.MEDIUM)
  }

  public construct(speed: Speed) {
    _xPosition = 0
    _yPosition = 0
    _scale = 0.25
    _rotation = 0
    _color = Color.YELLOW
    _frame = 0

    initPaths()
    initTimer(speed)
  }

  private function initTimer(speed: Speed) : void {
    _timer = new Timer(speed.Delay, \evt -> {
      _frame++
      if (_frame >= _script.Count) {
        _frame = 0
        _xPosition = (Math.random() * Parent.Width) as int
        _yPosition = (Math.random() * Parent.Height) as int
        _scale = (Math.random() / 3.0d) + 0.1d
        _rotation = Math.toRadians((Math.random() * 90))
        _color = _colors[(Math.random() * _colors.Count) as int]
      }
      repaint()
    })
    _timer.InitialDelay = (Math.random() * speed.Delay) as int
    _timer.start()
  }

  private function createStar0() : GeneralPath {
    var path = new GeneralPath()

    path.moveTo(40.0d, 40.0d)
    path.lineTo(40.0d, 40.0d)

    return path
  }

  private function createStar1() : GeneralPath {
    var path = new GeneralPath()

    path.moveTo(40.0d, 00.0d)
    path.lineTo(30.0d, 30.0d)
    path.lineTo(00.0d, 40.0d)
    path.lineTo(30.0d, 50.0d)
    path.lineTo(40.0d, 80.0d)
    path.lineTo(50.0d, 50.0d)
    path.lineTo(80.0d, 40.0d)
    path.lineTo(50.0d, 30.0d)
    path.lineTo(40.0d, 00.0d)

    return path
  }

  private function createStar2() : GeneralPath {
    var path = new GeneralPath()

    path.moveTo(40.0d, 10.0d)
    path.lineTo(32.5d, 32.5d)
    path.lineTo(10.0d, 40.0d)
    path.lineTo(32.5d, 47.5d)
    path.lineTo(40.0d, 70.0d)
    path.lineTo(47.5d, 47.5d)
    path.lineTo(70.0d, 40.0d)
    path.lineTo(47.5d, 32.5d)
    path.lineTo(40.0d, 10.0d)

    return path
  }

  private function createStar3() : GeneralPath {
    var path = new GeneralPath()

    path.moveTo(40.0d, 20.0d)
    path.lineTo(35.0d, 35.0d)
    path.lineTo(20.0d, 40.0d)
    path.lineTo(35.0d, 45.0d)
    path.lineTo(40.0d, 60.0d)
    path.lineTo(45.0d, 45.0d)
    path.lineTo(60.0d, 40.0d)
    path.lineTo(45.0d, 35.0d)
    path.lineTo(40.0d, 20.0d)

    return path
  }

  private function createTick1() : GeneralPath {
    var path = new GeneralPath()

    path.moveTo(00.0d, 00.0d)
    path.lineTo(05.0d, 10.0d)
    path.lineTo(10.0d, 15.0d)
    path.lineTo(20.0d, 20.0d)
    path.lineTo(15.0d, 10.0d)
    path.lineTo(10.0d, 05.0d)
    path.lineTo(00.0d, 00.0d)

    path.moveTo(80.0d, 00.0d)
    path.lineTo(75.0d, 10.0d)
    path.lineTo(70.0d, 15.0d)
    path.lineTo(60.0d, 20.0d)
    path.lineTo(65.0d, 10.0d)
    path.lineTo(70.0d, 05.0d)
    path.lineTo(80.0d, 00.0d)

    path.moveTo(80.0d, 80.0d)
    path.lineTo(75.0d, 70.0d)
    path.lineTo(70.0d, 65.0d)
    path.lineTo(60.0d, 60.0d)
    path.lineTo(65.0d, 70.0d)
    path.lineTo(70.0d, 75.0d)
    path.lineTo(80.0d, 80.0d)

    path.moveTo(00.0d, 80.0d)
    path.lineTo(05.0d, 70.0d)
    path.lineTo(10.0d, 65.0d)
    path.lineTo(20.0d, 60.0d)
    path.lineTo(15.0d, 70.0d)
    path.lineTo(10.0d, 75.0d)
    path.lineTo(00.0d, 80.0d)

    return path
  }

  private function createTick2() : GeneralPath {
    var path = new GeneralPath()

    path.moveTo(05.0d, 05.0d)
    path.lineTo(10.0d, 15.0d)
    path.lineTo(15.0d, 20.0d)
    path.lineTo(25.0d, 25.0d)
    path.lineTo(20.0d, 15.0d)
    path.lineTo(15.0d, 10.0d)
    path.lineTo(05.0d, 05.0d)

    path.moveTo(75.00d, 5.00d)
    path.lineTo(70.00d, 15.00d)
    path.lineTo(65.00d, 20.00d)
    path.lineTo(55.00d, 25.00d)
    path.lineTo(60.00d, 15.00d)
    path.lineTo(65.00d, 10.00d)
    path.lineTo(75.00d, 5.00d)

    path.moveTo(75.00d, 75.00d)
    path.lineTo(70.00d, 65.00d)
    path.lineTo(65.00d, 60.00d)
    path.lineTo(55.00d, 55.00d)
    path.lineTo(60.00d, 65.00d)
    path.lineTo(65.00d, 70.00d)
    path.lineTo(75.00d, 75.00d)

    path.moveTo(5.00d, 75.00d)
    path.lineTo(10.00d, 65.00d)
    path.lineTo(15.00d, 60.00d)
    path.lineTo(25.00d, 55.00d)
    path.lineTo(20.00d, 65.00d)
    path.lineTo(15.00d, 70.00d)
    path.lineTo(5.00d, 75.00d)

    return path
  }

  private function createTick3() : GeneralPath {
    var path = new GeneralPath()

    path.moveTo(10.00d, 10.00d)
    path.lineTo(15.00d, 20.00d)
    path.lineTo(20.00d, 25.00d)
    path.lineTo(30.00d, 30.00d)
    path.lineTo(25.00d, 20.00d)
    path.lineTo(20.00d, 15.00d)
    path.lineTo(10.00d, 10.00d)

    path.moveTo(70.00d, 10.00d)
    path.lineTo(65.00d, 20.00d)
    path.lineTo(60.00d, 25.00d)
    path.lineTo(50.00d, 30.00d)
    path.lineTo(55.00d, 20.00d)
    path.lineTo(60.00d, 15.00d)
    path.lineTo(70.00d, 10.00d)

    path.moveTo(70.00d, 70.00d)
    path.lineTo(65.00d, 60.00d)
    path.lineTo(60.00d, 55.00d)
    path.lineTo(50.00d, 50.00d)
    path.lineTo(55.00d, 60.00d)
    path.lineTo(60.00d, 65.00d)
    path.lineTo(70.00d, 70.00d)

    path.moveTo(10.00d, 70.00d)
    path.lineTo(15.00d, 60.00d)
    path.lineTo(20.00d, 55.00d)
    path.lineTo(30.00d, 50.00d)
    path.lineTo(25.00d, 60.00d)
    path.lineTo(20.00d, 65.00d)
    path.lineTo(10.00d, 70.00d)

    return path
  }


  private function initPaths() : void {
    _paths = new ArrayList<Path2D>()
    _paths.add(createStar0())
    _paths.add(createStar1())
    _paths.add(createStar2())
    _paths.add(createStar3())

    _paths.add(createTick1())
    _paths.add(createTick2())
    _paths.add(createTick3())
  }


  override public function paintComponent(g : Graphics) : void {
    super.paintComponent(g)

    var g2d = g as Graphics2D
    g2d.Color = _color
    var frames = _script[_frame]
    var oldTransform = g2d.Transform
    var at = new AffineTransform()
    at.translate(_xPosition, _yPosition)
    at.scale(_scale, _scale)
    at.rotate(_rotation)
    g2d.Transform = at
    for (pathID in frames) {
      g2d.fill(_paths[pathID])
    }
    g2d.Transform = oldTransform
  }
}