export default function ColorSwatch({ color }: { color: string }) {
    return (
        <div style={{ backgroundColor: color }} className="w-1/2 h-32 mb-6"></div>
    )
}