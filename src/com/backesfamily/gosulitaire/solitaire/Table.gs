package com.backesfamily.gosulitaire.solitaire

uses com.backesfamily.gosulitaire.card.Card
uses com.backesfamily.gosulitaire.card.ClassicCard
uses com.backesfamily.gosulitaire.stack.StackProvider
uses com.backesfamily.gosulitaire.util.BufferedImageLoader

uses java.awt.*
uses java.awt.geom.AffineTransform

class Table extends Canvas {
  private final var TABLE_COLOR = new Color(0, 150, 0)
  private final var _tablePaint = new GradientPaint(0, 0, TABLE_COLOR.brighter(), 1024, 768, TABLE_COLOR.darker())
  private final var _logoImage = BufferedImageLoader.getBufferedImageFromRelativePathToClass("Logo.png", ClassicCard)
  private final var _feltImage = BufferedImageLoader.getBufferedImageFromRelativePathToClass("Table.png", ClassicCard)

  private var _stackProvider : StackProvider
  private var _gameLevelsProvider : GameLevelsProvider
  private var _offScreenImage : Image
  private var _offScreenGraphics : Graphics2D
  private var _gameInfoFont = new Font("Arial", java.awt.Font.PLAIN, 14)
  private var _showControlMarks = true;

  construct(theStackProvider : StackProvider, theGameLevelsProvider : GameLevelsProvider) {
    _stackProvider = theStackProvider
    _gameLevelsProvider = theGameLevelsProvider
  }

  override public function update(g : Graphics) : void {
    paint(g)
  }

  /**
   * Draw the table using double buffering
   */

  override public function paint(g : Graphics) : void {
    var dim = this.getSize()
    if (_offScreenImage == null) {
      _offScreenImage = this.createImage(dim.width, dim.height)
      _offScreenGraphics = _offScreenImage.getGraphics() as Graphics2D
    }

    _offScreenGraphics.setRenderingHint(
        RenderingHints.KEY_ANTIALIASING,
        RenderingHints.VALUE_ANTIALIAS_ON);

    paintTable(_offScreenGraphics, dim)

    g.drawImage(_offScreenImage, 0, 0, this)
  }

  /**
   * Paint the contents of the entire playing surface this includes:
   * Tabletop in either felt texture of simple color
   * Draw the deck
   * Draw the waste
   * Draw the foundations
   * Draw the tableau
   * Draw the hint arrows if enabled
   */

  private function paintTable(g2d : Graphics2D, dim : Dimension) : void {
    _feltImage.setAccelerationPriority(1.0f)
    if (_gameLevelsProvider.FeltEnabled) {
      var feltTexture = new TexturePaint(_feltImage, new Rectangle(0, 0, 60, 60))
      g2d.setPaint(feltTexture)
    } else {
      g2d.setColor(TABLE_COLOR)
      g2d.setPaint(_tablePaint)
    }
    g2d.fillRect(0, 0, dim.width, dim.height)
    g2d.setColor(Color.BLACK)

    var showHint = _gameLevelsProvider.HintEnabled
    if (_stackProvider.Deck != null) {
      if (_stackProvider.Deck.Empty) {
        _stackProvider.Deck.paintEmptyStack(g2d)
      } else {
        _stackProvider.Deck.Top.paint(g2d, showHint)
      }
    }

    if (_stackProvider.WasteStack != null and !_stackProvider.WasteStack.Empty) {
      _stackProvider.WasteStack.Top.paint(g2d, showHint)
    } else {
      _stackProvider.WasteStack.paintEmptyStack(g2d)
    }

    _stackProvider?.FoundationStacks.each(\foundationStack -> foundationStack.paint(g2d, showHint))
    _stackProvider?.TableauStacks.each(\tableauStack -> tableauStack.paint(g2d, showHint))

    if (_stackProvider.CurrentStack != null and !_stackProvider.CurrentStack.Empty) {
      _stackProvider.CurrentStack.paint(g2d, showHint)
    }

    var logoWidth = _logoImage.Width
    var margin = (dim.width - logoWidth) / 2
    g2d.drawImage(_logoImage, null, margin, dim.height - 80)

    if (showHint) {
      paintArrows(g2d)
    }
  }

  /**
   * Function that draws pretty drop shadowed arrows showing legal moves
   */

  private function paintArrows(g2d : Graphics2D) {
    var hintLocations = _gameLevelsProvider.HintLocations
    if (hintLocations.Count > 0) {
      var oldStroke = g2d.Stroke
      var oldColor = g2d.Color
      var oldTransform = g2d.getTransform()

      hintLocations.each(\hint -> {
        var anArrowShaft = hint.CurvedArrowShaft
        var shaftTransform = new AffineTransform()
        shaftTransform.translate((Card.CardWidth / 2), Card.CardHeight + 2)
        var anArrowhead = hint.Arrowhead
        var theta = hint.ArrowHeadTheta
        var arrowHeadTransform = new AffineTransform()
        arrowHeadTransform.translate(hint.EndingPoint.X + (Card.CardWidth / 2), hint.EndingPoint.Y + Card.CardHeight)
        arrowHeadTransform.rotate(theta)
        var arrowHeadShadowTransform = new AffineTransform()
        arrowHeadShadowTransform.translate(hint.EndingPoint.X + (Card.CardWidth / 2), hint.EndingPoint.Y + Card.CardHeight + 2)
        arrowHeadShadowTransform.scale(1.25d, 1.5d)
        arrowHeadShadowTransform.rotate(theta)

        for (strokeWidth in {16, 12, 8}) {
          var opacity : int = 32
          g2d.setTransform(shaftTransform)
          g2d.setStroke(new BasicStroke(strokeWidth))
          g2d.setPaint(new Color(0, 0, 0, opacity))
          g2d.draw(anArrowShaft)

          g2d.setTransform(arrowHeadShadowTransform)
          g2d.setStroke(new BasicStroke(8))
          g2d.setPaint(new Color(0, 0, 0, opacity))
          g2d.fill(anArrowhead)
          opacity += 32
        }

        g2d.setTransform(arrowHeadTransform)
        g2d.setStroke(new BasicStroke(1))
        g2d.setPaint(hint.ArrowColor)
        g2d.fill(anArrowhead)

        g2d.setTransform(shaftTransform)
        g2d.setStroke(new BasicStroke(4))
        g2d.draw(anArrowShaft)
        g2d.setColor(Color.BLACK)
        g2d.fillOval(hint.StartingPoint.x + 2, hint.StartingPoint.y + 2, 3, 3)
      })
      g2d.setStroke(oldStroke)
      g2d.setPaint(oldColor)
      g2d.setTransform(oldTransform)
    }
  }
}
