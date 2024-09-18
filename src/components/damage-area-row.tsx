import { AREA_MAP, DAMAGE_MAP } from '@/constants/damage-selection';
import { DamagePoint } from '@/types/damage-selection';

interface DamageAreaRowProps {
    removeDamagePoint: (index: number) => void;
    damagePoint: DamagePoint;
    index: number;
}

export default function DamageAreaRow({ index, damagePoint, removeDamagePoint }: DamageAreaRowProps) {
    const remove = () => removeDamagePoint(index);
    const area = AREA_MAP[damagePoint.location];
    const damage = DAMAGE_MAP[damagePoint.type];

    return (
        <div className={'w-full flex flex-row bg-gray-100 rounded-xl p-2'}>
            <p className={'w-6 h-6 text-center'}>{index + 1}.</p>
            <div className={'flex justify-between w-full'}>
                <p>{`${area} ${damage}`}</p>
                <p className={'transition-all w-6 h-6 text-center hover:bg-gray-300 rounded'} onClick={remove}>
                    X
                </p>
            </div>
        </div>
    );
}
