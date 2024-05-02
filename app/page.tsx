"use client";

import CryptColorPicker from "./color-picker";
import { useState } from "react";
import { HexColorInput } from "react-colorful";
// @ts-ignore
import { default as mixbox } from "mixbox";
import { colord } from "colord";


export default function Home() {

  const baseColor = "#0000ff";
  var publicColor = "";
  const [privateColor, setPrivateColor] = useState<string>("#f6ff00");
  const [otherPublicColor, setOtherPublicColor] = useState<string>("#000000");
  var sharedSecretColor = "";

  return (
    <main>
      <h2>Setup</h2>
      <p>
        To perform the demonstration, you will need a group of three people.  Two of the people will be communicating a shared secret key by choosing colors of paint, and the third person will be attempting to eavesdrop on the conversation.
      </p>
      <p>
        If you don&apos;t have two other people around, you can also just try the demonstration for yourself to see how it works.
      </p>

      <h2>Background</h2>
      <p>
        When you load a web page, most of the time you will see a lock icon on the top left of the URL bar next to the name of the site.  This means that the page is using HTTPS, which secures your information using public key cryptography.
      </p>
      <p>
        Public key cryptography is a way to send secret messages over an insecure channel.  It works by using a pair of keys: a public key and a private key.  The public key can be shared with anyone, but the private key must be kept secret.
      </p>
      <p>
        We can simulate public key cryptography using colors of paint.
      </p>
      <ol className="list-decimal">
        <li>
          First, you will choose any private color you want, which you will not share.
        </li>
        <li>
          Then, you will mix your private color with the provided base color to create a public color, which you will share.
        </li>
        <li>
          Finally, you will mix your private color from step (1) with the other person&apos;s public color from step (2) to create a new shared secret color.  You will not share this color until you confirmed the eavesdropper cannot guess it.
        </li>
      </ol>

      <h2>Demonstration</h2>
      <p>
        First, choose your private color and note the six-digit code below the color picker.
      </p>
      <p>
        Don&apos;t share this code with anyone else!
      </p>
      {/* TODO: Add styling to make this larger and centered like swatches. */}
      <CryptColorPicker color={privateColor} setColor={setPrivateColor} />
      &nbsp;

      <p>
        Now we will mix your private color with the base color to create your public color.
      </p>
      <p>
        You can share the base color and your public color.
      </p>

      {/* TODO: Add global style for swatches */}
      <p className="text-center">
        Mixing with Base Color: {baseColor}
      </p>
      <div style={{ backgroundColor: baseColor }} className="w-1/2 m-auto h-32"></div>
      &nbsp;
      <p className="text-center">
        <strong>Your Public Color: {publicColor = colord(mixbox.lerp(privateColor, baseColor, 0.5).toString()).toHex()}</strong>
      </p>
      <div style={{ backgroundColor: publicColor }} className="w-1/2 m-auto h-32"></div>
      &nbsp;

      <p>
        Finally, we will mix the other person&apos;s public color with your private color to create a shared secret color.
      </p>
      <p>
        Each of the two partners will end up with the same shared secret color, but the eavesdropper will not be able to guess it!
      </p>

      <p>
        Ask your partner for the six-digit code representing their public color, and type it here:
      </p>
      <HexColorInput color={otherPublicColor} onChange={(setOtherPublicColor)} />

      <p className="text-center">
        {/* 
            TODO: Mixing like this does not have the required commutative property.
            Consider using a lookup to "unmix" the public key and then do a three-way mix on each side.
            See mixSharedSecret function below.
        */}
        <strong>Shared Secret Color: {sharedSecretColor = colord(mixbox.lerp(privateColor, otherPublicColor, 0.5).toString()).toHex()}</strong>
      </p>
      <div style={{ backgroundColor: sharedSecretColor }} className="w-1/2 m-auto h-32"></div>
      &nbsp;

      <p>
        Congratulations!  You have successfully shared a secret color with your partner using public key cryptography.
      </p>
      <p>
        Let the eavesdropper know that they can try to guess the shared secret color.  They will not be able to determine the shared secret color without knowing your private color.
      </p>
      <p>
        Afterwards, you can check the shared secret color with your partner to confirm that the process worked.
      </p>

      <h2>Further Reading</h2>
      <p>
        If you enjoyed this demonstration and would like to learn more about some of the topics presented here, check out some of these resources:
      </p>
      <ul className="list-disc">
        <li>
          <a href="https://maths.straylight.co.uk/archives/108">Understanding Public Key Cryptography with Paint</a> by Graeme Taylor
        </li>
        <li>
          <a href="https://tls12.xargs.org">The Illustrated TLS 1.2 Connection</a> by Michael Driscoll
        </li>
        <li>
          <a href="https://en.wikipedia.org/wiki/Kubelka–Munk_theory">Kubelka–Munk theory</a> on Wikipedia
        </li>
      </ul>

      <h2>Acknowledgements</h2>
      <p>
        This demonstration was inspired by the excellent blog post by Graeme Taylor at <a href="https://maths.straylight.co.uk/archives/108">https://maths.straylight.co.uk/archives/108</a>.
      </p>
      <p>
        I would also like to thank Alex Orlowski for collaborating with me in planning and delivering a previous form of this exercise as a demonstration during Innovation Day at Firestone Charter Academy in Denver.
      </p>

    </main >
  );
}

function mixSharedSecret(baseColor: string, privateColor: string, otherPublicColor: string) {
  var z1 = mixbox.rgbToLatent(baseColor);
  var z2 = mixbox.rgbToLatent(privateColor);
  var z3 = mixbox.rgbToLatent(otherPublicColor);

  var zMix = new Array(mixbox.LATENT_SIZE);

  for (var i = 0; i < zMix.length; i++) { // mix:
    zMix[i] = (
      0.34 * z1[i] +       // 34% of rgb1
      0.33 * z2[i] +       // 33% of rgb2
      0.33 * z3[i]         // 33% of rgb3
    );
  }

  return mixbox.latentToRgb(zMix);
}
