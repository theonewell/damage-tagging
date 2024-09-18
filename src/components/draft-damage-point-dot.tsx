import { DamageType, DraftDamagePoint } from '@/types/damage-selection';
import { DAMAGE_MAP } from '@/constants/damage-selection';

interface DraftDamagePointProps {
    addDamagePoint: (point: DraftDamagePoint, damageType: DamageType) => void;
    damagePoint: DraftDamagePoint;
    index: number;
}

interface DamageSelectPillButtonProps {
    select: (type: DamageType) => void;
    type: DamageType;
}

function DamageSelectPillButton({ select, type }: DamageSelectPillButtonProps) {
    return (
        <div className={'transition-all hover:bg-gray-200 rounded-full px-2'} onClick={() => select(type)}>
            {DAMAGE_MAP[type]}
        </div>
    );
}

export default function DraftDamagePointDot({ addDamagePoint, damagePoint, index }: DraftDamagePointProps) {
    function selectDamageType(type: DamageType) {
        addDamagePoint(damagePoint, type);
    }

    return (
        <div
            key={index}
            className="absolute bg-gray-400 rounded-full h-6 flex items-center outline outline-1 outline-black"
            style={{
                top: damagePoint.coordinates.y - 12 + 'px', // Center the circle
                left: damagePoint.coordinates.x - 12 + 'px', // Center the circle
            }}
        >
            <div className={'bg-gray-200 flex justify-center items-center text-center h-6 rounded-full w-6  outline outline-1 outline-black'}>{index}</div>

            <div className={'flex justify-between pl-1'}>
                <DamageSelectPillButton select={selectDamageType} type={'hole'} />
                <DamageSelectPillButton select={selectDamageType} type={'stain'} />
                <DamageSelectPillButton select={selectDamageType} type={'pilling'} />
            </div>
        </div>
    );
}
