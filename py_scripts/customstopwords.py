#expects a list 
from nltk.corpus import stopwords

def remove_custom_stopwords(list):
	default_stopwords = set(stopwords.words('english'))
	custom_stopwords = set(list)
	all_stopwords = default_stopwords | custom_stopwords
	return all_stopwords