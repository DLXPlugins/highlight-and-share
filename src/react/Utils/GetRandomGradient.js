const gradients = [
	{
		label: 'Warm Flame',
		value:
			'linear-gradient(45deg, rgb(255,154,158) 0%, rgb(250,208,196) 99%, rgb(250,208,196) 100%)',
	},
	{
		label: 'Night Fade',
		value:
			'linear-gradient(to top, rgb(161,140,209) 0%, rgb(251,194,235) 100%)',
	},
	{
		label: 'Spring Warmth',
		value:
			'linear-gradient(to top, rgb(250,208,196) 0%, rgb(255,209,255) 100%)',
	},
	{
		label: 'Juicy Peach',
		value:
			'linear-gradient(to right, rgb(255,236,210) 0%, rgb(252,182,159) 100%)',
	},
	{
		label: 'Young Passion',
		value:
			'linear-gradient(to right, rgb(255,129,119) 0%, rgb(255,134,122) 0%, rgb(255,140,127) 21%, rgb(249,145,133) 52%, rgb(207,85,108) 78%, rgb(177,42,91) 100%)',
	},
	{
		label: 'Lady Lips',
		value:
			'linear-gradient(to top, rgb(255,154,158) 0%, rgb(254,207,239) 99%, rgb(254,207,239) 100%)',
	},
	{
		label: 'Sunny Morning',
		value:
			'linear-gradient(120deg, rgb(246,211,101) 0%, rgb(253,160,133) 100%)',
	},
	{
		label: 'Rainy Ashville',
		value:
			'linear-gradient(to top, rgb(251,194,235) 0%, rgb(166,193,238) 100%)',
	},
	{
		label: 'Frozen Dreams',
		value:
			'linear-gradient(to top, rgb(253,203,241) 0%, rgb(253,203,241) 1%, rgb(230,222,233) 100%)',
	},
	{
		label: 'Winter Neva',
		value:
			'linear-gradient(120deg, rgb(161,196,253) 0%, rgb(194,233,251) 100%)',
	},
	{
		label: 'Dusty Grass',
		value:
			'linear-gradient(120deg, rgb(212,252,121) 0%, rgb(150,230,161) 100%)',
	},
	{
		label: 'Tempting Azure',
		value:
			'linear-gradient(120deg, rgb(132,250,176) 0%, rgb(143,211,244) 100%)',
	},
	{
		label: 'Heavy Rain',
		value:
			'linear-gradient(to top, rgb(207,217,223) 0%, rgb(226,235,240) 100%)',
	},
	{
		label: 'Amy Crisp',
		value:
			'linear-gradient(120deg, rgb(166,192,254) 0%, rgb(246,128,132) 100%)',
	},
	{
		label: 'Mean Fruit',
		value:
			'linear-gradient(120deg, rgb(252,203,144) 0%, rgb(213,126,235) 100%)',
	},
	{
		label: 'Deep Blue',
		value:
			'linear-gradient(120deg, rgb(224,195,252) 0%, rgb(142,197,252) 100%)',
	},
	{
		label: 'Ripe Malinka',
		value: 'linear-gradient(120deg, rgb(240,147,251) 0%, rgb(245,87,108) 100%)',
	},
	{
		label: 'Cloudy Knoxville',
		value:
			'linear-gradient(120deg, rgb(253,251,251) 0%, rgb(235,237,238) 100%)',
	},
	{
		label: 'Malibu Beach',
		value: 'linear-gradient(to right, rgb(79,172,254) 0%, rgb(0,242,254) 100%)',
	},
	{
		label: 'New Life',
		value:
			'linear-gradient(to right, rgb(67,233,123) 0%, rgb(56,249,215) 100%)',
	},
	{
		label: 'True Sunset',
		value:
			'linear-gradient(to right, rgb(250,112,154) 0%, rgb(254,225,64) 100%)',
	},
	{
		label: 'Morpheus Den',
		value: 'linear-gradient(to top, rgb(48,207,208) 0%, rgb(51,8,103) 100%)',
	},
	{
		label: 'Rare Wind',
		value:
			'linear-gradient(to top, rgb(168,237,234) 0%, rgb(254,214,227) 100%)',
	},
	{
		label: 'Near Moon',
		value: 'linear-gradient(to top, rgb(94,231,223) 0%, rgb(180,144,202) 100%)',
	},
	{
		label: 'Wild Apple',
		value:
			'linear-gradient(to top, rgb(210,153,194) 0%, rgb(254,249,215) 100%)',
	},
	{
		label: 'Saint Petersburg',
		value:
			'linear-gradient(135deg, rgb(245,247,250) 0%, rgb(195,207,226) 100%)',
	},
	{
		label: 'Arielles Smile',
		value:
			'radial-gradient(circle 248px at center, rgb(22,217,227) 0%, rgb(48,199,236) 47%, rgb(70,174,247) 100%)',
	},
	{
		label: 'Plum Plate',
		value: 'linear-gradient(135deg, rgb(102,126,234) 0%, rgb(118,75,162) 100%)',
	},
	{
		label: 'Everlasting Sky',
		value:
			'linear-gradient(135deg, rgb(253,252,251) 0%, rgb(226,209,195) 100%)',
	},
	{
		label: 'Happy Fisher',
		value:
			'linear-gradient(120deg, rgb(137,247,254) 0%, rgb(102,166,255) 100%)',
	},
	{
		label: 'Blessing',
		value:
			'linear-gradient(to top, rgb(253,219,146) 0%, rgb(209,253,255) 100%)',
	},
	{
		label: 'Sharpeye Eagle',
		value:
			'linear-gradient(to top, rgb(152,144,227) 0%, rgb(177,244,207) 100%)',
	},
	{
		label: 'Ladoga Bottom',
		value:
			'linear-gradient(to top, rgb(235,192,253) 0%, rgb(217,222,216) 100%)',
	},
	{
		label: 'Lemon Gate',
		value:
			'linear-gradient(to top, rgb(150,251,196) 0%, rgb(249,245,134) 100%)',
	},
	{
		label: 'Itmeo Branding',
		value: 'linear-gradient(180deg, rgb(42,245,152) 0%, rgb(0,158,253) 100%)',
	},
	{
		label: 'Zeus Miracle',
		value:
			'linear-gradient(to top, rgb(205,156,242) 0%, rgb(246,243,255) 100%)',
	},
	{
		label: 'Old Hat',
		value:
			'linear-gradient(to right, rgb(228,175,203) 0%, rgb(184,203,184) 0%, rgb(184,203,184) 0%, rgb(226,197,139) 30%, rgb(194,206,156) 64%, rgb(126,219,220) 100%)',
	},
	{
		label: 'Star Wine',
		value:
			'linear-gradient(to right, rgb(184,203,184) 0%, rgb(184,203,184) 0%, rgb(180,101,218) 0%, rgb(207,108,201) 33%, rgb(238,96,156) 66%, rgb(238,96,156) 100%)',
	},
	{
		label: 'Deep Blue',
		value:
			'linear-gradient(to right, rgb(106,17,203) 0%, rgb(37,117,252) 100%)',
	},
	{
		label: 'Happy Acid',
		value: 'linear-gradient(to top, rgb(55,236,186) 0%, rgb(114,175,211) 100%)',
	},
	{
		label: 'Awesome Pine',
		value:
			'linear-gradient(to top, rgb(235,187,167) 0%, rgb(207,199,248) 100%)',
	},
	{
		label: 'New York',
		value:
			'linear-gradient(to top, rgb(255,241,235) 0%, rgb(172,224,249) 100%)',
	},
	{
		label: 'Shy Rainbow',
		value:
			'linear-gradient(to right, rgb(238,162,162) 0%, rgb(187,193,191) 19%, rgb(87,198,225) 42%, rgb(180,159,218) 79%, rgb(122,197,216) 100%)',
	},
	{
		label: 'Mixed Hopes',
		value:
			'linear-gradient(to top, rgb(196,113,245) 0%, rgb(250,113,205) 100%)',
	},
	{
		label: 'Fly High',
		value: 'linear-gradient(to top, rgb(72,198,239) 0%, rgb(111,134,214) 100%)',
	},
	{
		label: 'Strong Bliss',
		value:
			'linear-gradient(to right, rgb(247,140,160) 0%, rgb(249,116,143) 19%, rgb(253,134,140) 60%, rgb(254,154,139) 100%)',
	},
	{
		label: 'Fresh Milk',
		value:
			'linear-gradient(to top, rgb(254,173,166) 0%, rgb(245,239,239) 100%)',
	},
	{
		label: 'Snow Again',
		value:
			'linear-gradient(to top, rgb(230,233,240) 0%, rgb(238,241,245) 100%)',
	},
	{
		label: 'February Ink',
		value:
			'linear-gradient(to top, rgb(172,203,238) 0%, rgb(231,240,253) 100%)',
	},
	{
		label: 'Kind Steel',
		value:
			'linear-gradient(-20deg, rgb(233,222,250) 0%, rgb(251,252,219) 100%)',
	},
	{
		label: 'Soft Grass',
		value:
			'linear-gradient(to top, rgb(193,223,196) 0%, rgb(222,236,221) 100%)',
	},
	{
		label: 'Grown Early',
		value: 'linear-gradient(to top, rgb(11,163,96) 0%, rgb(60,186,146) 100%)',
	},
	{
		label: 'Sharp Blues',
		value: 'linear-gradient(to top, rgb(0,198,251) 0%, rgb(0,91,234) 100%)',
	},
	{
		label: 'Shady Water',
		value:
			'linear-gradient(to right, rgb(116,235,213) 0%, rgb(159,172,230) 100%)',
	},
	{
		label: 'Dirty Beauty',
		value:
			'linear-gradient(to top, rgb(106,133,182) 0%, rgb(186,200,224) 100%)',
	},
	{
		label: 'Great Whale',
		value:
			'linear-gradient(to top, rgb(163,189,237) 0%, rgb(105,145,199) 100%)',
	},
	{
		label: 'Teen Notebook',
		value:
			'linear-gradient(to top, rgb(151,149,240) 0%, rgb(251,200,212) 100%)',
	},
	{
		label: 'Polite Rumors',
		value:
			'linear-gradient(to top, rgb(167,166,203) 0%, rgb(137,137,186) 52%, rgb(137,137,186) 100%)',
	},
	{
		label: 'Sweet Period',
		value:
			'linear-gradient(to top, rgb(63,81,177) 0%, rgb(90,85,174) 13%, rgb(123,95,172) 25%, rgb(143,106,174) 38%, rgb(168,106,164) 50%, rgb(204,107,142) 62%, rgb(241,130,113) 75%, rgb(243,164,105) 87%, rgb(247,201,120) 100%)',
	},
	{
		label: 'Wide Matrix',
		value:
			'linear-gradient(to top, rgb(252,197,228) 0%, rgb(253,163,75) 15%, rgb(255,120,130) 35%, rgb(200,105,158) 52%, rgb(112,70,170) 71%, rgb(12,29,184) 87%, rgb(2,15,117) 100%)',
	},
	{
		label: 'Soft Cherish',
		value:
			'linear-gradient(to top, rgb(219,220,215) 0%, rgb(221,220,215) 24%, rgb(226,201,204) 30%, rgb(231,98,125) 46%, rgb(184,35,90) 59%, rgb(128,19,87) 71%, rgb(61,22,53) 84%, rgb(28,26,39) 100%)',
	},
	{
		label: 'Red Salvation',
		value: 'linear-gradient(to top, rgb(244,59,71) 0%, rgb(69,58,148) 100%)',
	},
	{
		label: 'Burning Spring',
		value:
			'linear-gradient(to top, rgb(79,181,118) 0%, rgb(68,196,137) 30%, rgb(40,169,174) 46%, rgb(40,162,183) 59%, rgb(76,119,136) 71%, rgb(108,79,99) 86%, rgb(67,44,57) 100%)',
	},
	{
		label: 'Night Party',
		value: 'linear-gradient(to top, rgb(2,80,197) 0%, rgb(212,63,141) 100%)',
	},
	{
		label: 'Sky Glider',
		value: 'linear-gradient(to top, rgb(136,211,206) 0%, rgb(110,69,226) 100%)',
	},
	{
		label: 'Heaven Peach',
		value:
			'linear-gradient(to top, rgb(217,175,217) 0%, rgb(151,217,225) 100%)',
	},
	{
		label: 'Purple Division',
		value: 'linear-gradient(to top, rgb(112,40,228) 0%, rgb(229,178,202) 100%)',
	},
	{
		label: 'Aqua Splash',
		value: 'linear-gradient(15deg, rgb(19,84,122) 0%, rgb(128,208,199) 100%)',
	},
	{
		label: 'Spiky Naga',
		value:
			'linear-gradient(to top, rgb(80,82,133) 0%, rgb(88,94,146) 12%, rgb(101,104,159) 25%, rgb(116,116,176) 37%, rgb(126,126,187) 50%, rgb(131,137,199) 62%, rgb(151,149,212) 75%, rgb(162,161,220) 87%, rgb(181,174,228) 100%)',
	},
	{
		label: 'Love Kiss',
		value: 'linear-gradient(to top, rgb(255,8,68) 0%, rgb(255,177,153) 100%)',
	},
	{
		label: 'Cochiti Lake',
		value: 'linear-gradient(45deg, rgb(147,165,207) 0%, rgb(228,239,233) 100%)',
	},
	{
		label: 'Premium Dark',
		value: 'linear-gradient(to right, rgb(67,67,67) 0%, black 100%)',
	},
	{
		label: 'Cold Evening',
		value:
			'linear-gradient(to top, rgb(12,52,131) 0%, rgb(162,182,223) 100%, rgb(107,140,206) 100%, rgb(162,182,223) 100%)',
	},
	{
		label: 'Summer Games',
		value:
			'linear-gradient(to right, rgb(146,254,157) 0%, rgb(0,201,255) 100%)',
	},
	{
		label: 'Passionate Bed',
		value:
			'linear-gradient(to right, rgb(255,117,140) 0%, rgb(255,126,179) 100%)',
	},
	{
		label: 'Mountain Rock',
		value:
			'linear-gradient(to right, rgb(134,143,150) 0%, rgb(89,97,100) 100%)',
	},
	{
		label: 'Desert Hump',
		value:
			'linear-gradient(to top, rgb(199,144,129) 0%, rgb(223,165,121) 100%)',
	},
	{
		label: 'Jungle Day',
		value: 'linear-gradient(45deg, rgb(139,170,170) 0%, rgb(174,139,156) 100%)',
	},
	{
		label: 'Phoenix Start',
		value: 'linear-gradient(to right, rgb(248,54,0) 0%, rgb(249,212,35) 100%)',
	},
	{
		label: 'October Silence',
		value: 'linear-gradient(-20deg, rgb(183,33,255) 0%, rgb(33,212,253) 100%)',
	},
	{
		label: 'Faraway River',
		value: 'linear-gradient(-20deg, rgb(110,69,226) 0%, rgb(136,211,206) 100%)',
	},
	{
		label: 'Alchemist Lab',
		value: 'linear-gradient(-20deg, rgb(213,88,200) 0%, rgb(36,210,146) 100%)',
	},
	{
		label: 'Over Sun',
		value: 'linear-gradient(60deg, rgb(171,236,214) 0%, rgb(251,237,150) 100%)',
	},
	{
		label: 'Premium White',
		value:
			'linear-gradient(to top, rgb(213,212,208) 0%, rgb(213,212,208) 1%, rgb(238,238,236) 31%, rgb(239,238,236) 75%, rgb(233,233,231) 100%)',
	},
	{
		label: 'Mars Party',
		value: 'linear-gradient(to top, rgb(95,114,189) 0%, rgb(155,35,234) 100%)',
	},
	{
		label: 'Eternal Constance',
		value: 'linear-gradient(to top, rgb(9,32,63) 0%, rgb(83,120,149) 100%)',
	},
	{
		label: 'Japan Blush',
		value:
			'linear-gradient(-20deg, rgb(221,214,243) 0%, rgb(250,172,168) 100%, rgb(250,172,168) 100%)',
	},
	{
		label: 'Smiling Rain',
		value:
			'linear-gradient(-20deg, rgb(220,176,237) 0%, rgb(153,201,156) 100%)',
	},
	{
		label: 'Cloudy Apple',
		value:
			'linear-gradient(to top, rgb(243,231,233) 0%, rgb(227,238,255) 99%, rgb(227,238,255) 100%)',
	},
	{
		label: 'Big Mango',
		value: 'linear-gradient(to top, rgb(199,29,111) 0%, rgb(208,150,147) 100%)',
	},
	{
		label: 'Healthy Water',
		value: 'linear-gradient(60deg, rgb(150,222,218) 0%, rgb(80,201,195) 100%)',
	},
	{
		label: 'Amour Amour',
		value: 'linear-gradient(to top, rgb(247,112,98) 0%, rgb(254,81,150) 100%)',
	},
	{
		label: 'Risky Concrete',
		value:
			'linear-gradient(to top, rgb(196,197,199) 0%, rgb(220,221,223) 52%, rgb(235,235,235) 100%)',
	},
	{
		label: 'Strong Stick',
		value: 'linear-gradient(to right, rgb(168,202,186) 0%, rgb(93,65,87) 100%)',
	},
	{
		label: 'Vicious Stance',
		value: 'linear-gradient(60deg, rgb(41,50,60) 0%, rgb(72,85,99) 100%)',
	},
	{
		label: 'Palo Alto',
		value: 'linear-gradient(-60deg, rgb(22,160,133) 0%, rgb(244,208,63) 100%)',
	},
	{
		label: 'Happy Memories',
		value: 'linear-gradient(-60deg, rgb(255,88,88) 0%, rgb(240,152,25) 100%)',
	},
	{
		label: 'Midnight Bloom',
		value: 'linear-gradient(-20deg, rgb(43,88,118) 0%, rgb(78,67,118) 100%)',
	},
	{
		label: 'Crystalline',
		value: 'linear-gradient(-20deg, rgb(0,205,172) 0%, rgb(141,218,213) 100%)',
	},
	{
		label: 'River City',
		value: 'linear-gradient(to top, rgb(68,129,235) 0%, rgb(4,190,254) 100%)',
	},
	{
		label: 'Confident Cloud',
		value:
			'linear-gradient(to top, rgb(218,212,236) 0%, rgb(218,212,236) 1%, rgb(243,231,233) 100%)',
	},
	{
		label: 'Le Cocktail',
		value: 'linear-gradient(45deg, rgb(135,77,162) 0%, rgb(196,58,48) 100%)',
	},
	{
		label: 'Frozen Berry',
		value: 'linear-gradient(to top, rgb(232,25,139) 0%, rgb(199,234,253) 100%)',
	},
	{
		label: 'Child Care',
		value:
			'linear-gradient(-20deg, rgb(247,148,164) 0%, rgb(253,214,189) 100%)',
	},
	{
		label: 'Flying Lemon',
		value: 'linear-gradient(60deg, rgb(100,179,244) 0%, rgb(194,229,156) 100%)',
	},
	{
		label: 'New Retrowave',
		value:
			'linear-gradient(to top, rgb(59,65,197) 0%, rgb(169,129,187) 49%, rgb(255,200,169) 100%)',
	},
	{
		label: 'Hidden Jaguar',
		value: 'linear-gradient(to top, rgb(15,216,80) 0%, rgb(249,240,71) 100%)',
	},
	{
		label: 'Above The Sky',
		value:
			'linear-gradient(to top, lightgrey 0%, lightgrey 1%, rgb(224,224,224) 26%, rgb(239,239,239) 48%, rgb(217,217,217) 75%, rgb(188,188,188) 100%)',
	},
	{
		label: 'Nega',
		value: 'linear-gradient(45deg, rgb(238,156,167) 0%, rgb(255,221,225) 100%)',
	},
	{
		label: 'Dense Water',
		value:
			'linear-gradient(to right, rgb(58,181,176) 0%, rgb(61,153,190) 31%, rgb(86,49,122) 100%)',
	},
	{
		label: 'Seashore',
		value: 'linear-gradient(to top, rgb(32,156,255) 0%, rgb(104,224,207) 100%)',
	},
	{
		label: 'Marble Wall',
		value:
			'linear-gradient(to top, rgb(189,194,232) 0%, rgb(189,194,232) 1%, rgb(230,222,233) 100%)',
	},
	{
		label: 'Cheerful Caramel',
		value:
			'linear-gradient(to top, rgb(230,185,128) 0%, rgb(234,205,163) 100%)',
	},
	{
		label: 'Night Sky',
		value:
			'linear-gradient(to top, rgb(30,60,114) 0%, rgb(30,60,114) 1%, rgb(42,82,152) 100%)',
	},
	{
		label: 'Magic Lake',
		value:
			'linear-gradient(to top, rgb(213,222,231) 0%, rgb(255,175,189) 0%, rgb(201,255,191) 100%)',
	},
	{
		label: 'Young Grass',
		value: 'linear-gradient(to top, rgb(155,225,93) 0%, rgb(0,227,174) 100%)',
	},
	{
		label: 'Royal Garden',
		value:
			'linear-gradient(to right, rgb(237,110,160) 0%, rgb(236,140,105) 100%)',
	},
	{
		label: 'Gentle Care',
		value:
			'linear-gradient(to right, rgb(255,195,160) 0%, rgb(255,175,189) 100%)',
	},
	{
		label: 'Plum Bath',
		value: 'linear-gradient(to top, rgb(204,32,142) 0%, rgb(103,19,210) 100%)',
	},
	{
		label: 'Happy Unicorn',
		value: 'linear-gradient(to top, rgb(179,255,171) 0%, rgb(18,255,247) 100%)',
	},
	{
		label: 'African Field',
		value:
			'linear-gradient(-45deg, rgb(255,199,150) 0%, rgb(255,107,149) 100%)',
	},
	{
		label: 'Solid Stone',
		value: 'linear-gradient(to right, rgb(36,57,73) 0%, rgb(81,127,164) 100%)',
	},
	{
		label: 'Orange Juice',
		value: 'linear-gradient(-20deg, rgb(252,96,118) 0%, rgb(255,154,68) 100%)',
	},
	{
		label: 'Glass Water',
		value: 'linear-gradient(to top, rgb(223,233,243) 0%, white 100%)',
	},
	{
		label: 'North Miracle',
		value: 'linear-gradient(to right, rgb(0,219,222) 0%, rgb(252,0,255) 100%)',
	},
	{
		label: 'Fruit Blend',
		value: 'linear-gradient(to right, rgb(249,212,35) 0%, rgb(255,78,80) 100%)',
	},
	{
		label: 'Millennium Pine',
		value: 'linear-gradient(to top, rgb(80,204,127) 0%, rgb(245,209,0) 100%)',
	},
	{
		label: 'High Flight',
		value: 'linear-gradient(to right, rgb(10,207,254) 0%, rgb(73,90,255) 100%)',
	},
	{
		label: 'Mole Hall',
		value: 'linear-gradient(-20deg, rgb(97,97,97) 0%, rgb(155,197,195) 100%)',
	},
	{
		label: 'Space Shift',
		value:
			'linear-gradient(60deg, rgb(61,51,147) 0%, rgb(43,118,185) 37%, rgb(44,172,209) 65%, rgb(53,235,147) 100%)',
	},
	{
		label: 'Forest Inei',
		value:
			'linear-gradient(to top, rgb(223,137,181) 0%, rgb(191,217,254) 100%)',
	},
	{
		label: 'Rich Metal',
		value: 'linear-gradient(to right, rgb(215,210,204) 0%, rgb(48,67,82) 100%)',
	},
	{
		label: 'Juicy Cake',
		value: 'linear-gradient(to top, rgb(225,79,173) 0%, rgb(249,212,35) 100%)',
	},
	{
		label: 'Smart Indigo',
		value: 'linear-gradient(to top, rgb(178,36,239) 0%, rgb(117,121,255) 100%)',
	},
	{
		label: 'Sand Strike',
		value:
			'linear-gradient(to right, rgb(193,193,97) 0%, rgb(193,193,97) 0%, rgb(212,212,177) 100%)',
	},
	{
		label: 'Norse Beauty',
		value:
			'linear-gradient(to right, rgb(236,119,171) 0%, rgb(120,115,245) 100%)',
	},
	{
		label: 'Aqua Guidance',
		value: 'linear-gradient(to top, rgb(0,122,223) 0%, rgb(0,236,188) 100%)',
	},
	{
		label: 'Sun Veggie',
		value:
			'linear-gradient(-225deg, rgb(32,226,215) 0%, rgb(249,254,165) 100%)',
	},
	{
		label: 'Sea Lord',
		value:
			'linear-gradient(-225deg, rgb(44,216,213) 0%, rgb(197,193,255) 56%, rgb(255,186,195) 100%)',
	},
	{
		label: 'Black Sea',
		value:
			'linear-gradient(-225deg, rgb(44,216,213) 0%, rgb(107,141,214) 48%, rgb(142,55,215) 100%)',
	},
	{
		label: 'Grass Shampoo',
		value:
			'linear-gradient(-225deg, rgb(223,255,205) 0%, rgb(144,249,196) 48%, rgb(57,243,187) 100%)',
	},
	{
		label: 'Landing Aircraft',
		value:
			'linear-gradient(-225deg, rgb(93,159,255) 0%, rgb(184,220,255) 48%, rgb(107,187,255) 100%)',
	},
	{
		label: 'Witch Dance',
		value:
			'linear-gradient(-225deg, rgb(168,191,255) 0%, rgb(136,77,128) 100%)',
	},
	{
		label: 'Sleepless Night',
		value:
			'linear-gradient(-225deg, rgb(82,113,196) 0%, rgb(177,159,255) 48%, rgb(236,161,254) 100%)',
	},
	{
		label: 'Angel Care',
		value:
			'linear-gradient(-225deg, rgb(255,226,159) 0%, rgb(255,169,159) 48%, rgb(255,113,154) 100%)',
	},
	{
		label: 'Crystal River',
		value:
			'linear-gradient(-225deg, rgb(34,225,255) 0%, rgb(29,143,225) 48%, rgb(98,94,177) 100%)',
	},
	{
		label: 'Soft Lipstick',
		value:
			'linear-gradient(-225deg, rgb(182,206,232) 0%, rgb(245,120,220) 100%)',
	},
	{
		label: 'Salt Mountain',
		value:
			'linear-gradient(-225deg, rgb(255,254,255) 0%, rgb(215,255,254) 100%)',
	},
	{
		label: 'Perfect White',
		value:
			'linear-gradient(-225deg, rgb(227,253,245) 0%, rgb(255,230,250) 100%)',
	},
	{
		label: 'Fresh Oasis',
		value:
			'linear-gradient(-225deg, rgb(125,226,252) 0%, rgb(185,182,229) 100%)',
	},
	{
		label: 'Strict November',
		value:
			'linear-gradient(-225deg, rgb(203,186,204) 0%, rgb(37,128,179) 100%)',
	},
	{
		label: 'Morning Salad',
		value:
			'linear-gradient(-225deg, rgb(183,248,219) 0%, rgb(80,167,194) 100%)',
	},
	{
		label: 'Deep Relief',
		value:
			'linear-gradient(-225deg, rgb(112,133,182) 0%, rgb(135,167,217) 50%, rgb(222,243,248) 100%)',
	},
	{
		label: 'Sea Strike',
		value:
			'linear-gradient(-225deg, rgb(119,255,210) 0%, rgb(98,151,219) 48%, rgb(30,236,255) 100%)',
	},
	{
		label: 'Night Call',
		value:
			'linear-gradient(-225deg, rgb(172,50,228) 0%, rgb(121,24,242) 48%, rgb(72,1,255) 100%)',
	},
	{
		label: 'Supreme Sky',
		value:
			'linear-gradient(-225deg, rgb(212,255,236) 0%, rgb(87,242,204) 48%, rgb(69,150,251) 100%)',
	},
	{
		label: 'Light Blue',
		value:
			'linear-gradient(-225deg, rgb(158,251,211) 0%, rgb(87,233,242) 48%, rgb(69,212,251) 100%)',
	},
	{
		label: 'Mind Crawl',
		value:
			'linear-gradient(-225deg, rgb(71,59,123) 0%, rgb(53,132,167) 51%, rgb(48,210,190) 100%)',
	},
	{
		label: 'Lily Meadow',
		value:
			'linear-gradient(-225deg, rgb(101,55,155) 0%, rgb(136,106,234) 53%, rgb(100,87,198) 100%)',
	},
	{
		label: 'Sugar Lollipop',
		value:
			'linear-gradient(-225deg, rgb(164,69,178) 0%, rgb(212,24,114) 52%, rgb(255,0,102) 100%)',
	},
	{
		label: 'Sweet Dessert',
		value:
			'linear-gradient(-225deg, rgb(119,66,178) 0%, rgb(241,128,255) 52%, rgb(253,139,217) 100%)',
	},
	{
		label: 'Magic Ray',
		value:
			'linear-gradient(-225deg, rgb(255,60,172) 0%, rgb(86,43,124) 52%, rgb(43,134,197) 100%)',
	},
	{
		label: 'Teen Party',
		value:
			'linear-gradient(-225deg, rgb(255,5,124) 0%, rgb(141,11,147) 50%, rgb(50,21,117) 100%)',
	},
	{
		label: 'Frozen Heat',
		value:
			'linear-gradient(-225deg, rgb(255,5,124) 0%, rgb(124,100,213) 48%, rgb(76,195,255) 100%)',
	},
	{
		label: 'Gagarin View',
		value:
			'linear-gradient(-225deg, rgb(105,234,203) 0%, rgb(234,204,248) 48%, rgb(102,84,241) 100%)',
	},
	{
		label: 'Fabled Sunset',
		value:
			'linear-gradient(-225deg, rgb(35,21,87) 0%, rgb(68,16,122) 29%, rgb(255,19,97) 67%, rgb(255,248,0) 100%)',
	},
	{
		label: 'Perfect Blue',
		value:
			'linear-gradient(-225deg, rgb(61,78,129) 0%, rgb(87,83,201) 48%, rgb(110,127,243) 100%)',
	},
];

const getRandomGradient = () => {
	const randomIndex = Math.floor( Math.random() * gradients.length );
	return gradients[ randomIndex ].value;
};
export default getRandomGradient;
