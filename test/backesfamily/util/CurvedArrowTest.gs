package backesfamily.util

uses javax.swing.JFrame

class CurvedArrowTest extends JFrame {
//
//  var _hintLocations = {new Hint(
//      new Point(100,100), new Point(250, 200), Color.YELLOW)
//      //,new Hint(new Point(200, 120), new Point(120, 50), Color.YELLOW)
//      //,new Hint(new Point(400, 400), new Point(50, 75), Color.CYAN)
//      //,new Hint(new Point(200, 210), new Point(100, 75), Color.RED)
//      //,new Hint(new Point(200, 200), new Point(55, 200), Color.GRAY)
//      //,new Hint(new Point(300, 300), new Point(100, 100), Color.BLUE)
//      //,new Hint(new Point(150, 150), new Point(400, 400), Color.BLACK)
//      ,new Hint(new Point(350, 350), new Point(200, 250), Color.BLACK)
//
//  }
//
//  construct() {
//    this.PreferredSize = new Dimension(400,400)
//    this.pack()
//  }
//
//  public static function main(args :String[]) {
//    var frame = new CurvedArrowTest()
//    frame.show()
//  }
//
//  override public function paint(g: Graphics): void {
//    var font = new Font("Dialog", java.awt.Font.BOLD, 128);
//    g.setFont(font)
//    g.setColor(Color.GREEN)
//   (g as Graphics2D).setRenderingHint(
//        RenderingHints.KEY_ANTIALIASING,
//            RenderingHints.VALUE_ANTIALIAS_ON);
//    g.drawString("Hello World", 20, 300)
//    paintArrows(g as Graphics2D, _hintLocations)
//  }
//
//  private function paintArrows(g2d: Graphics2D, hintLocations : ArrayList<Hint>) {
//    // This is where we will draw the hint arrows...
//    if (hintLocations.Count > 0) {
//      var oldStroke = g2d.Stroke
//      var oldColor = g2d.Color
//      var oldTransform: AffineTransform = g2d.getTransform()
//
//      hintLocations.eachWithIndex(\hint, i -> {
//        var anArrowShaft = CurvedArrow.getCurvedArrowShaft(hint.ArrowStart, hint.ArrowStop)
//        var anArrowhead = CurvedArrow.getArrowhead()
//        var theta = CurvedArrow.getArrowHeadTheta(hint.ArrowStart, hint.ArrowStop)
//        var controlPointMarks = CurvedArrow.getControlMarks(hint.ArrowStart, hint.ArrowStop)
//        var controlPointThetaVector = CurvedArrow.getThetaVector(hint.ArrowStart, hint.ArrowStop)
//        var arrowHeadTransform: AffineTransform = new AffineTransform()
//        var arrowHeadShadowTransform : AffineTransform = new AffineTransform()
//
//        arrowHeadTransform.translate(hint.ArrowStop.X, hint.ArrowStop.Y)
//        arrowHeadTransform.rotate(theta)
//        arrowHeadShadowTransform.scale(1.25d, 1.5d)
//        arrowHeadShadowTransform.rotate(theta)
//
//        g2d.setTransform(oldTransform)
//        g2d.setStroke(new BasicStroke(8))
//        g2d.setPaint(new Color(0, 0, 0, 128))
//        g2d.draw(anArrowShaft)
//
//        g2d.setTransform(arrowHeadShadowTransform)
//        g2d.setStroke(new BasicStroke(8))
//        g2d.setPaint(new Color(0, 0, 0, 128))
//        g2d.fill(anArrowhead)
//
//        g2d.setTransform(arrowHeadTransform)
//        g2d.setStroke(new BasicStroke(1))
//        g2d.setPaint(hint.ArrowColor)
//        g2d.fill(anArrowhead)
//
//        g2d.setTransform(oldTransform)
//        g2d.setStroke(new BasicStroke(4))
//        g2d.setPaint(hint.ArrowColor)
//        g2d.draw(anArrowShaft)
//
//        g2d.setStroke(new BasicStroke(2))
//        g2d.draw(controlPointMarks)
//
//        g2d.setStroke(new BasicStroke(1))
//        g2d.draw(controlPointThetaVector)
//
///*
//        var font = new Font("Dialog", java.awt.Font.BOLD, 8);
//        g2d.setFont(font)
//        g2d.drawString("P" + i, hint.ArrowStart.x, hint.ArrowStop.y)
//*/
//      })
//      g2d.setStroke(oldStroke)
//      g2d.setPaint(oldColor)
//      g2d.setTransform(oldTransform)
//    }
//  }
}