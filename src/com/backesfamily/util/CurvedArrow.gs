package com.backesfamily.util

uses com.backesfamily.card.Card

uses java.awt.Point
uses java.awt.Color
uses java.awt.geom.GeneralPath
uses java.awt.geom.Ellipse2D

uses java.lang.Math

public class CurvedArrow {

  private final static var ARROWHEAD_LENGTH = 30.0d
  private final static var ARROWHEAD_WIDTH = 12.0d
  private final static var ARROWHEAD_VERTICAL_CONTROL = 10.0d
  private final static var ARROWHEAD_HORIZONTAL_CONTROL = 5.0d

  protected var _startingPoint : Point as StartingPoint
  protected var _endingPoint : Point as EndingPoint
  protected var _color : Color as ArrowColor

  construct(startingPoint : Point, endingPoint : Point, color : Color) {
    _startingPoint = startingPoint
    _endingPoint = endingPoint
    _color = color
  }

  public property get CurvedArrowShaft() : GeneralPath  {
      var path = new GeneralPath(GeneralPath.WIND_NON_ZERO)
      var controllingX = getControllingX(_startingPoint.X, _endingPoint.X)
      var controllingY = getControllingY(_startingPoint.Y, _endingPoint.Y)

      path.moveTo(_startingPoint.X, _startingPoint.Y)
      path.append(new Ellipse2D.Double(_startingPoint.X, _startingPoint.Y, 6.0d, 6.0d), true)
      path.moveTo(_startingPoint.X + 3.0d, _startingPoint.Y + 3.0d)
      path.quadTo(controllingX, controllingY, _endingPoint.X, _endingPoint.Y)

      return path
    }

  public property get CurvedArrowShaftNoKnob() : GeneralPath  {
      var path = new GeneralPath(GeneralPath.WIND_NON_ZERO)
      var controllingX = getControllingX(_startingPoint.X, _endingPoint.X)
      var controllingY = getControllingY(_startingPoint.Y, _endingPoint.Y)

      path.moveTo(_startingPoint.X, _startingPoint.Y)
      path.quadTo(controllingX, controllingY, _endingPoint.X, _endingPoint.Y)

      return path
    }

  public property get ControlMarks() : GeneralPath {
      var path = new GeneralPath(GeneralPath.WIND_NON_ZERO)
      var controlX = getControllingX(_startingPoint.X, _endingPoint.X)
      var controlY = getControllingY(_startingPoint.Y, _endingPoint.Y)
      path.moveTo(controlX, controlY - 10)
      path.lineTo(controlX, controlY + 10)
      path.moveTo(controlX - 10, controlY)
      path.lineTo(controlX + 10, controlY)
      path.moveTo(controlX, controlY)

      return path
    }

  public property get ThetaVector() : GeneralPath {
        var path = new GeneralPath(GeneralPath.WIND_NON_ZERO)
        var controlX = getControllingX(_startingPoint.X, _endingPoint.X)
        var controlY = getControllingY(_startingPoint.Y, _endingPoint.Y)
        path.moveTo(controlX, controlY)
        path.lineTo(_endingPoint.X, _endingPoint.Y)

        return path
    }

  public function getControllingX(startingX: double, endingX: double) : double {
    var midX = ( endingX + startingX ) / 2
    return startingX == endingX ? midX + Card.CardWidth : midX
  }

  public function getControllingY(startingY: double, endingY : double) : double {
    var yMax = Math.max(startingY, endingY)
    return yMax + Card.CardHeight / 2
  }

  public property get ArrowHeadTheta() : double {
      var startingX = getControllingX(_startingPoint.X, _endingPoint.X)
      var startingY = getControllingY(_startingPoint.Y, _endingPoint.Y)
      var deltaX = _endingPoint.X - startingX
      var deltaY = _endingPoint.Y - startingY
      var result = Math.atan2(deltaY, deltaX) + Math.PI/2.0d

      return result
    }

  /**
   * Returns an arrowhead based on drawing at 0,0
  */
  public property get Arrowhead() : GeneralPath  {
      var path = new GeneralPath(GeneralPath.WIND_NON_ZERO)

      path.moveTo(0.00d, 0.00d)
      path.lineTo(- ARROWHEAD_WIDTH, 0.00d)
      path.quadTo(- ARROWHEAD_HORIZONTAL_CONTROL
          , - ARROWHEAD_VERTICAL_CONTROL
          , 0.00d
          , - ARROWHEAD_LENGTH)
      path.quadTo(ARROWHEAD_HORIZONTAL_CONTROL
          , - ARROWHEAD_VERTICAL_CONTROL
          , ARROWHEAD_WIDTH
          , 0.00d)
      path.lineTo(0.00d, 0.00d)

      return path
    }
}