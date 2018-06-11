package com.backesfamily.util;

import java.awt.*;
import java.awt.font.*;
import java.awt.geom.AffineTransform;
import javax.swing.*;

public class StringDrawing extends JPanel {
  protected void paintComponent(Graphics g) {
    super.paintComponent(g);
    Graphics2D g2 = (Graphics2D)g;
    g2.setRenderingHint(RenderingHints.KEY_ANTIALIASING,
            RenderingHints.VALUE_ANTIALIAS_ON);
    g2.setRenderingHint(RenderingHints.KEY_TEXT_ANTIALIASING,
            RenderingHints.VALUE_TEXT_ANTIALIAS_ON);
    String s = "Hello World";
    Font font = new Font("Ariel", Font.PLAIN, 38);
    //new Font("Lucida Bright", Font.ITALIC, 36);
    g2.setFont(font);
    FontRenderContext frc = g2.getFontRenderContext();
    TextLayout textLayout = new TextLayout(s, font, frc);
    Color textColor = Color.orange;
    Color outlineColor = Color.blue;
    Color shadowColor = Color.green.darker();

    // Text can be plain text if effect is 0 in colorText.
    int x = 20;
    int y = 150;
    g2.setPaint(textColor);
    textLayout.draw(g2, x, y);

    // If  effect is 1 then need outline text (normal text +
    // outline around it) with outline in colorOutline and
    // the normal in colorText.
    x = 200;
    y = 40;
    g2.setPaint(textColor);
    AffineTransform at = AffineTransform.getTranslateInstance(x, y);
    Shape outline = textLayout.getOutline(at);
    g2.fill(outline);
    g2.setPaint(outlineColor);
    g2.draw(outline);

    // If effect is 2 then need a drop shadow in
    // shawdowColor + the normal text.
    x = 240;
    y = 170;
    at.setToTranslation(x+5.0, y+3.0);
    outline = textLayout.getOutline(at);
    g2.setPaint(shadowColor);
    g2.fill(outline);
    g2.setPaint(textColor);
    textLayout.draw(g2, x, y);

    // If effect is 3 then need normal text, with outline and
    // finally a shadow of the text.
    x = 65;
    y = 75;
    at.setToTranslation(x+5.0, y+3.0);
    outline = textLayout.getOutline(at);
    g2.setPaint(shadowColor);
    g2.fill(outline);
    at.setToTranslation(x, y);
    outline = textLayout.getOutline(at);
    g2.setPaint(textColor);
    g2.fill(outline);
    g2.setPaint(outlineColor);
    g2.draw(outline);
  }

  public static void main(String[] args) {
    JFrame f = new JFrame();
    f.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    f.add(new StringDrawing());
    f.setSize(500,240);
    f.setLocation(200,200);
    f.setVisible(true);
  }
}