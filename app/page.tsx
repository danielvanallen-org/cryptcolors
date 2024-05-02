"use client";

import CryptColorPicker from "./color-picker";
import { useState } from "react";
// @ts-ignore
import { default as mixbox } from "mixbox";
import { colord } from "colord";
import ColorSwatch from "./color-swatch";
import MixSharedSecret from "./mix-shared-secret";
import { colorChoices } from "./constants";


export default function Home() {

  const baseColor = "#2190bc";
  const [privateColor, setPrivateColor] = useState<string>(colorChoices[0]);
  const publicColor = colord(mixbox.lerp(privateColor, baseColor, 0.5).toString()).toHex()
  const [otherPublicColor, setOtherPublicColor] = useState<string>("000000");
  const sharedSecretColor = MixSharedSecret(baseColor, privateColor, otherPublicColor, colorChoices);

  return (
    <main>
      <h2>Setup</h2>
      <p>
        To perform the demonstration, you will need a group of three people.  Two of the people will be communicating a shared secret key by choosing colors of paint, and the third person will be attempting to guess the shared secret.
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
          Finally, you will mix your private color from step (1) with the other person&apos;s public color from step (2) to create a new shared secret color.
        </li>
      </ol>

      <h2>Demonstration</h2>
      <p>
        First, choose your private color and note the six-digit code below the color picker.
      </p>
      <p>
        Don&apos;t share this code with anyone else!
      </p>
      <CryptColorPicker color={privateColor} setColor={setPrivateColor} colorChoices={colorChoices} />
      <p>
        Now we will mix your private color with the base color to create your public color.
      </p>
      <p>
        You can share the base color and your public color.
      </p>

      Mixing with Base Color: {baseColor}
      <ColorSwatch color={baseColor} />
      <strong>Your Public Color: {publicColor}</strong>
      <ColorSwatch color={publicColor} />

      <p>
        Finally, we will mix the other person&apos;s public color with your private color to create a shared secret color.
      </p>
      <p>
        Each of the two partners will end up with the same shared secret color!
      </p>

      <p>
        Ask your partner for the six-digit code representing their public color, and type it here:
      </p>
      <input type="text" value={otherPublicColor} className="mb-3 block" placeholder="1a2b3c" onInput={(e) => (setOtherPublicColor(e.currentTarget.value))} />

      <strong>Shared Secret Color: {sharedSecretColor}</strong>
      <ColorSwatch color={sharedSecretColor} />

      <p>
        Congratulations!  You have successfully shared a secret color with your partner using public key cryptography.
      </p>
      <p>
        Let the eavesdropper know that they can try to guess the shared secret color.  They will not be able to determine the shared secret color without knowing one of the private colors.
      </p>
      <p>
        Because this demonstration uses a limited number of color choices, it may be possible for the eavesdropper to guess the private colors of one or both of their partners.
      </p>
      <p>
        In real life, we use a much larger set of values, and a special math operation so that guessing the secrets is much harder to do.
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
          <a href="https://en.wikipedia.org/wiki/Diffie–Hellman_key_exchange">Diffie–Hellman key exchange</a> on Wikipedia
        </li>
      </ul>

      <h2>Acknowledgements</h2>
      <p>
        This demonstration was inspired by the excellent blog post by Graeme Taylor at <a href="https://maths.straylight.co.uk/archives/108">https://maths.straylight.co.uk/archives/108</a>.
      </p>
      <p>
        I would also like to thank Alex Orlowski for collaborating with me in planning and delivering a previous form of this exercise as a demonstration during Innovation Day at Firestone Charter Academy in Denver.
      </p>
      <p>
        It turns out mixing colors virtually in the same way that they are mixed with paint in real life is not a simple task!  This page uses <a href="https://github.com/scrtwpns/mixbox">Mixbox</a> by Secret Weapons, which is licensed under <a href="https://www.creativecommons.org/licenses/by-nc/4.0/deed.en">CC BY-NC 4.0</a>.
      </p>

    </main >
  );
}