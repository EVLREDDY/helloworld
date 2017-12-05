''' 
List comprehensive example 
'''

user_input = input('Enter a list of values :')
inputs = [int(x) for x in user_input.split(sep=',')]
print([x for x in inputs if x%2 == 0])

