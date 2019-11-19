export function assertRange(input: number, options: { from: number, to: number, location: string, subject: string }): RangeError | undefined {
    if (input < options.from || input > options.to) {
        return new RangeError(`${options.location} requires ${options.subject} matching [${options.from}-${options.to}], received ${input}`);
    }
}