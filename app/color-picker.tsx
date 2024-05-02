export default function CryptColorPicker({ color, setColor, colorChoices }: { color: string, setColor: (color: string) => void, colorChoices: string[] }) {
    return (
        <>
            <div className="flex flex-wrap">
                {colorChoices.map((c, i) => (
                    <div key={i} className="w-32 h-32 grow" style={{ backgroundColor: `#${c}` }} onClick={() => setColor(c)}></div>
                ))}
                <div className="mt-3 text-center basis-full">
                    <strong>{color}</strong>
                </div>
            </div>
        </>
    );
}