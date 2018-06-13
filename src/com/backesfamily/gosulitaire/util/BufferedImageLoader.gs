package com.backesfamily.gosulitaire.util

uses javax.imageio.ImageIO
uses java.awt.image.BufferedImage

public class BufferedImageLoader {

  public static function getBufferedImageFromRelativePathToClass(relativePath : String, srcClass : Class) : BufferedImage {
    var url = srcClass.getResource(relativePath)
    var img = ImageIO.read(url)
    return img
  }
}
