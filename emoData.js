const generateEmoArt = () => {
    // OpenMoji emoji range (using common emoji codes)
    const emojiCodes = [
        '1F600', '1F601', '1F602', '1F603', '1F604', '1F605', '1F606', '1F607', '1F608', '1F609',
        '1F60A', '1F60B', '1F60C', '1F60D', '1F60E', '1F60F', '1F610', '1F611', '1F612', '1F613',
        '1F614', '1F615', '1F616', '1F617', '1F618', '1F619', '1F61A', '1F61B', '1F61C', '1F61D',
        '1F61E', '1F61F', '1F620', '1F621', '1F622', '1F623', '1F624', '1F625', '1F626', '1F627',
        '1F628', '1F629', '1F62A', '1F62B', '1F62C', '1F62D', '1F62E', '1F62F', '1F630', '1F631',
        '1F632', '1F633', '1F634', '1F635', '1F636', '1F637', '1F638', '1F639', '1F63A', '1F63B',
        '1F63C', '1F63D', '1F63E', '1F63F', '1F640', '1F641', '1F642', '1F643', '1F644', '1F645',
        '1F646', '1F647', '1F648', '1F649', '1F64A', '1F64B', '1F64C', '1F64D', '1F64E', '1F64F'
    ];

    // Generate 10000 unique EMO combinations
    const emos = [];
    for (let i = 0; i < 10000; i++) {
        // Randomly select 2-3 emojis for combination
        const numEmojis = Math.random() > 0.5 ? 2 : 3;
        const selectedCodes = [];
        
        for (let j = 0; j < numEmojis; j++) {
            let code;
            do {
                code = emojiCodes[Math.floor(Math.random() * emojiCodes.length)];
            } while (selectedCodes.includes(code));
            selectedCodes.push(code);
        }

        // Add rarity and special effects
        const rarity = Math.random();
        let rarityLevel;
        let specialEffect = '';

        if (rarity > 0.99) {
            rarityLevel = 'Legendary';
            specialEffect = '1F451'; 
        } else if (rarity > 0.95) {
            rarityLevel = 'Epic';
            specialEffect = '2B50'; 
        } else if (rarity > 0.85) {
            rarityLevel = 'Rare';
            specialEffect = '2728'; 
        } else {
            rarityLevel = 'Common';
        }

        if (specialEffect) {
            selectedCodes.push(specialEffect);
        }

        // Create EMO object
        const emo = {
            id: i + 1,
            codes: selectedCodes,
            imageUrls: selectedCodes.map(code => 
                `https://openmoji.org/data/color/svg/${code}.svg`
            ),
            rarity: rarityLevel
        };

        emos.push(emo);
    }

    return emos;
};


const EMO_DATA = generateEmoArt();
