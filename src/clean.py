
"""

Script to Clean Data

"""

if __name__ == "__main__":

	import pandas as pd
	import numpy as np
	import datetime

	data = pd.read_csv('../dat/rawSars.csv', header = 0)

	date = list(np.unique(data.date))
	country = list(np.unique(data.country))
	pairs = [[x, y] for x in date for y in country]

	newData = pd.DataFrame(pairs)
	newData.columns = ['date', 'country']

	newData = pd.merge(newData, data, how = 'left', on = ['date', 'country'])

	newData = pd.DataFrame(newData, columns = ['date', 'country', 'cumulative_number_of_case', 'number_of_death', 'number_recovered', 'current_case'])
	newData.columns = ['date', 'country', 'CumulativeCase', 'DeadCase', 'RecoveredCase', 'CurrentCase']
	date = list(newData.date)
	day = [x.split('-')[0] if len(x.split('-')[0]) == 2 else '0' + x.split('-')[0] for x in date]
	month = [x.split('-')[1] for x in date]
	for index in xrange(len(month)):
		if month[index] == 'Mar':
			month[index] = 3
		elif month[index] == 'Apr':
			month[index] = 4
		elif month[index] == 'May':
			month[index] = 5
		elif month[index] == 'Jun':
			month[index] = 6
		else:
			month[index] = 7
	date = [str(x) + '/' + y for x, y in zip(month, day)]
	newData.date = date
	newData = newData.fillna(0)
#	newData = newData.where(newData < 0, 0)
	newData.CumulativeCase = newData.CumulativeCase.astype(int)
	newData.DeadCase = newData.DeadCase.astype(int)
	newData.RecoveredCase = newData.RecoveredCase.astype(int)
	newData.CurrentCase = newData.CurrentCase.astype(int)
	CurrentCase = list(newData.CurrentCase)
	newData.CurrentCase = [x if x >= 0 else 0 for x in CurrentCase]

	newData.to_csv('../dat/sars.csv', index = False)

	newData = newData.groupby(['date'], as_index = False).sum()
	newData.to_csv('../dat/world.csv', index = False)

	
	dataFile = open('../dat/world.csv', 'r+')
	data = dataFile.readlines()
	dataFile.close()
	data = [x.split(',') for x in data]
	data = [[x[0], x[2], x[4][:-1], x[3]] if x[0] != 'date' else x for x in data]
	dataFile.close()

	newFile = open('../dat/world.tsv', 'w+')
	for line in data:
		if 'date' in line:
			line = ['date', 'value', 'key\n']
			newFile.write('\t'.join(line))
		else:
			for (value, key) in zip(line[1:], ['DeadCase', 'CurrentCase', 'RecoveredCase']):
				newLine = [line[0], value, key + '\n']
				newFile.write('\t'.join(newLine))
	newFile.close()
	
	data = pd.read_csv('../dat/sars.csv', header = 0)
	data = data.sort(columns = ['date'])
	data.to_csv('../dat/sars.csv', index = False)
	dataFile = open('../dat/sars.csv', 'r+')
	data = dataFile.readlines()
	dataFile.close()
	data = [x.split(',') for x in data]
	data = [[x[0], x[1], x[3], x[5][:-1], x[4]] if x[0] != 'date' else x for x in data]
	dataFile.close()

	newFile = open('../dat/country.tsv', 'w+')
	for line in data:
		if 'date' in line:
			line = ['date', 'country', 'value', 'key\n']
			newFile.write('\t'.join(line))
		else:
			for (value, key) in zip(line[2:], ['DeadCase', 'CurrentCase', 'RecoveredCase']):
				newLine =  [line[0], line[1], value, key + '\n']
				newFile.write('\t'.join(newLine))
	newFile.close()
	















