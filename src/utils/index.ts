function normalise(value: number, min: number, max: number) {
    return (value - min) / (max - min);
}

export { normalise };
