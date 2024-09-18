import { DamageType, HoodieAreas } from '@/types/damage-selection';

const HOODIE_GRID: (HoodieAreas | null)[][] = [
    [null, null, 'hood', 'hood', null, null],
    [null, 'shoulder', 'collar', 'collar', 'shoulder', null],
    [null, 'armpit', 'chest', 'chest', 'armpit', 'sleeve'],
    [null, 'sleeve', 'body', 'body', 'sleeve', 'sleeve'],
    [null, 'sleeve', 'body', 'body', 'sleeve', 'sleeve'],
    [null, 'hem', 'hem', 'hem', 'hem', null],
];

const AREA_MAP: Record<HoodieAreas, string> = {
    hood: 'Hood',
    shoulder: 'Shoulder',
    collar: 'Collar',
    armpit: 'Armpit',
    sleeve: 'Sleeve',
    hem: 'Hem',
    chest: 'Chest',
    body: 'Body',
};

const DAMAGE_MAP: Record<DamageType, string> = {
    hole: 'Hole',
    stain: 'Stain',
    pilling: 'Pilling',
};

export { HOODIE_GRID, AREA_MAP, DAMAGE_MAP };
