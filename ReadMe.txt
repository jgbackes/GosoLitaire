Image Sizes for Cards needs to change

Standard poker cards are 2 1/2 inch my 3 1/5 inch following table is 72 DPI

  2.5	= 180
  3.5	= 252

Expected  Actual  Percentage
180	      118	    0.655555556
252	      164	    0.650793651

All need new images for the tabletop items like recycle card


Tableau -> Tableau, this points to the center of the top card
var sourceY = sourceStack.getLocation().y + ((totalCardsOnSourceStack - 1) * Card.VerticleOffset) - Card.CardHeight / 2


// Top of the sourceSTack
sourceY = (sourceStack.getLocation().y - Card.CardHeight)
sourceY += (sourceStack.CardCount() * Card.VerticalOffset
sourceY += faceUpStack.CardCount() == 1 ? Card.CardHeight / 2 : Card.VerticalOffset / 2


This might help with the texture drawing problem on the PC

BufferedImage image = ImageIO.read ( url );
BufferedImage convertedImage = null;
GraphicsEnvironment ge = GraphicsEnvironment.getLocalGraphicsEnvironment ();
GraphicsDevice gd = ge.getDefaultScreenDevice ();
GraphicsConfiguration gc = gd.getDefaultConfiguration ();
convertedImage = gc.createCompatibleImage (image.getWidth (),
                                           image.getHeight (),
                                           image.getTransparency () );
Graphics2D g2d = convertedImage.createGraphics ();
g2d.drawImage ( image, 0, 0, image.getWidth (), image.getHeight (), null );
g2d.dispose()


Logo created @

http://cooltext.com/Logo-Design-Gold-Bar