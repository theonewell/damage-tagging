type HoodieAreas = 'hood' | 'shoulder' | 'collar' | 'armpit' | 'chest' | 'sleeve' | 'body' | 'hem';
type DamageType = 'hole' | 'stain' | 'pilling';

interface DamagePoint {
    location: HoodieAreas;
    type: DamageType;
    coordinates: {
        x: number;
        y: number;
    };
}

type DraftDamagePoint = Omit<DamagePoint, 'type'>;

export type { HoodieAreas, DamageType, DamagePoint, DraftDamagePoint };
