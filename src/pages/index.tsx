import React, {useEffect, useRef, useState} from 'react';
import { HOODIE_GRID } from '@/constants/damage-selection';
import { DamagePoint, DamageType, DraftDamagePoint } from '@/types/damage-selection';
import { normalise } from '@/utils';
import { DamageAreaRow, DamagePointDot, DraftDamagePointDot } from '@/components';

export default function Home() {
    const imageRef = useRef<HTMLImageElement | null>(null);

    const [damagePoints, setDamagePoints] = useState<DamagePoint[]>([]);
    const [draftDamagePoint, setDraftDamagePoint] = useState<DraftDamagePoint | undefined>(undefined);
    const [canvasCtx, setCanvasCtx] = useState<CanvasRenderingContext2D | undefined>(undefined);
    const [maskImage, setMaskImage] = useState<HTMLImageElement | undefined>(undefined);

    useEffect(() => {
        // Create the canvas for the virtual image mask
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Create the mask layer image
        const img = new Image();
        img.src = '/mask.png';

        if (!ctx) {
            return; // TODO handle error if failed canvas context
        }

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;

            // Draw the image onto the canvas
            ctx.drawImage(img, 0, 0);
        };
        setCanvasCtx(ctx);
        setMaskImage(img);
    }, []);

    const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
        if (!maskImage || !canvasCtx) {
            return; // TODO handle error if mask or canvas failed to create
        }

        // Get the bounding rectangle of the image to calculate relative click position
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Scale the click pixel position to fit the image mask dimensions
        const imageX = normalise(x, 0, rect.width) * maskImage.width;
        const imageY = normalise(y, 0, rect.height) * maskImage.height;

        // Get the color data for the clicked pixel from the mask layer
        const pixelData = canvasCtx.getImageData(imageX, imageY, 1, 1).data;
        const [r, g, b] = Array.from(pixelData);

        // If the pixel colors aren't 0,0,0 the click is invalid
        if (r && g && b) {
            return;
        }

        // Calculate grid dimensions
        const gridWidth = rect.width / HOODIE_GRID[0].length;
        const gridHeight = rect.height / HOODIE_GRID.length;

        // Calculate grid coordinates and get damage area
        const gridX = Math.floor(x / gridWidth);
        const gridY = Math.floor(y / gridHeight);
        const damageArea = HOODIE_GRID[gridY][gridX];

        // If the damageArea is null the click was invalid
        if (!damageArea) {
            return;
        }

        // Set a draft damage point to the valid click location
        setDraftDamagePoint({ location: damageArea, coordinates: { x, y } });
    };

    const addDamagePoint = (point: DraftDamagePoint, damageType: DamageType) => {
        // Convert a draft damage point to a damage point
        setDamagePoints((prev) => [...prev, { ...point, type: damageType }]);
        setDraftDamagePoint(undefined);
    };

    const removeDamagePoint = (index: number) => {
        // Remove damage points from list using index filter
        setDamagePoints((prev) => prev.filter((point, i) => i !== index));
    };

    return (
        <div className={'flex flex-col justify-center h-screen bg-gray-100 p-32'}>
            <div className={'my-6'}>
                <h2 className={'text-2xl font-bold'}>You've Marked Your Hoodie as Fair condition</h2>
                <h4 className={'text-xl'}>Click on the worn spots to specify the type of wear</h4>
            </div>

            <div className={'flex bg-white shadow-2xl rounded-2xl w-full h-full'}>

                {/* Image view, click layer, and damage point overlay */}
                <div className={'w-full h-full p-12 flex items-center justify-center'}>
                    <div className="relative">
                        <img alt={'Hoodie image for wear tagging'} ref={imageRef} src={'/image.png'} className="object-fill h-[450px] cursor-pointer" onClick={handleImageClick} />
                        {damagePoints.map((damage, index) => (
                            <DamagePointDot key={`${index}-${damage.location}`} damage={damage} index={index} />
                        ))}
                        {draftDamagePoint && <DraftDamagePointDot addDamagePoint={addDamagePoint} damagePoint={draftDamagePoint} index={damagePoints.length + 1} />}
                    </div>
                </div>

                {/* Right side list view of damage points with option to delete */}
                <div className={'w-full h-full p-12 flex flex-col'}>
                    <div className={'flex-1 space-y-4'}>
                        {damagePoints.length ? (
                            damagePoints.map((damage, index) => <DamageAreaRow key={`${index}-${damage.location}`} damagePoint={damage} index={index} removeDamagePoint={removeDamagePoint} />)
                        ) : (
                            <div className={'h-full flex items-center justify-center'}>
                                <small>Tap the hoodie to start marking areas of wear!</small>
                            </div>
                        )}
                    </div>

                    {/* Two buttons, not functional but used as placeholders*/}
                    <div className={'flex justify-end mt-auto space-x-4'}>
                        <div className={'cursor-pointer px-4 rounded-lg py-2 bg-gray-300 text-white'}>Back</div>
                        <div className={'cursor-pointer px-4 rounded-lg py-2 bg-black text-white'}>Next</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
