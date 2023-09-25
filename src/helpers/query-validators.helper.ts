export function ranksValidator(ranks: string): boolean {
	const RANKS = ['premium', 'black', 'platinum', 'gold', 'blue']
	const ranksArray = ranks.split(',')

	if (ranksArray.some(rank => !RANKS.includes(rank))) { throw new Error('The ranks must be: \'premium\' | \'black\' | \'platinum\' | \'gold\' | \'blue\'') }

	return true
}
