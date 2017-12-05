'''
Created on 05-Dec-2017

@author: Linga
'''
from IPython.utils.py3compat import xrange
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