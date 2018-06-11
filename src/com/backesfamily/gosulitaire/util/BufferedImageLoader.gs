package com.backesfamily.gosulitaire.util

uses java.lang.Class
uses java.awt.image.BufferedImage
uses javax.imageio.ImageIO

public class BufferedImageLoader {

  public static function getBufferedImageFromRelativePathToClass(relativePath: String, srcClass: Class) : BufferedImage  {
    var url = srcClass.getResource(relativePath)
    var img = ImageIO.read(url)
    return img
  }
}
