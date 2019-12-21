import csv
import json
import sys

import sys
column = True
columns = []
for line in sys.stdin:
    data = line.split(',')
    if line != "":
        if column == True:
            for item in data:
                if item != "":
                    columns.append( item.upper().strip('\xef\xbb\xbf').strip('\r\n') ) 
            column = False
print(columns)

# print ("the script has the name %s" % (sys.argv[0])
# csvfile = open('file.csv', 'r')
# jsonfile = open('file.json', 'w')

# fieldnames = ("FirstName","LastName","IDNumber","Message")
# reader = csv.DictReader( csvfile, fieldnames)
# for row in reader:
#     json.dump(row, jsonfile)
#     jsonfile.write('\n')