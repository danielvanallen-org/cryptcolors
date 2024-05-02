"use client";

import { HexColorInput, HexColorPicker } from "react-colorful";

export default function CryptColorPicker({ color, setColor }: { color: string, setColor: (color: string) => void }) {
    return (
        <div>
            <HexColorPicker color={color} onChange={(newColor) => setColor(newColor)} />
            <HexColorInput color={color} onChange={(newColor) => setColor(newColor)} />
        </div>
    );
}