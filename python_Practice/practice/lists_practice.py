'''
Created on 05-Dec-2017

@author: Linga
'''
from IPython.utils.py3compat import xrange
from ipykernel import comm
a = [1,1,2,3,5,9,13,34,21,12,89]
l = []

print(isinstance(a,list))
for i in a:
    if i <= 20:
        l.append(i) 
print(l)

''' 
range is used to create the list of numbers dynamically
'''
user_input = int(input("Enter any number for which you want divisors."))
divisors = []
x = xrange(1,101)

for i in x:
    if (user_input % i) == 0:
        divisors.append(i)

print(divisors)

''' 
List overlap 
this will get the common inputs without duplicates 
in the two lists which are entered by the user
'''
first_list = input("Enter 1st list of values separated by ',' ")
second_list = input("Enter 2nd list of values separated by ',' ")
common_values = []
a = [i for i in first_list.split(sep=',')]
b = [j for j in second_list.split(sep=',')]
for x in a:
    for y in b:
        if x == y and  not x in common_values:
            common_values.append(x)

print(common_values)


