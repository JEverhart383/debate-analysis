def normalize_text_from_tokens(tokens, all_stopwords):
	
	without_punctuation = [word for word in tokens if len(word) > 1] 
	without_numerals = [word for word in without_punctuation if not word.isnumeric()]
	lower_case = [w.lower() for w in without_numerals]
	without_stopwords = [word for word in lower_case if word not in all_stopwords ]

	normalized_text = without_stopwords

	return normalized_text