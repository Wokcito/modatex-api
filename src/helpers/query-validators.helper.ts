export function ranksValidator(ranks: string): boolean {
	const RANKS = ['premium', 'black', 'platinum', 'gold', 'blue']
	const ranksArray = ranks.split(',')

	// Check ranks
	if (ranksArray.some(rank => !RANKS.includes(rank))) { throw new Error('The ranks must be: \'premium\' | \'black\' | \'platinum\' | \'gold\' | \'blue\'') }

	// Check repeated ranks
	ranksArray.forEach(rank => {
		const foundRanks = ranksArray.filter(foundRank => foundRank === rank)
		if (foundRanks.length > 1) throw new Error('There are repeated ranks')
	})

	return true
}
