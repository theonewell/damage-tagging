import { DamagePoint } from '@/types/damage-selection';

interface DamagePointDotProps {
    damage: DamagePoint;
    index: number;
}

export default function DamagePointDot({ damage, index }: DamagePointDotProps) {
    return (
        <div
            key={index}
            className="absolute bg-gray-200 rounded-full w-6 h-6 flex justify-center items-center text-center border border-black"
            style={{
                top: damage.coordinates.y - 12 + 'px', // Center the circle
                left: damage.coordinates.x - 12 + 'px', // Center the circle
            }}
        >
            {index + 1}
        </div>
    );
}
